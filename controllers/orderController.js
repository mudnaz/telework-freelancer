import Order from "../modals/orders.model.js";
import mongoose from "mongoose";

//get All orders
export const ordersIndex = async(req,res)=>{
    try{
        let orders = await Order.find();
        res.json(orders);
    }
        catch (error) {
            console.error("Error fetching orders Data:", error);
            res.status(500).json({
                message: 'An error occurred while fetching orders Data.',
                error: error.message,
            });
    }
}
//get single order by id
export const ordersShow = async(req,res) =>{
    let order_id = req.params._id;
    try{
        let order = await Order.findById(order_id);
        res.json(order);
    }
        catch (error) {
            console.error("Error fetching order Data By ID:", error);
            res.status(500).json({
                message: 'An error occurred while fetching order Data By ID.',
                error: error.message,
            });
    }
}

//create new service
export const orderStore =  async(req,res) =>{

    try{
        const {
            order_id,
            service_id,
            buyer_id,
            seller_id,
            status,
            price,
            delivery_date
            } = req.body;
            
             const newOrder = await Order.create({ 
            order_id,
            service_id,
            buyer_id,
            seller_id,
            status,
            price,
            delivery_date
        });
        await newOrder.save();
        res.json({
            message :'New Order added successfully!',
            order: newOrder,
            });

    }catch(error){
        console.error("Error occurred while Saving Order:", error);
        res.status(500).json({
            message:'Unable to save the Orders!',
            error: error.message,
        });
    }
}

//delete Order
export const deleteOrder = async(req,res) =>{
    let order_id = req.params._id;

    try{
        let order = await Order.findByIdAndDelete(order_id);
        res.json({
            message: "order Deleted successfully!",
            orderService:order
        });
    }
    catch(error){
        console.error("Error occurred while Deleteing order:", error);
        res.status(500).json({
            message:'Unable to Delete the order!',
            error: error.message,
        });
    }
} 

// update Order
export const updateOrder = async(req,res) =>{
    const order_id = req.params._id;
    // Validate the order ID
    if (!mongoose.Types.ObjectId.isValid(order_id)) {
        return res.status(400).json({ message: "Invalid order ID." });
    }
    const {
        service_id, 
        buyer_id,
        seller_id, 
        status, 
        price,
        delivery_date    
            } = req.body;
            
        try{
            const updatedOrderData = await Order.findByIdAndUpdate(
                order_id,
                    {
                        $set: {
                            service_id, 
                            buyer_id,
                            seller_id, 
                            status, 
                            price,
                            delivery_date
                        },
                    },
                    { new: true });
                    
                    if (!updatedOrderData) {
                        return res.status(404).json({ message: "Order not found." });
                    }                  
                    res.json({
                        message: "Order updated successfully!",
                        services: updatedOrderData,
                    });
                }
                catch(error){
                    console.error("Error occurred while Updateing Order:", error);
                    res.status(500).json({
                        message:'Unable to update the Order!',
                        error: error.message,
                    });
                }
            };

// populate Order
export const popOrder = async (req, res) => {
    try {
        const order_id = req.params._id;

        // Validate ObjectId
        if (!mongoose.Types.ObjectId.isValid(order_id)) {
            return res.status(400).json({ message: "Invalid order ID." });
        }

        // Fetch the Service and populate category_id ,subCategory and User
        const orderData = await Order.findById(order_id)
        .populate({
            path: 'service_id',
            // select: 'title price category_id', // Include specific fields
            populate: [

                {
                    path: 'category_id',
                    select: 'name description', // Nested population
                },
                {
                    path: 'subcategory_id',
                    select: 'title description', // Nested population
                },
                // {
                //     path: 'seller_id',
                //     select:'username email',
                // }
            ]
            })
        // .populate('service_id')
        .populate('buyer_id') 
        .populate('seller_id'); 
    //   console.log(orderData);
      
        if (!orderData) {
            return res.status(404).json({ message: "Order not found." });
        }

        res.json({
            message: "Orders with populated data fetched successfully!",
            orderData,
        });
    } catch (error) {
        console.error("Error fetching with populated orders:", error);
        res.status(500).json({
            message: "An error occurred while fetching the populated data.",
            error: error.message,
        });
    }
};
