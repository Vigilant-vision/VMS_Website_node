require('dotenv').config();
const express = require('express');
const cors = require("cors");
const app = express();
const bodyParser = require('body-parser');

// Middleware to parse JSON bodies
app.use(express.json());

// Middleware for enabling CORS
app.use(cors());

// Importing routes
const OverSeesRouter = require('./routes/OverSeesRouter');

// Loading routes
app.use('/api/v1/oversees', OverSeesRouter);

app.use(bodyParser.json());

// Middleware for parsing application/x-www-form-urlencoded payloads
app.use(bodyParser.urlencoded({ extended: true }));

const startServer = async () => {
    try {
        const PORT = 3000;
        app.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}`);
        });
       

    } catch (error) {
        console.error('Error starting server:', error);
    }
};

startServer();
