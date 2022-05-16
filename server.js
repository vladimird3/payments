const express = require('express');
require("dotenv").config();
const cors = require('cors');
const app = express();
const PORT = process.env.PORT || 5000;
const paymentRouter = require('./routes/paymentRoute');

app.use(express.json()); 
app.use(express.urlencoded({extended: true}));
app.use(cors());
app.use(paymentRouter);

app.listen(PORT, ()=> {
    console.log(`Server is up and running on ${PORT}`)
})