const express = require('express');
const cors = require('cors');
const errorHandler = require('./middlewares/errorHandler').default;
const connectDB = require('./config/db');
require('dotenv').config();
// Routes
const authRoutes = require('./routes/authRoutes');
const productRoutes = require('./routes/productRoutes');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// DB Connection
connectDB();

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/products', productRoutes);
app.use(errorHandler);
app.get('/',(req,res)=>{
    res.send("hello")
})
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
