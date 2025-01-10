import mongoose from "mongoose";
import User from './user.model.js'; // Import the User model
import Service from './service.model.js'; 

const favoriteSchema = new mongoose.Schema(
    {
        favorite_id: {
            type: mongoose.Schema.Types.ObjectId, // Primary key
        },
        user_id : {
            type:mongoose.Schema.Types.ObjectId,
            ref: User,
            required: true
        },
        service_id : {
            type:mongoose.Schema.Types.ObjectId,
            ref: Service,
            required: true
        },
    },
    {
        timestamps: true, 
    }
);

const Favorite = mongoose.model('Favorite', favoriteSchema);

export default Favorite;
