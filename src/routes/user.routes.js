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

router.post('/login', auth.isNotLogged, login
	/**
	 * #swagger.summary = 'Login' 
	 * #swagger.description = 'User login' 
	 * */
);
router.get('/viewInfo', auth.isLogged, viewInfo
	/**
	 * #swagger.summary = 'User view info '
	 * #swagger.description = 'End point for users to view their own information' 
	 * */
);
router.patch('/editInfo', auth.isLogged, editInfo
	/**
	 * #swagger.summary = 'User update info'
	 * #swagger.description = 'End point for users to edit their own information' 
	 * */
);
router.patch('/editPassword', auth.isLogged, editPassword
	/**
	 * #swagger.summary = 'User update password'
	 * #swagger.description = 'End point for users to edit their own password' 
	 * */
);
router.patch('/updateAvatar', auth.isLogged, upload.single('avatar'), updateAvatar
	/**
	 * #swagger.summary = 'User update avatar'
	 * #swagger.description = 'End point for users to upload their own avatar' 
	 * */
);
router.get('/getAvatar', auth.isLogged, getAvatar
	/**
	 * #swagger.summary = 'Return avatar for user'
	 * #swagger.description = 'End point for users to view their own avatar' 
	 * */
);

router.get('/getAvatarUser/:userId', auth.isLogged, auth.checkPermission(READ_USER), getAvatarUser
	/**
	 * #swagger.summary = 'Get avatar user'
	 * #swagger.description = 'End point for admin to view avatar of user' 
	 * */
);
router.get('/getAllUsers', auth.isLogged, auth.checkPermission(READ_USER), getAllUsers
	/**
	 * #swagger.summary = 'Get all users'
	 * #swagger.description = 'End point for admin to view all user in system' 
	 * */
);
router.get('/getUser/:userId', auth.isLogged, auth.checkPermission(READ_USER), getUser
	/**
	 * #swagger.summary = 'Get user by id'
	 * #swagger.description = 'Endpoint for admin to view specific user's information' 
	 * */
);
router.post('/addUser', addUser
	/**
	 * #swagger.summary = 'Add new user'
	 * #swagger.description = 'Endpoint for admin to add an user to system' 
	 * */
);
// router.post('/addUser', auth.isLogged, auth.checkPermission(CREATE_USER), adminControllers.addUser
	/**
	 * #swagger.summary = 'Add new user'
	 * #swagger.description = 'Endpoint for admin to add an user to system' 
	 * */
// );
router.patch('/editUser/:userId', auth.isLogged, auth.checkPermission(UPDATE_USER), editUser
	/**
	 * #swagger.summary = 'Admin edit info of user'
	 * #swagger.description = 'Endpoint for admin edit info of user' 
	 * */
);
router.patch('/editPasswordUser/:userId', auth.isLogged, auth.checkPermission(UPDATE_USER), editPasswordUser
	/**
	 * #swagger.summary = 'Admin edit password of user'
	 * #swagger.description = 'Endpoint for admin edit password of user' 
	 * */
);
router.patch('/editStatusUser/:userId', auth.isLogged, auth.checkPermission(UPDATE_USER), editStatusUser
	/**
	 * #swagger.summary = 'Activate/deactivate user'
	 * #swagger.description = 'true: activate user, false: deactivate user' 
	 * */
);
router.post('/editRoleUser/:userId', auth.isLogged, auth.checkPermission(UPDATE_USER), editRoleUser
	/**
	 * #swagger.summary = 'Set roles for user'
	 * #swagger.description = 'Admin set roles for user' 
	 * */
);

module.exports = router;