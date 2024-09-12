const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
require('dotenv').config();
const connectDB = require('./config/db');
const router = require('./routes'); // Correctly importing the router from Routes
const path = require('path')//1
const app = express();
const _dirname = path.dirname('')//2
const buildpath = path.join(_dirname, "../frontend/build")//3
app.use(express.static(buildpath))//4

app.use(cors({
    origin: '*',
    credentials: true,
}));
app.use(express.json());
app.use(cookieParser());

app.use("/api", router); // Mounting the router correctly on the '/api' path

const PORT = process.env.PORT || 8080;

connectDB().then(() => {
    app.listen(PORT, () => {
        console.log("Connected to DB");
        console.log(`Server is running on port ${PORT}`);
    });
});
