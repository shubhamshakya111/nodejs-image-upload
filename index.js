const express = require("express");
const multer = require("multer");
const ejs = require("ejs");
const path = require("path");

// Set storage engine
const storage = multer.diskStorage({
  destination: "./public/uploads/",
  filename: function (req, file, cb) {
    cb(
      null,
      file.fieldname + "-" + Date.now() + path.extname(file.originalname)
    );
  },
});

// Initialize upload
const upload = multer({
  storage: storage,
}).single("myImage");

const app = express();

// Set EJS as templating engine
app.set("view engine", "ejs");

// Public folder
app.use(express.static("./public"));

app.get("/", (req, res) => {
  res.render("index",{msg: "", file: ""});
});

app.post("/upload", upload, (req, res) => {
    const file = `uploads/${req.file.filename}`;
    res.render("index", {
      msg: "File Uploaded!",
      file: file,
    });
  });

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
