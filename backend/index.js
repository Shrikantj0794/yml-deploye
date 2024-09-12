const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
require('dotenv').config();
const connectDB = require('./config/db');
const router = require('./routes'); // Importing the router
const path = require('path');
const app = express();

// Serve static files from the React frontend app
const buildpath = path.join(__dirname, "../frontend/build");
app.use(express.static(buildpath));

app.use(cors({
    origin: ['http://localhost:8080', 'http://44.210.125.47:8080'],
    credentials: true,
}));

app.use(express.json());
app.use(cookieParser());

// API routes
app.use("/api", router);

// Catch-all handler for all other routes (for React Router)
app.get('/*', (req, res) => {
    res.sendFile(path.join(buildpath, 'index.html'));
});

// Port and DB connection
const PORT = process.env.PORT || 8080;

connectDB().then(() => {
    app.listen(PORT, () => {
        console.log("Connected to DB");
        console.log(`Server is running on port ${PORT}`);
    });
});
