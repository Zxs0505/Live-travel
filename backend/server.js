require('dotenv').config();
const express    = require('express');
const mongoose   = require('mongoose');
const session    = require('express-session');
const MongoStore = require('connect-mongo');
const passport   = require('passport');
const usersRoute = require('./routes/users');
const ctsRoute   = require('./routes/concerts');
const itiRoute   = require('./routes/itineraries');
require('./config/passport')(passport);

mongoose.connect(process.env.MONGO_URI);
const app = express();
app.use(express.json(), express.urlencoded({extended:false}));
app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false, saveUninitialized: false,
  store: MongoStore.create({ mongoUrl: process.env.MONGO_URI })
}));
app.use(passport.initialize(), passport.session());

app.use('/api/users', usersRoute);
app.use('/api/concerts', ctsRoute);
app.use('/api/itineraries', itiRoute);

app.listen(5000, ()=>console.log('Backend @ http://localhost:5000'));
