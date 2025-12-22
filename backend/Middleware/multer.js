const multer = require("multer");

const storage = multer.memoryStorage(); // stores file temporarily in memory
const upload = multer({ storage });

module.exports = upload;
