const router   = require('express').Router();
const bcrypt   = require('bcryptjs');
const passport = require('passport');
const User     = require('../models/User');

// 注册
router.post('/register', async (req,res)=>{
  const {username,email,password} = req.body;
  if(!username||!email||!password)
    return res.status(400).json({ msg:'请填写所有字段' });
  if(await User.findOne({email}))
    return res.status(400).json({ msg:'邮箱已注册' });
  const hash = await bcrypt.hash(password, 10);
  await new User({username,email,password:hash}).save();
  res.json({ msg:'注册成功' });
});

// 登录
router.post('/login', (req,res,next)=>{
  passport.authenticate('local', (err,user,info)=>{
    if(err) return next(err);
    if(!user) return res.status(400).json({ msg:info.message });
    req.logIn(user, err=>{
      if(err) return next(err);
      res.json({ user:{ id:user.id,username:user.username,email:user.email } });
    });
  })(req,res,next);
});

// 登出
router.post('/logout', (req,res)=>{
  req.logout(err=> err
    ? res.status(500).json({msg:'登出失败'})
    : res.json({msg:'已登出'})
  );
});

module.exports = router;
