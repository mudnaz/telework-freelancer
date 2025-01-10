import mongoose from 'mongoose';
import { Schema } from 'mongoose';

const userSchema = new Schema({
    username: { 
      type: String, 
      required: [true, 'is required field'], 
      trim: true 
    },
    email: { 
      type: String, 
      required: [true, 'is required field'], 
      unique: true, 
      trim: true 
    },
    password: { 
      type: String, 
      required: [true, 'is required field'], 
      min:6 ,
      max:64 
    },
    profile_picture: 
    { 
      type: String, 
      default: null 
    },
    role: 
    { 
      type: String, 
      enum: ['buyer', 'seller', 'admin'], 
      default: 'buyer' 
    },
    bio: 
    { type: String, 
      default: '' 
    },
    skills: 
    { type: [String], 
      default: [] 
    }, // Array of skills
   
  },
   {
    timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' } // Enables automatic timestamps
  });

  
  export default mongoose.model('User', userSchema);