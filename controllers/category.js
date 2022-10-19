import User from "../models/User.js";
import Category from "../models/Category.js";
import Link from "../models/Link.js";

//Post category
export const create = async (req, res) => {
  try {
    const authorId = req.body.userId;
    const { title, color } = req.body;
    if (!authorId) {
      return res.json({ message: "can't find author" });
    }
    const newCategory = new Category({
      title,
      author: authorId,
      color,
    });
    await newCategory.save();
    res.json({ message: "Category saved successfully", newCategory });
  } catch (error) {
    res.json({ message: "Category didn't saved" });
  }
};

//Update category
export const update = async (req, res) => {
  try {
    const category = await Category.findByIdAndUpdate(req.params.id);
    const { title, color } = req.body;
    category.title = title;
    category.color = color;
    a;
    await category.save();
    res.json({ message: "Category updated successfully" });
  } catch (error) {
    res.json({ message: "Category didn't updated" });
  }
};

//Delete category
export const deleteCategory = async (req, res) => {
  try {
    const category = await Category.findByIdAndDelete(req.params.id);
    await Link.deleteMany({ category: req.params.id });
    if (!category) {
      res.json({
        message: "You are trying to remove category that doesn't exist",
      });
    } else {
      res.json({ message: "Category removed successfully" });
    }
  } catch (error) {
    res.json({ message: "Category didn't remooved" });
  }
};

// Get all users categories
export const getUsersCategories = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    const authorId = user._id;
    const categories = await Category.find({ author: authorId });
    res.json(categories);
  } catch (error) {
    res.json({ message: "Something went wrong" });
  }
};

//Get category by id
export const getCategoryById = async (req, res) => {
  try {
    const category = await Category.findById(req.params.id);
    if (!category) {
      return res.json({ message: "This category doesn't exist yet" });
    }
    const { title, _id, author } = category;
    const user = await User.findById(author);
    const authorName = user.username;
    const authorId = user._id;
    res.json({ title, _id, authorName, authorId });
  } catch (error) {
    res.json({ message: "Category error: " + error.message });
  }
};
