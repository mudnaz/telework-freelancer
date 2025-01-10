import mongoose from 'mongoose';

const serviceSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    category_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Category', // Reference to the Category model
      required: true,
    },
    subcategory_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'SubCategory', // Reference to the Subcategory model
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    delivery_time: {
      type: Number,
      required: true, 
    },
    seller_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User', // Reference to the User model (seller)
      required: true,
    },
    images: {
      type: [String], 
      required: true,
    },
    tags: {
      type: [String], 
      required: true,
    },
    status: {
      type: String,
      enum: ['active', 'paused', 'deleted'], 
      default: 'active',
    },
    // created_at: {
    //   type: Date,
    //   default: Date.now,
    // },
    // updated_at: {
    //   type: Date,
    //   default: Date.now,
    // },
  },
  {
    timestamps: true, 
      }
);

// Create the Service model
const Service = mongoose.model('Service', serviceSchema);

export default Service;
