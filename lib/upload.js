const multer = require('multer')
const MAX_IMAGE_SIZE = 2
const upload = multer({
  dest: 'files/',
  limits: {
    fileSize: Math.ceil(MAX_IMAGE_SIZE * 1024 * 1024)
  }
})

export default upload