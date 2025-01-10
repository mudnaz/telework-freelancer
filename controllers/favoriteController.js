import mongoose from "mongoose";
import Favorite from "../modals/favorite.model.js";
//get All favoriteData
export const favoriteIndex = async(req,res,next)=>{
    try{
        let favoriteData = await Favorite.find();
        res.json({
            Message :"favorite data fetch successfully!",
             message :favoriteData,
    });
    }
        catch (error) {
            console.error("Error fetching favorite Data:", error);
            res.status(500).json({
                message: 'An error occurred while fetching favorite Data.',
                error: error.message,
            });
    }
}
//get single favorite by id
export const favoriteShow = async(req,res) =>{
    let favorite_id = req.params._id;
    try{
        let favoriteById = await Favorite.findById(favorite_id);
        res.json({
            Message :"favorite data by Id fetch successfully!",
            favoriteById
            });
    }
        catch (error) {
            console.error("Error fetching favorite Data By ID:", error);
            res.status(500).json({
                message: 'An error occurred while fetching favorite Data By ID.',
                error: error.message,
            });
    }
}


//create new favorite
export const favoriteStore =  async(req,res) =>{

    try{
        const { user_id, service_id } = req.body
        const newFavorite = await Favorite.create({
            user_id,
            service_id
           
         });
        await newFavorite.save();
        res.json({
            message :'new favorite added successfully!',
            favoriteData: newFavorite,
        });

    }catch(error){
        console.error("Error occurred while Saving new favorite:", error);
        res.status(500).json({
            message:'Unable to save the new favorite!',
            error: error.message,
        });
    }
}
//update favorite
export const updateFavorite = async(req,res) =>{
    const favorite_id = req.params._id;
    // Validate the favorite ID
    if (!mongoose.Types.ObjectId.isValid(favorite_id)) {
        return res.status(400).json({ message: "Invalid favorite ID." });
    }
    
    
const updateFavoriteData = req.body;
    try{
        const updatedFavorite = await Favorite.findByIdAndUpdate(
            favorite_id,
             updateFavoriteData ,
            { new: true });
            
            if (!updatedFavorite) {
                return res.status(404).json({ message: "favorite not found." });
            }
            res.json({
                message: "favorite updated successfully!",
                updatedFavorite,
            });
    }
    catch(error){
        console.error("Error occurred while Updataing favorite:", error);
        res.status(500).json({
            message:'Unable to update the favorite!',
            error: error.message,
        });
    }
}

//delete favorite
export const deleteFavorite = async(req,res) =>{
    let favorite_id = req.params._id;

    try{
        let favoriteById = await Favorite.findByIdAndDelete(favorite_id);
        res.json({
            message: "favorite Deleted successfully!",
            favoriteById
        });
    }
    catch(error){
        console.error("Error occurred while Deleteing favorite:", error);
        res.status(500).json({
            message:'Unable to Delete the favorite!',
            error: error.message,
        });
    }
} 
//populate favorite

export const popFavorite = async (req, res) => {
    try {
        const favorite_id = req.params._id; // Correctly fetch the parameter from the URL

        // Validate ObjectId
        if (!mongoose.Types.ObjectId.isValid(favorite_id)) {
            return res.status(400).json({ message: "Invalid favorite ID." });
        }

        const favoriteData = await Favorite.findById(favorite_id)
            
            .populate({ path: 'service_id', select: 'title description price' }) 
            .populate({ path: 'user_id', select: 'username email' });
        if (!favoriteData) {
            return res.status(404).json({ message: "favorite not found." });
        }

        res.json({
            message: "favorite with populated data fetched successfully!",
            favoriteData,
        });
    } catch (error) {
        console.error("Error fetching with populated favorite:", error);
        res.status(500).json({
            message: "An error occurred while fetching the populated data.",
            error: error.message,
        });
    }
};