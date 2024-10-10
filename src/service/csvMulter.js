const multer = require('multer');
const path = require("path");
const fs = require("fs");

// Set storage engine using multer
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      const dir = path.join(__dirname, '../../template/images/uploads/csv');
      
      // Check if the directory exists
      if (!fs.existsSync(dir)) {
        // Create the directory if it does not exist
        fs.mkdirSync(dir, { recursive: true });
      }
  
      cb(null, dir);
    },
    filename: (req, file, cb) => {
      // Save files with their original name with a timestamp
      cb(null, `${Date.now()}-${file.originalname}`);
    }
  });

// Multer filter to allow only CSV files
const csvFilter = (req, file, cb) => {
  if (file.mimetype === 'text/csv') {
    cb(null, true);
  } else {
    cb(new Error('Please upload only CSV files.'), false);
  }
};

// Initialize multer with the defined storage and file filter
const uploadCSV = multer({
  storage: storage,
  fileFilter: csvFilter
});

module.exports = uploadCSV;
