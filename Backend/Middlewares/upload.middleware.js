const multer = require('multer')



const storage = multer.diskStorage({
    destination:(req,file,cb) => cb(null,'uploads'),
    filename:(req, file, cb) => {
        if(!file.mimetype.startsWith('image/'))
        {
            cb(new Error('file not accepted'), null)
        }
        cb(null, Date.now() + file.originalname)
    }
})

module.exports = multer({storage})