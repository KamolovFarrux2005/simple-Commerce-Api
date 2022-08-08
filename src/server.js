const express = require('express');
const app = express();
const morgan = require('morgan');
const cors = require('cors');
const authRoute = require('./api/routes/auth');
const userRoute = require('./api/routes/user');
const productRoute = require('./api/routes/product');
const cartRoute = require('./api/routes/cart');
const orderRoute = require('./api/routes/order');
const stripeRoute = require('./api/routes/stripe')
require("dotenv").config({
    path: 'src/config/.env'
  });
const connectDB = require('./config/db');
connectDB()


app.use(morgan('dev'))
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors("*"));
app.use('/api/users', userRoute)
app.use('/api/auth', authRoute);
app.use("/api/products", productRoute);
app.use("/api/carts", cartRoute);
app.use('/api/orders', orderRoute)
app.use('/api/checkout', stripeRoute)
let port = process.env.PORT || 3000;
app.listen(port, () => console.log(`port ${port}`))