import mongoose from "mongoose";
import Review from "../modals/review.model.js";

//get All reviewData
export const reviewIndex = async(req,res,next)=>{
    try{
        let reviewData = await Review.find();
        res.json({
            Message :"review data fetch successfully!",
             message :reviewData,
    });
    }
        catch (error) {
            console.error("Error fetching review Data:", error);
            res.status(500).json({
                message: 'An error occurred while fetching review Data.',
                error: error.message,
            });
    }
}
//get single review by id
export const reviewShow = async(req,res) =>{
    let review_id = req.params._id;
    try{
        let reviewById = await Review.findById(review_id);
        res.json({
            Message :"review data by Id fetch successfully!",
            reviewById
            });
    }
        catch (error) {
            console.error("Error fetching review Data By ID:", error);
            res.status(500).json({
                message: 'An error occurred while fetching review Data By ID.',
                error: error.message,
            });
    }
}


//create new review
export const reviewStore =  async(req,res) =>{

    try{
        const { order_id, rating, comment } = req.body
        const newReview = await Review.create({
            order_id,
            rating,
            comment,
         });
        await newReview.save();
        res.json({
            message :'new review added successfully!',
            reviewData: newReview,
        });

    }catch(error){
        console.error("Error occurred while Saving new review:", error);
        res.status(500).json({
            message:'Unable to save the new review!',
            error: error.message,
        });
    }
}
//update review
export const updateReview = async(req,res) =>{
    const review_id = req.params._id;
    // Validate the category ID
    if (!mongoose.Types.ObjectId.isValid(review_id)) {
        return res.status(400).json({ message: "Invalid review ID." });
    }
    
    
const updateReviewData = req.body;
    try{
        const updatedReview = await Review.findByIdAndUpdate(
            review_id,
             updateReviewData ,
            { new: true });
            
            if (!updatedReview) {
                return res.status(404).json({ message: "review not found." });
            }
            res.json({
                message: "Review updated successfully!",
                updatedReview,
            });
    }
    catch(error){
        console.error("Error occurred while Updataing review:", error);
        res.status(500).json({
            message:'Unable to update the review!',
            error: error.message,
        });
    }
}

//delete review
export const deleteReview = async(req,res) =>{
    let review_id = req.params._id;

    try{
        let reviewById = await Review.findByIdAndDelete(review_id);
        res.json({
            message: "review Deleted successfully!",
            reviewById
        });
    }
    catch(error){
        console.error("Error occurred while Deleteing review:", error);
        res.status(500).json({
            message:'Unable to Delete the Review!',
            error: error.message,
        });
    }
} 
//populate message

export const popReview = async (req, res) => {
    try {
        const review_id = req.params._id; // Correctly fetch the parameter from the URL

        // Validate ObjectId
        if (!mongoose.Types.ObjectId.isValid(review_id)) {
            return res.status(400).json({ message: "Invalid review ID." });
        }

        const reviewData = await Review.findById(review_id)
            // .populate({
            //     path: 'order_id',
            //     // select: 'service_id status',
            // });
            .populate({
                 path: 'order_id',
                populate: [
                    { path: 'service_id', select: 'title description price' }, 
                    { path: 'buyer_id', select: 'username email' }, 
                    { path: 'seller_id', select: 'username email' }, 
                ],
            })
        if (!reviewData) {
            return res.status(404).json({ message: "review not found." });
        }

        res.json({
            message: "Review with populated data fetched successfully!",
            reviewData,
        });
    } catch (error) {
        console.error("Error fetching with populated review:", error);
        res.status(500).json({
            message: "An error occurred while fetching the populated data.",
            error: error.message,
        });
    }
};
