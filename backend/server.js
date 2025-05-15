require('dotenv').config();
const express    = require('express');
const mongoose   = require('mongoose');
const session    = require('express-session');
const MongoStore = require('connect-mongo');
const passport   = require('passport');
const cors       = require('cors');
const path       = require('path');

require('./config/passport')(passport);

mongoose.connect(process.env.MONGO_URI);

const app = express();
app.use(cors({ origin: 'http://localhost:3000', credentials: true }));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
  store: MongoStore.create({ mongoUrl: process.env.MONGO_URI })
}));
app.use(passport.initialize());
app.use(passport.session());

app.use('/api/users', require('./routes/users'));
app.use('/api/concerts', require('./routes/concerts'));
app.use('/api/itineraries', require('./routes/itineraries'));

// 生产环境下托管前端
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../frontend/build')));
  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../frontend/build', 'index.html'));
  });
}

app.listen(process.env.PORT||5000, () =>
  console.log('Server running on port ' + (process.env.PORT||5000))
);
