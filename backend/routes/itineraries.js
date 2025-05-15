const router    = require('express').Router();
const Itinerary = require('../models/Itinerary');

// 新建行程
router.post('/', async (req, res) => {
  const it = new Itinerary({ user: req.user.id, title: req.body.title, items: [] });
  await it.save();
  res.json(it);
});

// 列出我的所有行程
router.get('/', async (req, res) => {
  const list = await Itinerary.find({ user: req.user.id }).populate('items.concert');
  res.json(list);
});

// 更新行程条目
router.put('/:id', async (req, res) => {
  const it = await Itinerary.findById(req.params.id);
  it.items = req.body.items;
  it.lastModified = Date.now();
  await it.save();
  res.json(it);
});

// 删除行程
router.delete('/:id', async (req, res) => {
  await Itinerary.findByIdAndDelete(req.params.id);
  res.json({ msg: 'Deleted' });
});

module.exports = router;
