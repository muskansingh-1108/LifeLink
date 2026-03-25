const express = require("express");
const router = express.Router();
const Request = require("../models/Request");
const auth = require("../middleware/authMiddleware");
const sendEmail = require("../services/emailService");
const User = require("../models/User");

// CREATE REQUEST
router.post("/", auth, async (req, res) => {
    const request = new Request({
        ...req.body,
        user: req.user.id
    });

    await request.save();

    // notify donors
    const donors = await User.find({
        bloodType: request.bloodType,
        role: "donor"
    });

    donors.forEach(donor => {
        if (donor.email) {
            sendEmail(
                donor.email,
                "Blood Needed",
                "Urgent blood request near you"
            );
        }
    });

    res.json(request);
});

// GET ALL REQUESTS
router.get("/", auth, async (req, res) => {
    const requests = await Request.find().populate("user", "name email");
    res.json(requests);
});

// MATCH DONORS
router.get("/match/:bloodType", async (req, res) => {
    const donors = await User.find({
        bloodType: req.params.bloodType,
        role: "donor"
    });

    res.json(donors);
});

module.exports = router;