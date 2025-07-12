
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");
const bcrypt = require("bcryptjs");

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());

const User = require("./Models/user");
const Contact = require("./Models/contact");

// MongoDB Connect
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("✅ MongoDB connected"))
  .catch(err => console.error("❌ Mongo Error:", err));

// Signup Route
app.post("/signup", async (req, res) => {
  const { name, email, password } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);
  try {
    const user = new User({ name, email, password: hashedPassword });
    await user.save();
    res.status(201).json({ message: "Signup successful" });
  } catch (err) {
    res.status(400).json({ message: "Email already exists" });
  }
});

// Login Route
app.post("/login", async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user) return res.status(400).json({ message: "User not found" });

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) return res.status(400).json({ message: "Invalid password" });

  res.json({ message: "Login successful" });
});

// Contact Form Route
app.post("/contact", async (req, res) => {
  const { name, email, phone, message } = req.body;

  try {
    const contact = new Contact({ name, email, phone, message });
    await contact.save();
    res.status(201).json({ message: "Contact form submitted successfully" });
  } catch (err) {
    res.status(500).json({ message: "Error submitting contact form", error: err });
  }
});

// Start server
app.listen(process.env.PORT, () => {
  console.log(`🚀 Server running on http://localhost:${process.env.PORT}`);
}); 