const router = require('express').Router();
const axios  = require('axios');
const Concert= require('../models/Concert');

router.get('/', async (req,res)=>{
  const {city,date} = req.query;
  // 缓存逻辑：先查 DB
  let data = await Concert.findOne({ city,date });
  if(data) return res.json(data.events);

  // 调 Ticketmaster
  const tm = await axios.get('https://app.ticketmaster.com/discovery/v2/events.json', {
    params:{ apikey:process.env.TM_API_KEY, city, startDateTime:`${date}T00:00:00Z` }
  });
  const events = tm.data._embedded?.events || [];
  // 存 DB 缓存
  await new Concert({ city,date, events }).save();
  res.json(events);
});

module.exports = router;
