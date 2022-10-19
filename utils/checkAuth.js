import jwt from "jsonwebtoken";

export const checkAuth = (req, res, next) => {
  const token = (req.headers.autorization || "").replace(/Bearer\s?/, "");
  if (token) {
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.userId = decoded.id;
      next()
    } catch (error) {
      res.json({ message: "No access" });
    }
  } else {
    res.json({ message: "No access" });
  }
};
