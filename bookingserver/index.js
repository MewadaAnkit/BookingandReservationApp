const dotenv = require('dotenv').config();
const express = require('express');
const app = express();
const Port = process.env.PORT || 8000;
const cookieParser = require("cookie-parser")
const cors = require('cors')

//middlewares
app.use(cors())
app.use(express.json());
app.use(express.urlencoded({extended:false}));
app.use(cookieParser())

const db = require('./Model/connection')
app.use(require('./routes/router'))

app.listen(Port , ()=>console.log("Server Started Successfully"))