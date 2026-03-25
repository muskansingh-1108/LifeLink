require("dotenv").config();
const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");

const helmet = require("helmet");
const morgan = require("morgan");
const rateLimit = require("express-rate-limit");
const compression = require("compression");

const app = express();

// DB
connectDB();

// Middlewares
app.use(cors());
app.use(express.json());
app.use(helmet());
app.use(morgan("dev"));
app.use(compression());

app.use(rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 100
}));






// Routes
app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api/requests", require("./routes/requestRoutes"));

app.get("/", (req, res) => {
    res.send("LifeLink API Running");
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});