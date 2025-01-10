import mongoose from 'mongoose';

const categorySchema = new mongoose.Schema(
  {
    // category_id:mongoose.Schema.type.ObjectId,
    name: {
      type: String,
      required: [true, 'is required field'] 
    },
    description: {
      type: String,
      // required: true, 
    },
  },
  {
    timestamps: true, 
  }
);

// Create the Category model
const Category = mongoose.model('Category', categorySchema);

export default Category;
