import { Router } from "express";
// import { checkAuth } from "../utils/checkAuth.js";
import { getLink, create, getAllCategoriesLinks, deleteLink } from "../controllers/link.js";

const router = new Router();

//Get url data
router.post("/getLinkData", getLink);

//Create new link
router.post("/create", create);

//Get all categories links
router.post("/getAllCategoriesLinks", getAllCategoriesLinks);

//Delete link
router.delete("/:id", deleteLink);

export default router;
