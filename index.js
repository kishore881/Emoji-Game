require('dotenv').config({path:'./config/.env'})

const PORT = process.env.PORT;
const router = require('./routes/index');
const bodyParser = require('body-parser');

const express = require('express');
const session = require('express-session');
const mongoStore = require('connect-mongo')(session);
const mongoose = require('mongoose');
const connectDB = require("./utils/db-connect");

connectDB();
const app = express();

app.use(session({
    cookie:{
        httpOnly : true,
        maxAge: Number(process.env.sess_age),
        sameSite: true,
    },
    name: 'sid',
    resave: false,
    roling: false,
    saveUninitialized: false,
    secret: process.env.sess_secret, 
    store: new mongoStore({mongooseConnection: mongoose.connection})
}));

app.set('view engine', 'ejs');
app.use(express.static('./views'));

app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());

app.use(router);
app.listen(PORT);