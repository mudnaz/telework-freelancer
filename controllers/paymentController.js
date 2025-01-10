import mongoose from "mongoose";
import Payment from "../modals/payment.model.js";

//get All reviewData
export const paymentIndex = async(req,res,next)=>{
    try{
        let paymentData = await Payment.find();
        res.json({
            Message :"payment data fetch successfully!",
             message :paymentData,
    });
    }
        catch (error) {
            console.error("Error fetching payment Data:", error);
            res.status(500).json({
                message: 'An error occurred while fetching payment Data.',
                error: error.message,
            });
    }
}
//get single payment by id
export const paymentShow = async(req,res) =>{
    let payment_id = req.params._id;
    try{
        let paymentById = await Payment.findById(payment_id);
        res.json({
            Message :"payment data by Id fetch successfully!",
            paymentById
            });
    }
        catch (error) {
            console.error("Error fetching payment Data By ID:", error);
            res.status(500).json({
                message: 'An error occurred while fetching payment Data By ID.',
                error: error.message,
            });
    }
}


//create new payment
export const paymentStore =  async(req,res) =>{

    try{
        const { order_id, amount, status, payment_method, transaction_date } = req.body
        const newPayment = await Payment.create({
            order_id,
            amount, status, payment_method, transaction_date
         });
        await newPayment.save();
        res.json({
            message :'new payment added successfully!',
            paymentData: newPayment,
        });

    }catch(error){
        console.error("Error occurred while Saving new payment:", error);
        res.status(500).json({
            message:'Unable to save the new payment!',
            error: error.message,
        });
    }
}
//update payment
export const updatePayment = async(req,res) =>{
    const payment_id = req.params._id;
    // Validate the payment ID
    if (!mongoose.Types.ObjectId.isValid(payment_id)) {
        return res.status(400).json({ message: "Invalid payment ID." });
    }
    
    
const updatePaymentData = req.body;
    try{
        const updatedPayment = await Payment.findByIdAndUpdate(
            payment_id,
             updatePaymentData ,
            { new: true });
            
            if (!updatedPayment) {
                return res.status(404).json({ message: "payment not found." });
            }
            res.json({
                message: "Payment updated successfully!",
                updatedPayment,
            });
    }
    catch(error){
        console.error("Error occurred while Updataing payment:", error);
        res.status(500).json({
            message:'Unable to update the payment!',
            error: error.message,
        });
    }
}

//delete payment
export const deletePayment = async(req,res) =>{
    let payment_id = req.params._id;

    try{
        let paymentById = await Payment.findByIdAndDelete(payment_id);
        res.json({
            message: "payment Deleted successfully!",
            paymentById
        });
    }
    catch(error){
        console.error("Error occurred while Deleteing payment:", error);
        res.status(500).json({
            message:'Unable to Delete the payment!',
            error: error.message,
        });
    }
} 
//populate payment

export const popPayment = async (req, res) => {
    try {
        const payment_id = req.params._id; // Correctly fetch the parameter from the URL

        // Validate ObjectId
        if (!mongoose.Types.ObjectId.isValid(payment_id)) {
            return res.status(400).json({ message: "Invalid payment ID." });
        }

        const paymentData = await Payment.findById(payment_id)
            .populate({
                path: 'order_id',
                // select: 'service_id status',
            });
          
        if (!paymentData) {
            return res.status(404).json({ message: "payment not found." });
        }

        res.json({
            message: "payment with populated data fetched successfully!",
            paymentData,
        });
    } catch (error) {
        console.error("Error fetching with populated payment:", error);
        res.status(500).json({
            message: "An error occurred while fetching the populated data.",
            error: error.message,
        });
    }
};

// nested populate data


// populate Order
export const popNestedPayment = async (req, res) => {
    try {
        const payment_id = req.params._id;

        // Validate ObjectId
        if (!mongoose.Types.ObjectId.isValid(payment_id)) {
            return res.status(400).json({ message: "Invalid payment ID." });
        }

        // Fetch the Service and populate category_id ,subCategory and User
        const paymentData = await Payment.findById(payment_id)
        .populate({
            path: 'order_id', // Populating order_id
            populate: [
              {
                path: 'service_id', // Populating service_id within order_id
                select: 'title description price',
              },
              {
                path: 'buyer_id', // Populating buyer_id within order_id
                select: 'username email',
              },
              {
                path: 'seller_id', // Populating seller_id within order_id
                select: 'username email',
              },
            ],
          });
        if (!paymentData) {
            return res.status(404).json({ message: "payment not found." });
        }

        res.json({
            message: "payments with nested populated data fetched successfully!",
            paymentData,
        });
    } catch (error) {
        console.error("Error fetching with populated payment:", error);
        res.status(500).json({
            message: "An error occurred while fetching the populated data.",
            error: error.message,
        });
    }
};
