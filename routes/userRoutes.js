import express from "express";
import {
  register,
  login,
  logout,
  getMyProfile,
  changePassword,
  updateProfile,
  updateprofilepicture,
  forgetPassword,
  resetPassword,
  addToPlaylist,
  removeFromPlaylist,
  getAllUsers,
  deleteUser,
  updateUserRole,
} from "../controllers/userController.js";
import { isAuthenticated, authorizeAdmin } from "../middlewares/auth.js";
import singleUpload from "../middlewares/multer.js";

const router = express.Router();

// to register a new user
router.route("/register").post(singleUpload, register);

// login
router.route("/login").post(login);

//logout
router.route("/logout").get(logout);

// get my profile
router.route("/me").get(isAuthenticated, getMyProfile);

// changePassword
router.route("/changepassword").put(isAuthenticated, changePassword);

//updateProfile
router.route("/updateprofile").put(isAuthenticated, updateProfile);

//updateProfile Picture
router
  .route("/updateprofilepicture")
  .put(isAuthenticated, updateprofilepicture);

// Forget & Reset Password
router.route("/forgetpassword").post(forgetPassword);
router.route("/resetpassword/:token").put(resetPassword);

// Add to playlist
router.route("/addtoplaylist").post(isAuthenticated, addToPlaylist);

// Remove from playlist
router.route("/removefromplaylist").post(isAuthenticated, removeFromPlaylist);

// Admin Routes
router.route("/admin/users").get(isAuthenticated, authorizeAdmin, getAllUsers);

router
  .route("/admin/user/:id")
  .put(isAuthenticated, authorizeAdmin, updateUserRole)
  .delete(isAuthenticated, authorizeAdmin, deleteUser);

export default router;
