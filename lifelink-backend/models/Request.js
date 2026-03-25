const mongoose = require("mongoose");

const requestSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    patientName: String,
    bloodType: String,
    units: Number,
    urgency: String,
    hospital: String,
    city: String,
    neededBy: String,
    contactNumber: String,
    additionalInfo: String,
    location: {
        lat: Number,
        lng: Number
    },
    status: {
        type: String,
        default: "pending"
    }
}, { timestamps: true });

module.exports = mongoose.model("Request", requestSchema);