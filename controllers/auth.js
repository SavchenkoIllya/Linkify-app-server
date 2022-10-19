import User from "../models/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import path, { dirname } from "path";
import { fileURLToPath } from "url";

//Register
export const register = async (req, res) => {
  try {
    const { username, password } = req.body;
    const isUsed = await User.findOne({ username });
    if (isUsed) {
      return res.json({ message: "Username already registered" });
    }
    const salt = bcrypt.genSaltSync(10);
    const hash = await bcrypt.hash(password, salt);
    if (req.files) {
      let avatarName =
        Date.now().toString() + username + '.jpg';
      const _dirname = dirname(fileURLToPath(import.meta.url));
      req.files.file.mv(path.join(_dirname, "..", "uploads", avatarName));
      const newUser = new User({
        username,
        password: hash,
        imgUrl: avatarName,
      });
      await newUser.save();
      const token = jwt.sign(
        {
          id: newUser._id,
        },
        process.env.JWT_SECRET,
        { expiresIn: "24h" }
      );
      const newUserId = newUser._id;
      res.json({ message: "User saved successfully", token, newUserId });
    } else {
      const newUser = new User({
        username,
        password: hash,
      });
      await newUser.save();
      const token = jwt.sign(
        {
          id: newUser._id,
        },
        process.env.JWT_SECRET,
        { expiresIn: "24h" }
      );
      const newUserId = newUser._id;
      res.json({ message: "User saved successfully", token, newUserId });
    }
  } catch (error) {
    res.json({ message: "User didn't saved" });
  }
};

//Login
export const login = async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username });
    if (!user) {
      return res.json({ message: "This user doesn't exist yet" });
    }
    const isCorrectPassword = await bcrypt.compare(password, user.password);
    if (!isCorrectPassword) {
      return res.json({ message: "Incorrect password" });
    }
    const token = jwt.sign(
      {
        id: user._id,
      },
      process.env.JWT_SECRET,
      { expiresIn: "24h" }
    );
    const userId = user._id;
    res.json({ token, userId, message: "You are logged in successfully" });
  } catch (error) {
    res.json({ message: "User didn't authorizated" });
  }
};

//Get Me
export const getMe = async (req, res) => {
  try {
    const user = await User.findById(req.userId);
    if (!user) {
      return res.json({ message: "This user doesn't exist yet" });
    }
    const username = user.username;
    const userId = user._id;
    const imgUrl = user.imgUrl;
    res.json({ username, userId, imgUrl });
  } catch (error) {
    res.json({ message: "User didn't authorizated" });
  }
};

//get User by Id
export const getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.json({ message: "This user doesn't exist yet" });
    }
    const username = user.username;
    const userId = user._id;
    const imgUrl = user.imgUrl;

    try {
      const token = (req.headers.autorization || "").replace(/Bearer\s?/, "");
      if (token) {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        if (userId == decoded.id) {
          const isOwner = true;
          res.json({ username, userId, isOwner, imgUrl });
        }
      } else {
        const isOwner = false;
        res.json({ username, userId, isOwner, imgUrl });
      }
    } catch (error) {
      res.json({ username, userId });
    }
  } catch (error) {
    res.json({ message: "User didn't authorizated" });
  }
};

//get All users
export const getAllUsers = async (req, res) => {
  try {
    const allUsersdb = await User.find();
    let allUsers = []
    allUsersdb.forEach((a) => {
      let obj = {
        _id : a._id,
        username : a.username,
        imgUrl : a.imgUrl,
        createdAt : a.createdAt,
      }
      allUsers.push(obj)
    });
    res.json(allUsers);
  } catch (error) {
    res.json({ message: "cannot get all users" });
  }
};
