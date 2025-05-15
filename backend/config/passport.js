const LocalStrategy = require('passport-local').Strategy;
const bcrypt        = require('bcryptjs');
const User          = require('../models/User');

module.exports = passport=>{
  passport.use(new LocalStrategy({ usernameField:'email' },
    async (email, pw, done)=>{
      const u = await User.findOne({ email });
      if(!u) return done(null,false,{ message:'邮箱未注册' });
      const ok = await bcrypt.compare(pw, u.password);
      return ok ? done(null,u) : done(null,false,{ message:'密码错误' });
    }
  ));
  passport.serializeUser((u,done)=>done(null,u.id));
  passport.deserializeUser(async (id,done)=>done(null, await User.findById(id)));
};
