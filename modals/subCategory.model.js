import mongoose from "mongoose";

const subCategorySchema = new mongoose.Schema(
    {

        name : {
        type: String,
        required: [true, 'is required field'] 
        },
        category_id:{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Category',
            required: true
        },
        description: {
            type: String,
        },
    },
{
    timestamps: true, // Automatically adds created_at and updated_at fields
}
);

const SubCategory = mongoose.model('SubCategory', subCategorySchema);

export default SubCategory;
