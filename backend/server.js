require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const authRoutes = require('./routes/auth');
const invoiceRoutes = require('./routes/invoice'); 
// const invoiceRoutes = require('./routes/invoice');

const app = express();
// app.use(cors({
//     origin: 'http://localhost:5173',  // Allow requests from your frontend
//     methods: ['GET', 'POST', 'PUT', 'DELETE'],
//     allowedHeaders: ['Content-Type', 'Authorization'],
//   }));

// Enable CORS for your frontend
app.use(cors({
    origin: 'http://localhost:5173',  // Ensure this matches your frontend URL
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
  }));
  
  // Allow OPTIONS preflight requests
  app.options('*', cors());
// Middleware
// Adjust the path as necessary

app.use(bodyParser.json());
// app.use(cors());


// MongoDB Connection
mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.error(err));
// mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
//     .then(() => console.log('MongoDB connected'))
//     .catch(err => console.error(err));

// Routes
app.use('/api', invoiceRoutes);
app.use('/api/auth', authRoutes);
// app.use('/api', invoiceRoutes);

const productRoutes = require('./routes/products');
app.use('/api/products', productRoutes);


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));


