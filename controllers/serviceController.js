import mongoose from "mongoose";
import Service from "../modals/service.model.js";

//get All services
export const serviceIndex = async(req,res)=>{
    try{
        let serviceData = await Service.find();
        // res.send(categoryData);
        res.json(serviceData);
    }
        catch (error) {
            console.error("Error fetching service Data:", error);
            res.status(500).json({
                message: 'An error occurred while fetching service Data.',
                error: error.message,
            });
    }
}
//get single service by id
export const serviceShow = async(req,res) =>{
    let service_id = req.params._id;
    try{
        let serviceData = await Service.findById(service_id);
        // res.send(categoryData);
        res.json(serviceData);
    }
        catch (error) {
            console.error("Error fetching serviceData By ID:", error);
            res.status(500).json({
                message: 'An error occurred while fetching serviceData By ID.',
                error: error.message,
            });
    }
}


//create new service
export const serviceStore =  async(req,res) =>{

    try{
        const { title, 
            description,
            category_id,
            subcategory_id,
            price ,
            delivery_time,
            seller_id,
            tags,
            status    } = req.body;
            const images = req.files.map((file) => file.path); // Extract file paths

            // console.log('Uploaded Files:', req.files);
            // console.log('Image Paths:', images);
             const newService = await Service.create({ 
                title, 
                description,
                category_id,
                subcategory_id,
                price ,
                delivery_time,
                seller_id,
                images,
                tags,
                status
        });
        await newService.save();
        res.json({
            message :'New Service added successfully!',
            service: newService,
            });

    }catch(error){
        console.error("Error occurred while Saving Service:", error);
        res.status(500).json({
            message:'Unable to save the Service!',
            error: error.message,
        });
    }
}
// update Service
export const updateService = async(req,res) =>{
    const service_id = req.params._id;
    // Validate the category ID
    if (!mongoose.Types.ObjectId.isValid(service_id)) {
        return res.status(400).json({ message: "Invalid Service ID." });
    }
    const { title, 
            description,
            category_id,
            subcategory_id,
            price ,
            delivery_time,
            seller_id,
            // images,
            tags,
            status   } = req.body;
            const images = req.files.map((file) => file.path); // Extract file paths
            
            try{
                const updatedServiceData = await Service.findByIdAndUpdate(
                    service_id,
                    {
                        $set: {
                                title,
                                description,
                                category_id,
                                subcategory_id,
                                price,
                                delivery_time,
                                seller_id,
                                images,
                                tags,
                                status,
                        },
                    },

                    { new: true });
                    
                    if (!updatedServiceData) {
                        return res.status(404).json({ message: "Service not found." });
                    }
                    // console.log(updatedServiceData);
                    
                    res.json({
                        message: "Service updated successfully!",
                        services: updatedServiceData,
                    });
                }
                catch(error){
                    console.error("Error occurred while Updateing Service:", error);
                    res.status(500).json({
                        message:'Unable to update the Service!',
                        error: error.message,
                    });
                }
            };


//delete Services
export const deleteService = async(req,res) =>{
    let service_id = req.params._id;

    try{
        let service = await Service.findByIdAndDelete(service_id);
        // res.send(categoryData);
        res.json({
            message: "Service Deleted successfully!",
            DeleteService:service
        });
    }
    catch(error){
        console.error("Error occurred while Deleteing Service:", error);
        res.status(500).json({
            message:'Unable to Delete the Service!',
            error: error.message,
        });
    }
} 

//populate services
// export const popServices = async (req, res) => {
//     try {
//         const service_id = req.params._id;

//         // Validate ObjectId
//         if (!mongoose.Types.ObjectId.isValid(service_id)) {
//             return res.status(400).json({ message: "Invalid Service ID." });
//         }

//         // Fetch the Service and populate category_id ,subCategory and User
//         const serviceData = await Service.findById(service_id)
//         .populate('category_id') // Populate the Category model
//         .populate('subcategory_id') // Populate the Subcategory model
//         .populate('seller_id'); // Populate the User model
//       console.log(serviceData);
      
//         if (!serviceData) {
//             return res.status(404).json({ message: "Service not found." });
//         }

//         res.json({
//             message: "Service with populated  fetched successfully!",
//             serviceData,
//         });
//     } catch (error) {
//         console.error("Error fetching with populated services:", error);
//         res.status(500).json({
//             message: "An error occurred while fetching the subcategory with populated services.",
//             error: error.message,
//         });
//     }
// };


//populate userId and nested categortID from subCategoryId

export const getServiceWithNestedCategory = async (req,res) => {
    try {
        const serviceId = req.params._id;
      const service = await Service.findById(serviceId)
        .populate({
          path: 'subcategory_id', 
          populate: { 
            path: 'category_id', 
             select: 'name description', 
          },
        })
        .populate({
          path: 'seller_id'
        //   select: 'name email',
        });
    if (!service) 
        {
            return res.status(404).json({ message: "Service not found." });
        }
            
        res.json({
            message: "Service with populated  fetched successfully!",
            service,
         });
    } catch (error) 
    {
        console.error("Error fetching with populated services:", error);
        res.status(500).json({
        message: "An error occurred while fetching the subcategory with populated services.",
        error: error.message,
                });
            }
        }