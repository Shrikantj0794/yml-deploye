// BackendFolder > models > Order.js
const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
    order_id: { type: String, required: true },
   products: [
        {
            productId: { type: mongoose.Schema.Types.ObjectId, ref: 'ProductModel' }, 
            name: { type: String, required: true },
            quantity: { type: Number, required: true },
            price: { type: Number, required: true },
            image: { type: [String], required: true },
        }
    ],
    payment_id: { type: String },
    signature: { type: String },
    amount: { type: Number, required: true },
    currency: { type: String, default: 'INR' },
    receipt: { type: String, required: true },
    status: { type: String, default: 'created' }, // 'created', 'paid', 'failed'
    createdAt: { type: Date, default: Date.now },
    user: { type: String }, // Assuming you have a User model
    name:{type:String},
    deliveryStatus:{type: String, default:'Ordered'}
});

const Order = mongoose.model('Order', orderSchema);

module.exports = Order;




