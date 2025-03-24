const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const app = express();
const PORT = 5000;

// 🔹 MongoDB Connection
mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => console.log("MongoDB Connected"))
.catch(err => console.error("MongoDB Connection Error:", err));

app.use(cors());
app.use(express.json());

// 🔹 Review Schema & Model
const ReviewSchema = new mongoose.Schema({
    movieId: String,
    user: String,
    rating: Number,
    comment: String
});
const Review = mongoose.model("Review", ReviewSchema);

// 🔹 Submit Review API
app.post("/reviews", async (req, res) => {
    try {
        const newReview = new Review(req.body);
        await newReview.save();
        res.status(201).json({ message: "Review added!" });
    } catch (err) {
        res.status(500).json({ error: "Error adding review" });
    }
});

// 🔹 Get Reviews by Movie ID
app.get("/reviews/:movieId", async (req, res) => {
    try {
        const reviews = await Review.find({ movieId: req.params.movieId });
        res.json(reviews);
    } catch (err) {
        res.status(500).json({ error: "Error fetching reviews" });
    }
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
