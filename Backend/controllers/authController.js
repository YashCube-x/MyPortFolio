import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ success: false, message: "Email and password are required" });
    }

    if (email !== process.env.ADMIN_EMAIL) {
      return res.status(401).json({ success: false, message: "Invalid credentials" });
    }

    const isMatch = await bcrypt.compare(password, process.env.ADMIN_PASSWORD_HASH || "");
    if (!isMatch) {
      return res.status(401).json({ success: false, message: "Invalid credentials" });
    }

    const token = jwt.sign({ role: "admin" }, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_EXPIRES_IN || "7d",
    });

    res.json({ success: true, token });
  } catch (error) {
    console.error("Login Error:", error);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

export const me = (req, res) => {
  res.json({ success: true, role: req.admin?.role || "admin" });
};
