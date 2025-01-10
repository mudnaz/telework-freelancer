import express from "express";
import dotenv from "dotenv";
import path from 'path';
import { fileURLToPath } from 'url';
import applyMiddleware from "./middleware/index.js";
import routes from "./routes/index.js";
import connectDB from "./config/database.js";
dotenv.config();

// Connect to Database
connectDB();
//rest object
const app = express();
// Apply Middlewares
applyMiddleware(app);

// Define __dirname for ES Modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Static File 
const uploads = path.join(__dirname, '/uploads');
app.use('/uploads', express.static(uploads));

// API Routes
app.use("/api", routes);


const PORT = process.env.PORT || 3000;
app.listen(PORT, () =>{
    console.log(`Backend server is running on ${PORT}`);
    
})

