import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../Models/User.js";

// Register
export const register = async (req, res) => {
  try {
    const { firstName, lastName, email, password, city, country } = req.body;
    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(password, salt);
    const newUser = new User({
      firstName,
      lastName,
      email,
      password: hashedPassword,
      city,
      country,
    });
    const savedUser = await newUser.save();
    res.status(201).json(savedUser);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Login
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email: email });
    if (!user) {
      return res.status(400).json({ message: "User does not exit." });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid Credential" });
    }
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
    delete user.password;
    return res.status(200).json({ token, user });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const users = async (req, res) => {
  try {
    const users = await User.find({});
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
