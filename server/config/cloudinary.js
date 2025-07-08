const cloudinary = require('cloudinary').v2
const { CloudinaryStorage } = require('multer-storage-cloudinary');

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
    secure: true
})

const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
        folder: 'staynesia',
        allowed_formats: ['jpg', 'png', 'jpeg', 'webp'],
        use_filename: true,
        unique_filename: false,
    }
})

module.exports = { cloudinary, storage }