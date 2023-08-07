const express = require('express');
const multer = require('multer');
const userControllers = require('../controllers/user.controllers');
const auth = require('../middleware/auth.middleware');
const router = express.Router();
const { roles } = require('../utils/values');;
const { ADMIN, DIRECTOR, HR, MANAGER, EMPLOYEE } = roles

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
router.patch('/editPassword', auth.isLogged, userControllers.editPassword);
router.patch('/updateAvatar', auth.isLogged, upload.single('avatar'), userControllers.updateAvatar);
router.get('/getAvatar', auth.isLogged, userControllers.getAvatar);

router.get('/getAvatarUser/:userId', auth.isLogged, auth.checkRole(ADMIN, DIRECTOR, HR, MANAGER), userControllers.getAvatarUser);
router.get('/getAllUsers', auth.isLogged, auth.checkRole(ADMIN, DIRECTOR, HR, MANAGER), userControllers.getAllUsers);
router.get('/getUser/:userId', auth.isLogged, auth.checkRole(ADMIN, DIRECTOR, HR, MANAGER), userControllers.getUser);
router.post('/addUser', auth.isLogged, auth.checkRole(ADMIN), userControllers.addUser);
// router.post('/addUser', auth.isLogged, adminControllers.addUser);
router.patch('/editUser/:userId', auth.isLogged, auth.checkRole(ADMIN), userControllers.editUser);
router.patch('/editPasswordUser/:userId', auth.isLogged, auth.checkRole(ADMIN), userControllers.editPasswordUser);
router.patch('/editStatusUser/:userId', auth.isLogged, auth.checkRole(ADMIN), userControllers.editStatusUser);
router.post('/editRoleUser/:userId', auth.isLogged, auth.checkRole(ADMIN), userControllers.editRoleUser);

module.exports = router;