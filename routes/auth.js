import { Router } from "express";
import {
  register,
  login,
  getMe,
  getUserById,
  getAllUsers,
} from "../controllers/auth.js";
import { checkAuth } from "../utils/checkAuth.js";

const router = new Router();

//Register
router.post("/register", register);

//Login
router.post("/login", login);

//Get Me
router.get("/me", checkAuth, getMe);

// Get User
router.get("/:id", getUserById);

// Get All Users
router.get("/users/all", getAllUsers);

export default router;
