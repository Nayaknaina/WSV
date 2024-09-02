const multer = require('multer');
const path = require('path');
const fs = require('fs');

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const dir = path.join(__dirname, '../../template/images/uploads/whatsapp');
    
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

// Initialize Multer with storage configuration and file type filter
const upload = multer({
  storage: storage,
  fileFilter: (req, file, cb) => {
    // Accept only image or PDF files
    const fileTypes = /jpeg|jpg|png|pdf/;
    const extname = fileTypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = fileTypes.test(file.mimetype);

    if (extname && mimetype) {
      return cb(null, true);
    } else {
      cb(new Error('Error: Only images and PDF files are allowed!'));
    }
  }
});

module.exports = {
  upload,
};
