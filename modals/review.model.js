import mongoose from "mongoose";
import Order from "./orders.model.js";

const reviewSchema = new mongoose.Schema(
    {
        review_id: {
            type: mongoose.Schema.Types.ObjectId, // Primary key
        },
        order_id : {
            type:mongoose.Schema.Types.ObjectId,
            ref: Order,
            required: true
        },
        rating :{
            type: Number,
            min: 1,
            max: 5,
            required: true, 
        },
        comment :{
            type:String,
            trim:true,
        },
        // created_at: {
        //     type: Date,
        //     default: Date.now, // Automatically set the current date and time
        // }, 
    },
    {
        timestamps: true, 
    }
);

const Review = mongoose.model('Review', reviewSchema);

export default Review;
