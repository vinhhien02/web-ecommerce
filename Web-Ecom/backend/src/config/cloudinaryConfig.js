const cloudinary = require("cloudinary").v2;
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const multer = require("multer");
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});
const storage = new CloudinaryStorage({
  cloudinary,

  params: (req, file) => {
    let baseFolder = "webraovat";
    let folderName = baseFolder; // Mặc định là thư mục chung
    let allowedFormats = [
      "jpg",
      "png",
      "jpeg",
      "jfif",
      "mp4",
      "mov",
      "avi",
      "mkv",
      "webp",
    ];

    if (req.body.type === "imageUser") {
      folderName = `${baseFolder}/avatar`; // Thư mục cho ảnh đại diện
    } else if (req.body.type === "product") {
      folderName = `${baseFolder}/product`; // Thư mục cho ảnh sản phẩm
    } else if (req.body.type === "category") {
      folderName = `${baseFolder}/category`; // Thư mục cho ảnh danh muc
    }
    const format = file.mimetype.split("/")[1];
    if (!allowedFormats.includes(format)) {
      throw new Error("Định dạng tệp không được hỗ trợ.");
    }
    return {
      folder: folderName,
      format: file.mimetype.split("/")[1],
      format: format,
    };
  },
});

const upload = multer({ storage });
module.exports = upload;
