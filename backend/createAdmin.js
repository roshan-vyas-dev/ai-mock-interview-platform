require("dotenv").config();
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const User = require("./models/User");

mongoose.connect(process.env.MONGO_URI).then(() => {
  console.log("MongoDB connected!");
});

const createAdmin = async () => {
  try {
    // Check if admin already exists
    const existing = await User.findOne({ email: "admin@mockinterview.com" });
    if (existing) {
      console.log("Admin already exists!");
      mongoose.connection.close();
      return;
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash("admin123456", salt);

    // Create admin user
    const admin = new User({
      name: "Admin",
      email: "admin@mockinterview.com",
      password: hashedPassword,
      role: "admin",
    });

    await admin.save();
    console.log("✅ Admin created successfully!");
    console.log("Email: admin@mockinterview.com");
    console.log("Password: admin123456");
    mongoose.connection.close();
  } catch (error) {
    console.log("Error:", error.message);
  }
};

createAdmin();