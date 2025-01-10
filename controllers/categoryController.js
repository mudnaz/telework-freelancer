import mongoose from "mongoose";
import Category from "../modals/category.model.js";

//get All categories
export const categoryIndex = async(req,res,next)=>{
    try{
        let categoryData = await Category.find();
        // res.send(categoryData);
        res.json(categoryData);
    }
        catch (error) {
            console.error("Error fetching Category Data:", error);
            res.status(500).json({
                message: 'An error occurred while fetching Category Data.',
                error: error.message,
            });
    }
}
//get single category by id
export const categoryShow = async(req,res) =>{
    let category_id = req.params._id;
    try{
        let categoryById = await Category.findById(category_id);
        // res.send(categoryData);
        res.json(categoryById);
    }
        catch (error) {
            console.error("Error fetching Category By ID:", error);
            res.status(500).json({
                message: 'An error occurred while fetching Category By ID.',
                error: error.message,
            });
    }
}


//create new category
export const categoryStore =  async(req,res) =>{

    try{
        const { name, description} = req.body;
        const newCategory = await Category.create({ name, description});
        await newCategory.save();
        res.json({
            message :'Category added successfully!',
            categories: {
                name :newCategory.name,
                description : newCategory.description,
            },
        });

    }catch(error){
        console.error("Error occurred while Saving Category:", error);
        res.status(500).json({
            message:'Unable to save the categories!',
            error: error.message,
        });
    }
}
//update category
export const updateCategory = async(req,res) =>{
    const category_id = req.params._id;
    // Validate the category ID
    if (!mongoose.Types.ObjectId.isValid(category_id)) {
        return res.status(400).json({ message: "Invalid Category ID." });
    }
    const updateData = {
        name: req.body.name,
        description: req.body.description,
    };

    try{
        const updatedCategory = await Category.findByIdAndUpdate(
            category_id,
            { $set: updateData },
            { new: true });
            
            if (!updatedCategory) {
                return res.status(404).json({ message: "Category not found." });
            }
            res.json({
                message: "Category updated successfully!",
                category: updatedCategory,
            });
    }
    catch(error){
        console.error("Error occurred while Updataing Category:", error);
        res.status(500).json({
            message:'Unable to update the categories!',
            error: error.message,
        });
    }
}

//delete category
export const deleteCategory = async(req,res) =>{
    let category_id = req.params._id;

    try{
        let categoryById = await Category.findByIdAndDelete(category_id);
        // res.send(categoryData);
        res.json({
            message: "Category Deleted successfully!",
            category:categoryById
        });
    }
    catch(error){
        console.error("Error occurred while Deleteing Category:", error);
        res.status(500).json({
            message:'Unable to Delete the categories!',
            error: error.message,
        });
    }
} 