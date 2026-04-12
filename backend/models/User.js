const mongoose = require("mongoose");

// Create User Schema
const userSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, "Name is required"],
            trim: true,
        },

        email: {
            type: String,
            required: [true, "Email is required"],
            unique: true,
            lowercase: true,
        },

        password: {
            type: String,
            required: [true, "Password is required"],
        },

        role: {
            type: String,
            enum: ["user", "admin"],
            default: "user",
        },

        isBlocked: {
            type: Boolean,
            default: false,
        },
    },
    {
        timestamps: true,
    }
);

module.exports = mongoose.model("User", userSchema);