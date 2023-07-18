const express = require('express');
require("dotenv").config();
const cors = require('cors');
const app = express();
const PORT = process.env.PORT || 6050;
const paymentRouter = require('./routes/paymentRoute');
const merchantValidationRouter = require('./routes/merchantValidationRoute');
const healthRouter = require('./routes/healthRoute');

const {API_VERSION} = require("./constants");

app.use(express.json()); 
app.use(express.urlencoded({extended: true}));
app.use(cors());
app.use(`/payments/${API_VERSION}/`, paymentRouter);
app.use(`/payments/${API_VERSION}/`, merchantValidationRouter);
app.use(`/payments/${API_VERSION}/health`, healthRouter);

app.listen(PORT, ()=> {
    console.log(`Server is up and running on ${PORT}`)
})