const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 5000;

// ✅ MongoDB Connection
mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => console.log("✅ MongoDB Connected"))
.catch(err => console.error("❌ MongoDB Connection Error:", err));

// ✅ Middleware
app.use(cors());
app.use(express.json());

// ✅ Review Schema & Model
const ReviewSchema = new mongoose.Schema({
    movieId: { type: String, required: true },
    user: { type: String, required: true },
    rating: { type: Number, required: true, min: 1, max: 5 },
    comment: { type: String, required: true },
    createdAt: { type: Date, default: Date.now }
});
const Review = mongoose.model("Review", ReviewSchema);

// ✅ Submit a Review
app.post("/reviews", async (req, res) => {
    try {
        const { movieId, user, rating, comment } = req.body;
        if (!movieId || !user || !rating || !comment) {
            return res.status(400).json({ error: "All fields are required!" });
        }

        const newReview = new Review({ movieId, user, rating, comment });
        await newReview.save();
        res.status(201).json({ message: "✅ Review added successfully!" });
    } catch (err) {
        console.error("❌ Error adding review:", err);
        res.status(500).json({ error: "Server Error" });
    }
});

// ✅ Get All Reviews
app.get("/reviews", async (req, res) => {
    try {
        const reviews = await Review.find();
        res.json(reviews);
    } catch (error) {
        console.error("❌ Error fetching all reviews:", error);
        res.status(500).json({ error: "Server Error" });
    }
});

// ✅ Get Reviews by Movie ID
app.get("/reviews/:movieId", async (req, res) => {
    try {
        const reviews = await Review.find({ movieId: req.params.movieId });
        if (reviews.length === 0) {
            return res.json({ message: "No reviews yet for this movie." });
        }
        res.json(reviews);
    } catch (err) {
        console.error("❌ Error fetching reviews by movie ID:", err);
        res.status(500).json({ error: "Server Error" });
    }
});

// ✅ Root Route
app.get("/", (req, res) => {
    res.send("🎬 Movie Review API is running...");
});

// ✅ Start Server
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
