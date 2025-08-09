const express = require('express');
const app=express();
const passport=require('passport')
const ids=require('./config/pkgIds')

// routes
const users=require('./routes/users/users')
const consignments=require('./routes/booking/consignments')
const loading=require('./routes/loading/manifests')
const dispatches= require('./routes/dispatch/dispatches')
const unloads=require('./routes/recieve/unload')
const delivery=require('./routes/delivery/delivery')
const vehicles = require('./routes/vehicles')
// mongoose
const mongoose=require('mongoose',{ useNewUrlParser: true, useUnifiedTopology: true })
const uri=require('./config/keys').uri;

// mongoose connect
mongoose
.connect(uri)
.then(()=>{
    console.log("Mongo DB Connected")
      
})
.catch(err => console.log(err))


// body parser
app.use(express.urlencoded({extended:false}))
app.use(express.json())

// passport middleware
app.use(passport.initialize())
// passport config file
require('./config/passport')(passport)


// use Routes
app.use('/tms/users',users)
app.use('/tms/booking',consignments)
app.use('/tms/loading',loading)
app.use('/tms/dispatch',dispatches)
app.use('/tms/unload',unloads)
app.use('/tms/delivery',delivery)
app.use('/tms/vehicle',vehicles)

//general route
app.get('/',(req,res) => res.send('Hello khan'));
const port=process.env.PORT || 5000;
app.listen(port, ()=> console.log(`Server running on port ${port}`));

