import mongoose from "mongoose";

const Schema = mongoose.Schema;


const OrderSchema = new Schema({
    userId: String,
    userName: String,
    userEmail: String,
    orderStatus: {
        type : String , 
        default  : 'pending'
    },
    paymentMethod: {
        type : String , 
        default  : 'paypal'
    },
    paymentStatus: {
        type : String , 
        default  : 'unpaid'
    },
    orderDate: Date,
    paymentId: String,
    payerId: String,
    instructorId: String,
    instructorName: String,
    courseImage: String,
    courseTitle: String,
    courseId: String,
    coursePricing: String,
})

const  Order = mongoose.model('Order', OrderSchema)

export default Order