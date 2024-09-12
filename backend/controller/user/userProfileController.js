
const express = require('express');
const router = express.Router();
const userModel = require('../../models/userModel')


async function userProfileController(req, res) {
    try {
        const user = await userModel.findById(req.userId);

        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found",
            });
        }

        res.status(200).json({
            success: true,
            data: user,
        });
    } catch (err) {
        res.status(500).json({
            success: false,
            message: err.message || "Server error",
        });
    }
}

module.exports = userProfileController;
