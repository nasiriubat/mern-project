// const express = require('express'); //old way 
import express from 'express'; //had to add  "type": "module", in pkg.json to use this
import dotenv from 'dotenv';
import { connectDB } from './config/db.js';
import productRoutes from './routes/product.js';

dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());

app.use('/api/products',productRoutes);

console.log(process.env.MONGO_URI); // express 4 way


app.listen(PORT, () => {
    connectDB();
    console.log('Server started at http://localhost:'+PORT);
});
