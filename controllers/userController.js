
 import { ObjectId } from "mongodb";
import { response } from "express";
import User from "../modals/user.model.js";
import { hashPassword } from "../utilis/helpers.js";
import multer from "multer";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

//show the list of user
export const index = (req, res, next) => {
    User.find()
    .then(response =>{
        res.json({
            response
        })
    })
    .catch(error => {
        res.json({
            message : 'An error occured '
        })
    })
}

//show single user by id

export const show =(req,res,next) =>{
    // let user_Id = req.body.user_Id;
    let user_Id = req.params.user_Id;
    User.findById(user_Id)
    .then(response =>{
        res.json({
            response
        })
    })
    .catch(error => {
        res.json({
            message : 'An error occured '
        })
    })

}
//add new user

export const store = async (req, res, next) => {
    try {
        // Hash the password
        const hashedPassword = await hashPassword(req.body.password);
        // Create a new user with the hashed password
        const newUser = await User.create({
                username: req.body.username,
                email: req.body.email,
                password: hashedPassword, // Assign the resolved hashed password
                 profile_picture: req.file ? req.file.path : null, // Save the file path
                role: req.body.role,
                bio: req.body.bio,
                skills: req.body.skills,
                
            });
        
        // Save the user to the database
        const savedUser = await newUser.save();
       
        let token;
        try {
            token = jwt.sign(
                {
                    userId: savedUser.id,
                    email: savedUser.email
                },
                // "secretkeyappearshere",
                process.env.JWT_SECRET, // Secret key from .env
                { expiresIn: "1h" }
            );
        } catch (err) {
            const error =
                new Error("Error! Something went wrong.");
            return next(error);
        }
        
        
        res.json({
            message: 'User added successfully!',
            user: savedUser,
            token: token,
        });
    } catch (error) {
        console.error("Error occurred while adding user:", error);
        res.status(500).json({
            message: 'An error occurred while adding the user.',
            error: error.message,
        });
    }
};


export const update = async (req, res, next) => {
    try {
        const user_Id = req.body.user_id || req.params.id;
        if (!user_Id) {
            return res.status(400).json({
                message: "User ID is required.",
            });
        }

        // Hash the password if it is provided in the request body
        let hashedPassword = req.body.password
            ? await hashPassword(req.body.password)
            : undefined;

        let updateData = {
            username: req.body.username,
            email: req.body.email,
            ...(hashedPassword && { password: hashedPassword }), // Only include hashed password if provided
            profile_picture: req.body.profile_picture,
            role: req.body.role,
            bio: req.body.bio,
            skills: req.body.skills,
        };
        // Ensure at least one field is being updated
        if (Object.keys(updateData).length === 0) {
            return res.status(400).json({
                message: "No fields provided to update.",
            });
        }
        // Find user by ID and update it
        const updatedUser = await User.findByIdAndUpdate(
            user_Id,
            { $set: updateData },
            { new: true } // Return the updated document
        );

        if (!updatedUser) {
            return res.status(404).json({
                message: 'User not found.',
            });
        }

        res.json({
            message: 'User updated successfully!',
            user: updatedUser,
        });
    } catch (error) {
        console.error("Error occurred while updating user:", error);
        res.status(500).json({
            message: 'An error occurred while updating the user.',
            error: error.message,
        })
    }
};

//delete an user
export const destroy =async(req, res, next) =>{
    let user_Id = req.params.id;
    try{

    const deleteUser =  await User.findByIdAndDelete(user_Id);
    if(!deleteUser){
        return  res.status(404).json({
            message : "user not Found!"
        });
    }
        res.json({
            message : 'user Deleted successfully!',
            user: deleteUser,
        })
    }
    catch (error) {
        console.error("Error deleting user:", error);
        res.status(500).json({
            message: 'An error occurred while deleting the user.',
            error: error.message,
        });
    }
};
//login
export const login = async (req, res,next) => {
    
    try {        
        console.log("Request body email:", req.body.email); // Log email from request

        const user = await User.findOne({
            //  { email: req.body.email } 
            email: { $regex: new RegExp(`^${req.body.email}$`, "i") },

            });
        console.log("User found:", user); // Log the user result

        if (!user) {
            return  res.status(500).json({
                status: true,
                message: "User Not Found",
            });
        }
      const validate = await bcrypt.compare(req.body.password, user.password);
        if (!validate) {
            return  res.status(500).json({
                status: true,
                message: "Wrong password",
            });

        }
      
        let token;
        try {
            //Creating jwt token
            token = jwt.sign(
                { id: user.id, email: user.email }, // Payload
                process.env.JWT_SECRET, // Secret key from .env
                { expiresIn: "1h" } // Token expiration

            );
        }catch (err) {
            console.error("Error generating JWT:", err.message);
            return next(new Error("Error! Something went wrong during token generation."));
        }


        res.status(200).json({
            status: true,
            message: "Logged in successfully",
            token: token,
            // user: 
            user: {
                id: user.id,
                email: user.email,
                username: user.username 
            }
        });
      
    } catch (error) {
        console.error("Error during login:", error.message);
        return next(error);
    }
};