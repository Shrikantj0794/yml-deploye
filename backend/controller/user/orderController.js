const orderModel = require("../../models/order");

const orderController = async (req, res) => {
    try {
        const orders = await orderModel.find(); // Fetch all orders from the database
        res.json({ success: true, orders });
    } catch (error) {
        console.error('Error fetching orders:', error); // Log the error for debugging
        res.status(500).json({ success: false, message: 'Server Error', error });
    }
}

module.exports = orderController;
