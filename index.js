const express = require('express');
const cors = require('cors');
const bcrypt =  require('bcrypt');
const morgan = require('morgan');
const colors = require('colors');
const dotenv = require("dotenv");
const connectDB = require('./config/db')
const userRoutes = require('./routes/userRoutes')
const blogRoutes = require('./routes/blogRoutes')
dotenv.config();

const app=express();
connectDB();
app.use(cors());
app.use(express.json());
app.use(morgan('dev'));

app.use("/api",userRoutes)
app.use("/api/blog",blogRoutes)
const PORT = process.env.PORT || 8000
app.listen(PORT,()=>{
    console.log(`Server Running on port no. ${PORT}`.bgCyan.white);
})