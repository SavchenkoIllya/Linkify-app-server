import { getLinkPreview } from "link-preview-js";
import validUrl from "valid-url";
import Link from "../models/Link.js";

//get link data
export const getLink = async (req, res) => {
  try {
    const link = req.body.postData;
    if (validUrl.isUri(link)) {
      try {
        getLinkPreview(`${link}`).then((data) => {
          if (data) {
            let linkData = data;
            res.json({ linkData });
          } else {
            res.json({ message: "bad url" });
          }
        });
      } catch (error) {
        res.json({ message: "bad url" });
      }
    } else {
      res.json({ message: "bad url" });
    }
  } catch (error) {
    res.json({ message: "bad url" });
  }
};

//Create new link
export const create = async (req, res) => {
  try {
    const link = req.body;
    const newLink = new Link(link);
    await newLink.save();
    res.json({ message: "Link saved successfully" });
  } catch (error) {
    res.json({ message: "Link didn't saved" });
  }
};

//Get all links from current category
export const getAllCategoriesLinks = async (req, res) => {
  try {
    const links = await Link.find({ category: req.body.categoryId }).sort(
      "-createdAt"
    );
    res.json({ links });
  } catch (error) {
    res.json({ message: "Cannot recive all categories" });
  }
};

//delete link
export const deleteLink = async (req, res) => {
  try {
    const links = await Link.findByIdAndDelete(req.params.id);
    if (!links) {
      res.json({
        message: "You are trying to remove link that doesn't exist",
      });
    } else {
      res.json({ message: "Link removed successfully" });
    }
  } catch (error) {
    res.json({ message: "Link didn't remooved" });
  }
};
