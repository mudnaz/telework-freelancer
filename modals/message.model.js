import mongoose from 'mongoose';

// Message Schema
const messageSchema = new mongoose.Schema(
  {
    sender_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',  
      required: true,  
    },
    receiver_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',  
      required: true,  
    },
    order_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Order',  
      required: false, 
    },
    content: {
      type: String,
      required: true,  
    },
    
    is_read: {
      type: Boolean,
      default: false,  
    },
  },
  {
    timestamps: true, 
  }
);

// Create the Message model
const Message = mongoose.model('Message', messageSchema);

export default Message;
