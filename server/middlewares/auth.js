import jwt from "jsonwebtoken";

/* ---------------- VERIFY LOGIN TOKEN ---------------- */

export const auth = (req, res, next) => {

  try {

    const header = req.headers.authorization;

    if (!header) {
      return res.status(401).json({
        message: "No token provided"
      });
    }

    const token = header.split(" ")[1];

    const decoded = jwt.verify(token, process.env.JWT_SECRET || "secretKey");

    req.user = decoded;

    next();

  } catch (err) {

    return res.status(401).json({
      message: "Invalid or expired token"
    });

  }

};



/* ---------------- ADMIN ONLY ---------------- */

export const adminOnly = (req, res, next) => {

  if (!req.user) {
    return res.status(401).json({
      message: "Unauthorized"
    });
  }

  if (req.user.role !== "admin") {
    return res.status(403).json({
      message: "Admin access required"
    });
  }

  next();

};



/* ---------------- ADMIN OR SUBADMIN ---------------- */

export const adminOrSubAdmin = (req, res, next) => {

  if (!req.user) {
    return res.status(401).json({
      message: "Unauthorized"
    });
  }

  if (req.user.role !== "admin" && req.user.role !== "subadmin") {
    return res.status(403).json({
      message: "Access denied"
    });
  }

  next();

};