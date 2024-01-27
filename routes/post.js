const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const multerGoogleStorage = require('multer-google-storage');

const { afterUploadImage, uploadPost } = require('../controllers/post');
const { isLoggedIn } = require('../middlewares');

const router = express.Router();

try {
  fs.readdirSync('uploads');
} catch (err) {
  console.error('uploads 폴더가 없어 uploads 폴더를 생성합니다');
  fs.mkdirSync('uploads');
}

const upload = multer({
  storage: multerGoogleStorage.storageEngine({
    bucket: 'mynodebird',
    projectId: 'node-deploy-412306',
    keyFilename: 'node-deploy-412306-130606dbf636.json',
    filename(req, file, cb) {
      const ext = path.extname(file.originalname);
      cb(null, `original/${Date.now()}_${file.originalname}`);
    },
  }),
  limits: { fileSize: 5 * 1024 * 1024 },
});

router.post('/img', isLoggedIn, upload.single('img'), afterUploadImage);

const upload2 = multer();
router.post('/', isLoggedIn, upload2.none(), uploadPost);

module.exports = router;
