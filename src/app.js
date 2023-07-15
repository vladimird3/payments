const express = require('express');
require("dotenv").config();
const cors = require('cors');
const app = express();
const PORT = process.env.PORT || 5000;
const paymentRouter = require('./routes/paymentRoute');
const merchantValidationRouter = require('./routes/merchantValidationRoute');

const {API_VERSION} = require("./constants");

app.use(express.json()); 
app.use(express.urlencoded({extended: true}));
app.use(cors());
app.use(`/payments/${API_VERSION}/`, paymentRouter);
app.use(`/payments/${API_VERSION}/`, merchantValidationRouter);

app.listen(PORT, ()=> {
    console.log(`Server is up and running on ${PORT}`)
})