const mongoose = require("mongoose");

const reviewSchema = new mongoose.Schema({
    movieId: { type: String, required: true },  // ID of the movie being reviewed
    user: { type: String, required: true },  // Username of the reviewer
    rating: { type: Number, min: 1, max: 5, required: true },  // Rating from 1 to 5
    comment: { type: String, required: true },  // Review comment
    createdAt: { type: Date, default: Date.now }
});

const Review = mongoose.model("Review", reviewSchema);
module.exports = Review;
