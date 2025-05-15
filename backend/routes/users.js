const router   = require('express').Router();
const bcrypt   = require('bcryptjs');
const passport = require('passport');
const User     = require('../models/User');

// 注册
router.post('/register', async (req, res) => {
  const { username, email, password } = req.body;
  if (!username || !email || !password)
    return res.status(400).json({ msg: 'All fields required' });
  if (await User.findOne({ email }))
    return res.status(400).json({ msg: 'Email already in use' });
  const hash = await bcrypt.hash(password, 10);
  await new User({ username, email, password: hash }).save();
  res.json({ msg: 'Registration successful' });
});

// 登录
router.post('/login', (req, res, next) => {
  passport.authenticate('local', (err, user, info) => {
    if (err)   return next(err);
    if (!user) return res.status(400).json({ msg: info.message });
    req.logIn(user, err => {
      if (err) return next(err);
      res.json({
        msg: 'Login successful',
        user: { id: user.id, username: user.username, email: user.email }
      });
    });
  })(req, res, next);
});

// 登出
router.post('/logout', (req, res) => {
  req.logout(err => {
    if (err) return res.status(500).json({ msg: 'Logout failed' });
    res.json({ msg: 'Logged out' });
  });
});

// 个人资料（受保护）
router.get('/profile', (req, res) => {
  if (!req.isAuthenticated())
    return res.status(401).json({ msg: 'Not authenticated' });
  res.json({ user: req.user });
});

module.exports = router;
