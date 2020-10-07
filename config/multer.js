const multer = require("multer");

// Storage defines the directory that the profile pictures are stared, in this case the uploads directory in the public layer.
const storage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, "./public/upload/");
  },
  filename: function(req, file, cb) {
    console.log(new Date().toISOString());
    cb(null, new Date().toISOString().replace(/:/g, "c") + file.originalname);
  }
});

// Filters files to make sure only images or gifs are uploaded
const fileFilter = (req, file, cb) => {
  if (file.mimetype === "image/jpeg" || file.mimetype === "image/png" || file.mimetype === "image/gif") {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

// Upload multer function uses the storage function and fileFilter function seen above and determins the filesize to be 5 MB
const upload = multer({
  storage: storage,
  limits: {
    fileSize: 5000000
  },
  fileFilter: fileFilter
});

module.exports = upload;