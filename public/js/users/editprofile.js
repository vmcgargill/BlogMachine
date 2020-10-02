$("#myFile").on("click", function() {
    const id = $(this).val();
    alert("Upload Image?");
    window.location.href = "/editprofile/?user_id=" + id;

})

const storage = multer.diskStorage({
    destination: ".public/upload",
    filename: function(req, file, cb) {
        cb(null, file.fieldName + "-" + Date.now() + path.extname(file.originalname));
    }
});

const upload = multer({
    storage: storage, limits: {fileSize: 1000000},
    fileFilter: function(req, file, cb){
        checkfiletype(file, cb);
    }
}).single('myFile');
function checkfiletype(file, cb) {
    const fileTypes = /jpeg|jpg|png|gif/;
    const extName = filetypes.test(path.extName
        (file.originalname).toLowerCase());
    const mimeType = fileTypes.test(file.mimetype);
        if(mimeType && extname) {
            return cb(null, true);
        } else {
            cb("Error: Images only!");
        } 
}

app.post('.public/upload', (req, res) => {
    upload(req, res, (err) => {
        if(err) {
        res.render('/', {
            msg: err
        });
    } else {
        if(req.file == underfined) {
            res.render('index', {
                msg: "Error: No file selected!"
            });
        } else { 
            res.render('/', {
                msg: "File uploaded!",
                file: `uploads/${req.file.filename}`
            });
        }
        console.log(req.file);
        res.send('test');
        }
    })
})

