import mongoose from 'mongoose';

// Order Schema
const orderSchema = new mongoose.Schema(
  {
    service_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Service',  
      required: true,  
    },
    buyer_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',     
      required: true,  
    },
    seller_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',     
      required: true,  
    },
    status: {
      type: String,
      enum: ['pending', 'in_progress', 'delivered', 'completed', 'cancelled'],
      default: 'pending', 
      required: true, 
    },
    price: {
      type: Number,
      required: true, 
    },
    delivery_date: {
      type: Date,
      required: true, 
    },
  },
  {
    timestamps: true, 
  }
);


const Order = mongoose.model('Order', orderSchema);

export default Order;
