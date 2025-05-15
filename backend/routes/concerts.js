const router  = require('express').Router();
const axios   = require('axios');
const Concert = require('../models/Concert');

router.get('/', async (req, res) => {
  const { city, date } = req.query;
  // 优先从 DB 缓存读取
  const cached = await Concert.find({ city, date });
  if (cached.length) return res.json(cached);

  // 调用 Ticketmaster
  const tmRes = await axios.get('https://app.ticketmaster.com/discovery/v2/events.json', {
    params: { apikey: process.env.TM_API_KEY, city, startDateTime: `${date}T00:00:00Z` }
  });
  const events = tmRes.data._embedded?.events || [];
  const docs = events.map(ev => ({
    tmId:  ev.id,
    name:  ev.name,
    date:  ev.dates.start.localDate,
    venue: ev._embedded.venues[0].name,
    city,
    genre: ev.classifications[0].genre.name
  }));
  await Concert.insertMany(docs);
  res.json(docs);
});

module.exports = router;
