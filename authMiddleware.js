const jwt = require("jsonwebtoken");

const authMiddleware = (req, res, next) => {
  const token = req.header("Authorization")?.replace("Bearer ", "");

  router.get("/protected-route", authMiddleware, (req, res) => {
    res.status(200).json({ success: true, message: "You have access!", user: req.user });

  if (!token) {
    return res.status(401).json({ success: false, message: "Access denied. No token provided." });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // Attach decoded user to request object
    next();
  } catch (err) {
    res.status(400).json({ success: false, message: "Invalid token." });
  }
};

module.exports = authMiddleware;
