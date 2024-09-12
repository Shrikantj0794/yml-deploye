const mongoose = require('mongoose');
// PASSWORD = Q7LGdE7DFgQ9TalQ
// shrikantj2001
// DB_URI = mongodb+srv://shrikantj2001:QQyMHleIsFtdzq4E@cluster0.a9lke.mongodb.net/yahshuadata
async function connectDB() {
    try {
        await mongoose.connect("mongodb+srv://shrikantj2001:Q7LGdE7DFgQ9TalQ@cluster0.bmtf4.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0", {

        });
        console.log("MongoDB connected successfully");
    } catch (err) {
        console.error("Failed to connect to MongoDB:", err.message);
        process.exit(1); // Exit process with failure
    }
}

module.exports = connectDB;
