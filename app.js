const express = require('express');
const cors = require('cors');
require('dotenv').config();
require('./config/db')
const path = require('path')
const app = express();

app.use(express.json());
app.use(cors());

const propertiesRoute = require('./routes/propertiesRoute')
const userRoute = require('./routes/userRoute');
const inquiryRoute = require('./routes/inquiryRoutes')
app.get('/',(req,res)=>{
    res.send("Welcome to API");
})
const port = process.env.PORT 

app.use('/api/properties', propertiesRoute)
app.use('/api/user', userRoute);
app.use('/api/inquiry',inquiryRoute)
app.use('/uploads',express.static(path.join(__dirname, 'uploads')));

app.listen(port,()=>{
    console.log(`Server started on ${port}`);
}) ; 