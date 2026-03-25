const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { body, validationResult } = require("express-validator");
const User = require("../models/User");

// REGISTER
router.post("/register",
    body("email").isEmail(),
    body("password").isLength({ min: 6 }),
    async (req, res) => {

        const errors = validationResult(req);
        if (!errors.isEmpty()) return res.status(400).json(errors);

        const { name, email, password, bloodType, role } = req.body;

        const existing = await User.findOne({ email });
        if (existing) return res.json({ message: "User already exists" });

        const hashedPassword = await bcrypt.hash(password, 10);

        const user = new User({
            name,
            email,
            password: hashedPassword,
            bloodType,
            role
        });

        await user.save();
        res.json({ message: "Registered successfully" });
});

// LOGIN
router.post("/login", async (req, res) => {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) return res.json({ message: "User not found" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.json({ message: "Wrong password" });

    const token = jwt.sign(
        { id: user._id, role: user.role },
        process.env.JWT_SECRET,
        { expiresIn: "1d" }
    );

    res.json({ token });
});

module.exports = router;