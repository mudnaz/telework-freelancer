import mongoose from "mongoose";
import SubCategory from "../modals/subCategory.model.js";
import Category from "../modals/category.model.js";

//get All subCategories
export const subCategoryIndex = async(req,res)=>{
    try{
        let subCategoryData = await SubCategory.find();
        // res.send(categoryData);
        res.json(subCategoryData);
    }
        catch (error) {
            console.error("Error fetching SubCategory Data:", error);
            res.status(500).json({
                message: 'An error occurred while fetching SubCategory Data.',
                error: error.message,
            });
    }
}
//get single category by id
export const subCategoryShow = async(req,res) =>{
    let subCategory_id = req.params._id;
    try{
        let subCategoryById = await SubCategory.findById(subCategory_id);
        // res.send(categoryData);
        res.json(subCategoryById);
    }
        catch (error) {
            console.error("Error fetching SubCategory By ID:", error);
            res.status(500).json({
                message: 'An error occurred while fetching SubCategory By ID.',
                error: error.message,
            });
    }
}


//create new category
export const subCategoryStore =  async(req,res) =>{

    try{
        const { name, category_id, description} = req.body;
        const newSubCategory = await SubCategory.create({ name, category_id, description});
        await newSubCategory.save();
        res.json({
            message :'SubCategory added successfully!',
            categories: {
                name :newSubCategory.name,
                 category_id: newSubCategory.category_id,
                description : newSubCategory.description,
            },
        });

    }catch(error){
        console.error("Error occurred while Saving SubCategory:", error);
        res.status(500).json({
            message:'Unable to save the Subcategories!',
            error: error.message,
        });
    }
}
//update category
export const updateSubCategory = async(req,res) =>{
    const subCategory_id = req.params._id;
    // Validate the category ID
    if (!mongoose.Types.ObjectId.isValid(subCategory_id)) {
        return res.status(400).json({ message: "Invalid SubCategory ID." });
    }
    const updateSubCategoryData = {
        name: req.body.name,
        description: req.body.description,
    };

    try{
        const updatedSubCategory = await SubCategory.findByIdAndUpdate(
            category_id,
            { $set: updateSubCategoryData },
            { new: true });
            
            if (!updatedSubCategory) {
                return res.status(404).json({ message: "SubCategory not found." });
            }
            res.json({
                message: "SubCategory updated successfully!",
                category: updatedSubCategory,
            });
    }
    catch(error){
        console.error("Error occurred while Updataing SubCategory:", error);
        res.status(500).json({
            message:'Unable to update the Subcategories!',
            error: error.message,
        });
    }
}
//populate category in subcategories

export const popCategory = async (req, res) => {
    try {
        const subCategoryId = req.params._id;

        // Validate ObjectId
        if (!mongoose.Types.ObjectId.isValid(subCategoryId)) {
            return res.status(400).json({ message: "Invalid SubCategory ID." });
        }

        // Fetch the SubCategory and populate category_id
        const data = await SubCategory.findById(subCategoryId).populate('category_id', 'name description');
        if (!data) {
            return res.status(404).json({ message: "SubCategory not found." });
        }

        res.json({
            message: "SubCategory with populated category fetched successfully!",
            data,
        });
    } catch (error) {
        console.error("Error fetching subcategories with populated categories:", error);
        res.status(500).json({
            message: "An error occurred while fetching the subcategory with populated categories.",
            error: error.message,
        });
    }
};


//delete category
export const deleteSubCategory = async(req,res) =>{
    let subCategory_id = req.params._id;

    try{
        let subCategoryById = await SubCategory.findByIdAndDelete(subCategory_id);
        // res.send(categoryData);
        res.json({
            message: "SubCategory Deleted successfully!",
            subcategory:subCategoryById
        });
    }
    catch(error){
        console.error("Error occurred while Deleteing SubCategory:", error);
        res.status(500).json({
            message:'Unable to Delete the Subcategories!',
            error: error.message,
        });
    }
} 