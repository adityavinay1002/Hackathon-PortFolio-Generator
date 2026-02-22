require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');

const authRoutes = require('./routes/authRoutes');
const portfolioRoutes = require('./routes/portfolioRoutes');
const resumeRoutes = require('./routes/resumeRoutes');
const { errorHandler } = require('./middleware/error');

const app = express();

// Middleware
app.use(express.json());
app.use(cors());
app.use(helmet({
    crossOriginResourcePolicy: false,
}));
app.use(morgan('dev'));

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/portfolio', portfolioRoutes);
app.use('/api/resume', resumeRoutes);

// Error Handler
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

mongoose.connect(process.env.MONGODB_URI)
    .then(() => {
        console.log('Connected to MongoDB');
        app.listen(PORT, () => {
            console.log(`Server running on port ${PORT}`);
        });
    })
    .catch(err => {
        console.error('Database connection error:', err);
    });
