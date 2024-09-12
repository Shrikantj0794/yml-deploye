const User = require('../../models/userModel'); // Adjust the path as needed

async function uploadAddressController(req, res) {
    try {
        const userId = req.userId; // Assuming userId is available in req.userId
        const { address } = req.body; // Expecting address object from request body

        if (!address || !address.street || !address.city || !address.state || !address.zip) {
            return res.status(400).json({
                message: 'Incomplete address data provided',
                error: true,
                success: false
            });
        }

        // Find the user by ID and update the address
        const updatedUser = await User.findByIdAndUpdate(
            userId,
            { address },
            { new: true, useFindAndModify: false } // This option returns the updated document
        );

        if (!updatedUser) {
            return res.status(404).json({
                message: 'User not found',
                error: true,
                success: false
            });
        }

        res.json({
            message: 'Address updated successfully!',
            data: updatedUser,
            success: true,
            error: false
        });

    } catch (err) {
        console.error('Error updating address:', err);
        res.status(400).json({
            message: err.message || err,
            error: true,
            success: false
        });
    }
}

module.exports = uploadAddressController;
