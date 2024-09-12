// BackendFolder > controller > payment > paymentController.js
const Razorpay = require('razorpay');
const Order = require('../../models/order'); // Import the Order model

const razorpay = new Razorpay({
    key_id: 'rzp_test_U4XuiM2cjeWzma',
    key_secret: '2CXOAspw2Cgr0wlTz6vc0e8J',
});

const createOrder = async (req, res) => {
    const { amount, currency, receipt, userId, products, userName } = req.body; // Assuming you're sending userId from the frontend

    try {
        const options = {
            amount: amount * 100, // Amount in paisa (multiply by 100)
            currency: currency || "INR",
            receipt: receipt || `receipt_${Date.now()}`,
        };

        const order = await razorpay.orders.create(options);

        // Save order to the database
        const newOrder = new Order({
            order_id: order.id,
            products: products.map(product => ({
                productId: product.productId._id,
                name: product.productId.productName,
                quantity: product.quantity,
                price: product.productId.sellingPrice,
                image: product.productId.productImage
            })),
            amount: order.amount/100,
            currency: order.currency,
            receipt: order.receipt,
            user: userId, // Store user ID associated with this order
            // name: userName
        });

        await newOrder.save();

        res.status(200).json({ success: true, order });
    } catch (error) {
        console.error("Error creating Razorpay order", error);
        res.status(500).json({ success: false, message: "Server Error", error });
    }
};

const handlePaymentSuccess = async (req, res) => {
    const { order_id, payment_id, signature } = req.body;

    try {
        const order = await Order.findOne({ order_id });

        if (!order) {
            return res.status(404).json({ success: false, message: "Order not found" });
        }

        order.payment_id = payment_id;
        order.signature = signature;
        order.status = 'paid';

        await order.save();

        res.status(200).json({ success: true, message: "Payment successful, order updated" });
    } catch (error) {
        console.error("Error updating order after payment", error);
        res.status(500).json({ success: false, message: "Server Error", error });
    }
    
};

module.exports = { createOrder, handlePaymentSuccess };
