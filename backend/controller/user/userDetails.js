const userModel = require("../../models/userModel")
const orderModel = require("../../models/order")

async function userDetailsController(req,res){
    try{
        const userId = req.userId;
        const user = await userModel.findById(userId)
        const order = await orderModel.find({user: userId})
        
        console.log('User Data:', user); // Log user data
        console.log('Order Data:', order)
    
        res.status(200).json({
            data : user,
            orderDetail : order, 
            error : false,
            success : true,
            message : "User details"
        })

   

    }catch(err){
        res.status(400).json({
            message : err.message || err,
            error : true,
            success : false
        })
    }
}

module.exports = userDetailsController