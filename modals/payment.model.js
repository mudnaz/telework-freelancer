import mongoose from "mongoose";
import Order from "./orders.model.js";

const paymentSchema = new mongoose.Schema(
    {
        payment_id: {
            type: mongoose.Schema.Types.ObjectId, // Primary key
        },
        order_id : {
            type:mongoose.Schema.Types.ObjectId,
            ref: Order,
            required: true
        },
        amount :{
            type: Number,
            required: true, 
        },
        status: {
            type: String,
            enum: ['pending', 'completed', 'failed'], 
            default: 'pending',
        },
        payment_method: {
            type: String,
            enum: ['credit_card', 'PayPal', 'bank_transfer'], 
            required: true,
        },
        transaction_date: {
              type: Date,
              default: Date.now, 
        }, 
    },
    {
        timestamps: true, 
    }
);

const Payment = mongoose.model('Payment', paymentSchema);

export default Payment;
