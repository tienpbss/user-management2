const express = require('express');
const multer = require('multer');
const userControllers = require('../controllers/user.controllers');
const auth = require('../middleware/auth.middleware');
const router = express.Router();

// Set up multer for handling file uploads (avatar)
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './avatars/'); // Upload files to the 'uploads' directory
  },
  filename: function (req, file, cb) {
    cb(null, new Date().toISOString() + '-' + file.originalname);
  },
});
const fileFilter = (req, file, cb) => {
  if (file.mimetype.startsWith('image/')) {
    cb(null, true);
  } else {
    cb(new Error('Only image files are allowed!'), false);
  }
};
const upload = multer({ storage, fileFilter });


router.post('/login', auth.isNotLogged, userControllers.login);
router.get('/viewInfo', auth.isLogged, userControllers.viewInfo);
router.patch('/editInfo', auth.isLogged, userControllers.editInfo);
router.patch('/updateAvatar', auth.isLogged, upload.single('avatar'), userControllers.updateAvatar);
router.get('/getAvatar', auth.isLogged, userControllers.getAvatar);

router.get('/getAllUsers', auth.isLogged, userControllers.getAllUsers);
router.get('/getUser/:userId', auth.isLogged, userControllers.getUser);
router.post('/addUser', userControllers.addUser);
// router.post('/addUser', auth.isLogged, adminControllers.addUser);
router.patch('/editUser/:userId', auth.isLogged, userControllers.editUser);
router.patch('/editStatusUser/:userId', auth.isLogged, userControllers.editStatusUser);
router.post('/editRoleUser/:userId', auth.isLogged, userControllers.editRoleUser);

module.exports = router;