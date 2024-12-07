const mongoose = require('mongoose')
mongoose.connect('mongodb://localhost:27017/phone-store')
const express = require('express')
const expressApp = express()
expressApp.use(express.json());
const iphoneRoutes = require('./routes/Iphone-routes')
const AndroidRoutes = require('./routes/Android-routes')
const accessoriesRoutes =  require('./routes/Accessories-routes')
const authRoutes = require('./routes/users-routes')




expressApp.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "http://localhost:4200");
    res.header(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content-Type, Accept, Authorization"
    );
    if (req.method === "OPTIONS") {
      res.header("Access-Control-Allow-Methods", "GET,POST,PUT,DELETE");
      return res.status(200).json({});
    }
    next();
  });



expressApp.use('/iphones',iphoneRoutes)
expressApp.use('/android',AndroidRoutes)
expressApp.use('/accsessories',accessoriesRoutes)
expressApp.use('/api/auth/', authRoutes)
expressApp.listen(3000,()=> console.log('conneted to Port 3000'))


