require('dotenv').config({path:'./config/.env'})

const PORT = process.env.PORT;
const router = require('./routes/index');
const bodyParser = require('body-parser');

const express = require('express');
const connectDB = require("./utils/db-connect");

connectDB();
const app = express();

app.set('view engine', 'ejs');
app.use(express.static('./views'));

app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());

app.use(router);
app.listen(PORT);