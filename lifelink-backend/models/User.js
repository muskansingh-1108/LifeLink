const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, unique: true },
    password: { type: String, required: true },
    bloodType: String,
    role: {
        type: String,
        enum: ["donor", "receiver", "admin"],
        default: "receiver"
    },
    location: {
        lat: Number,
        lng: Number
    }
}, { timestamps: true });

module.exports = mongoose.model("User", userSchema);