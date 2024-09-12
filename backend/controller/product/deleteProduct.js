const deleteProductPermission = require('../../helpers/permission');
const productModel = require('../../models/productModel');

async function deleteProductController(req, res) {
    try {
        // Check for permissions using the helper function
        const hasPermission = await deleteProductPermission(req.userId);
        if (!hasPermission) {
            throw new Error('Permission denied');
        }

        // Log the request body to ensure _id is being passed correctly
        console.log('Request Body:', req.body);

        // Extract product ID from the request body
        const { _id } = req.body;

        // Check if the product ID is provided
        if (!_id) {
            return res.status(400).json({
                message: 'Product ID is required',
                success: false,
                error: true,
            });
        }

        // Find and delete the product by ID
        const deleteProduct = await productModel.findByIdAndDelete(_id);

        // Check if the product was found and deleted
        if (!deleteProduct) {
            return res.status(404).json({
                message: 'Product not found',
                success: false,
                error: true,
            });
        }

        // Respond with success message
        res.json({
            message: 'Product deleted successfully',
            data: deleteProduct,
            success: true,
            error: false,
        });

    } catch (err) {
        // Log the error and respond with an error message
        console.error('Error:', err.message || err);
        res.status(500).json({
            message: err.message || 'An error occurred',
            success: false,
            error: true,
        });
    }
}

module.exports = deleteProductController;
