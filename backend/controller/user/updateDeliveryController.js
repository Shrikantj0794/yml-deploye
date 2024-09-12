
const Order = require("../../models/order")

const updateDeliveryController = async(req,res)=>{
    const { orderId } = req.params;
    const { deliveryStatus } = req.body;

    try {
        // Find the order by ID and update the delivery status
        const order = await Order.findByIdAndUpdate(orderId, { deliveryStatus }, { new: true });

        if (!order) {
            return res.status(404).json({ message: 'Order not found' });
        }

        res.status(200).json({ message: 'Delivery status updated successfully', order });
    } catch (error) {
        console.error('Error updating delivery status:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
}

module.exports = updateDeliveryController