const router    = require('express').Router();
const Itinerary = require('../models/Itinerary');

// 新建
router.post('/', async (req,res)=>{
  const it = new Itinerary({ user: req.user.id, title:req.body.title, items:[] });
  await it.save();
  res.json(it);
});

// 查询当前用户所有行程
router.get('/', async (req,res)=>{
  const list = await Itinerary.find({ user:req.user.id }).populate('items.event');
  res.json(list);
});

// 更新（添加/移除）
router.put('/:id', async (req,res)=>{
  const it = await Itinerary.findById(req.params.id);
  it.items = req.body.items; // 前端传完整 items 数组
  await it.save();
  res.json(it);
});

// 删除
router.delete('/:id', async (req,res)=>{
  await Itinerary.findByIdAndDelete(req.params.id);
  res.json({ msg:'删除成功' });
});

module.exports = router;
