const multer = require('multer');
const uuidv4 = require('uuid');
var path = require('path');

// Set up storage for uploaded files
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'data/'+req.location);
  },
  filename: (req, file, cb) => {
    cb(null, uuidv4.v4().toString()+path.extname(req.filename));
  }
});

// Create the multer instance
const upload = multer({ storage: storage });

module.exports = upload;