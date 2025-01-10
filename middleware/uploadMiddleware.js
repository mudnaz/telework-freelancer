// middleware/uploadMiddleware.js
import multer from 'multer';
import path from 'path';
import fs from 'fs';

// Function to ensure the directory exists
const ensureDirectoryExists = (dirPath) => {
    if (!fs.existsSync(dirPath)) {
      fs.mkdirSync(dirPath, { recursive: true }); // Create directory if it doesn't exist
    }
  };
  

// Set up multer middleware
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        // cb(null, 'uploads/');
        // Use separate directories for users and services
    let basePath = path.resolve('uploads');
    let folder;

    if (req.baseUrl.includes('/Service')) {
      folder = 'services'; // Directory for service images
    } else if (req.baseUrl.includes('/User')) {
      folder = 'users'; // Directory for user images
    } else {
      folder = 'others'; // Fallback directory
    }
    
    const fullPath = path.join(basePath, folder);
    console.log('Saving to folder:', fullPath);
    
    ensureDirectoryExists(fullPath);


    
    cb(null, fullPath);
    // cb(null,'uploads/' ); // Pass the correct folder path
  },
    // },
    filename: (req, file, cb) => {
        const timestamp = Date.now();
        const originalName = file.originalname.replace(/\s/g, '_'); // Replace spaces with underscores
        const customFileName = `${timestamp}-${originalName}`;
        cb(null, customFileName); // Save with timestamp + original name
      },
      

});
const upload = multer({ storage });

export default upload;
