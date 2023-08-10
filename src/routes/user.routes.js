const express = require('express');
const multer = require('multer');
const auth = require('../middleware/auth.middleware');
const router = express.Router();
const { permissions } = require('../utils/values');;
const {
	READ_USER,
	UPDATE_USER,
	CREATE_USER
} = permissions

const {
    login,
    viewInfo,
    editInfo,
    editPassword,
    updateAvatar,
    getAvatar,
    getAvatarUser,
    getAllUsers,
    getUser,
    addUser,
    editUser,
    editPasswordUser,
    editStatusUser,
    editRoleUser,
} = require('../controllers/user.controllers')

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


router.post('/login', auth.isNotLogged, login);
router.get('/viewInfo', auth.isLogged, viewInfo);
router.patch('/editInfo', auth.isLogged, editInfo);
router.patch('/editPassword', auth.isLogged, editPassword);
router.patch('/updateAvatar', auth.isLogged, upload.single('avatar'), updateAvatar);
router.get('/getAvatar', auth.isLogged, getAvatar);

router.get('/getAvatarUser/:userId', auth.isLogged, auth.checkPermission(READ_USER), getAvatarUser);
router.get('/getAllUsers', auth.isLogged, auth.checkPermission(READ_USER), getAllUsers);
router.get('/getUser/:userId', auth.isLogged, auth.checkPermission(READ_USER), getUser);
router.post('/addUser', addUser);
// router.post('/addUser', auth.isLogged, auth.checkPermission(CREATE_USER), adminControllers.addUser);
router.patch('/editUser/:userId', auth.isLogged, auth.checkPermission(UPDATE_USER), editUser);
router.patch('/editPasswordUser/:userId', auth.isLogged, auth.checkPermission(UPDATE_USER), editPasswordUser);
router.patch('/editStatusUser/:userId', auth.isLogged, auth.checkPermission(UPDATE_USER), editStatusUser);
router.post('/editRoleUser/:userId', auth.isLogged, auth.checkPermission(UPDATE_USER), editRoleUser);

module.exports = router;