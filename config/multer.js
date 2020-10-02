const multer = require("multer");

const storage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, "./public/upload/")
  },
  filename: function(req, file, cb) {
    console.log(new Date().toISOString())
    cb(null, new Date().toISOString().replace(/:/g, "c") + file.originalname)
  }
});

const fileFilter = (req, file, cb) => {
  if (file.mimetype === "image/jpeg" || file.mimetype === "image/png" || file.mimetype === "image/gif") {
    cb(null, true);
  } else {
    cb(null, false);
  }
}

const upload = multer({
  storage: storage,
  limits: {
    fileSize: 5000000
  },
  fileFilter: fileFilter
})

module.exports = upload;