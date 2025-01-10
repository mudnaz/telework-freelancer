import mongoose from "mongoose";
import Message from "../modals/message.model.js";

//get All messageData
export const messageIndex = async(req,res,next)=>{
    try{
        let messageData = await Message.find();
        res.json({
            Message :"Message data fetch successfully!",
             message :messageData,
    });
    }
        catch (error) {
            console.error("Error fetching message Data:", error);
            res.status(500).json({
                message: 'An error occurred while fetching message Data.',
                error: error.message,
            });
    }
}
//get single message by id
export const messageShow = async(req,res) =>{
    let message_id = req.params._id;
    try{
        let messageById = await Message.findById(message_id);
        res.json({
            Message :"Message data by Id fetch successfully!",
             messageById});
    }
        catch (error) {
            console.error("Error fetching message Data By ID:", error);
            res.status(500).json({
                message: 'An error occurred while fetching message Data By ID.',
                error: error.message,
            });
    }
}


//create new message
export const messageStore =  async(req,res) =>{

    try{
        const { sender_id,
                receiver_id,
                order_id,
                content,
                is_read
                    } = req.body;
        const newMessage = await Message.create({
            sender_id,
            receiver_id,
            order_id,
            content,
            is_read
         });
        await newMessage.save();
        res.json({
            message :'Message added successfully!',
            messageData: newMessage,
        });

    }catch(error){
        console.error("Error occurred while Saving new message:", error);
        res.status(500).json({
            message:'Unable to save the new message!',
            error: error.message,
        });
    }
}
//update message
export const updateMessage = async(req,res) =>{
    const message_id = req.params._id;
    // Validate the category ID
    if (!mongoose.Types.ObjectId.isValid(message_id)) {
        return res.status(400).json({ message: "Invalid message ID." });
    }
    // const {
    //     sender_id,
    //     receiver_id,
    //     order_id,
    //     content,
    //     is_read
    // } = req.body;
const updateMessageData = req.body;
    try{
        const updatedMessage = await Message.findByIdAndUpdate(
            message_id,
            updateMessageData ,
            { new: true });
            
            if (!updatedMessage) {
                return res.status(404).json({ message: "Message not found." });
            }
            res.json({
                message: "Message updated successfully!",
                updatedMessage,
            });
    }
    catch(error){
        console.error("Error occurred while Updataing Message:", error);
        res.status(500).json({
            message:'Unable to update the Message!',
            error: error.message,
        });
    }
}

//delete category
export const deleteMessage = async(req,res) =>{
    let message_id = req.params._id;

    try{
        let messageById = await Message.findByIdAndDelete(message_id);
        res.json({
            message: "Message Deleted successfully!",
            messageById
        });
    }
    catch(error){
        console.error("Error occurred while Deleteing Message:", error);
        res.status(500).json({
            message:'Unable to Delete the Message!',
            error: error.message,
        });
    }
} 
//populate message

export const popMessage = async (req, res) => {
    try {
        const message_id = req.params._id; // Correctly fetch the parameter from the URL

        // Validate ObjectId
        if (!mongoose.Types.ObjectId.isValid(message_id)) {
            return res.status(400).json({ message: "Invalid message ID." });
        }

        const messageData = await Message.findById(message_id)
            .populate({
                path: 'sender_id',
                select: 'username email',
            })
            .populate({
                path: 'receiver_id',
                select: 'username email',
            })
            .populate({
                path: 'order_id',
                select: 'service_id status',
            });

        if (!messageData) {
            return res.status(404).json({ message: "Message not found." });
        }

        res.json({
            message: "Message with populated data fetched successfully!",
            messageData,
        });
    } catch (error) {
        console.error("Error fetching with populated messages:", error);
        res.status(500).json({
            message: "An error occurred while fetching the populated data.",
            error: error.message,
        });
    }
};
