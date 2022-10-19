import { Router } from "express";
import { checkAuth } from "../utils/checkAuth.js";
import {
  create,
  update,
  deleteCategory,
  getUsersCategories,
  getCategoryById,
} from "../controllers/category.js";

const router = new Router();

//Post Categories
router.post("/create", checkAuth, create);

//Change Categories
router.put("/:id", checkAuth, update);

//Get all users categories
router.get("/:id", getUsersCategories);

//Delete Categoies
router.delete("/:id", checkAuth, deleteCategory);

//Get Categoies by id
router.get("/:id/links", getCategoryById);

export default router;
