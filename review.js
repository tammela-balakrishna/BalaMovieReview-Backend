// 🔹 Get Movie ID from URL
const urlParams = new URLSearchParams(window.location.search);
const movieId = urlParams.get("movieId");

document.getElementById("reviewForm").addEventListener("submit", async function (event) {
    event.preventDefault();

    const user = document.getElementById("user").value.trim();
    const rating = document.getElementById("rating").value;
    const comment = document.getElementById("comment").value.trim();

    if (!user || !rating || !comment) {
        alert("Please fill out all fields!");
        return;
    }

    try {
        const response = await fetch("http://localhost:5000/reviews", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ movieId, user, rating, comment })
        });

        if (response.ok) {
            alert("Review added successfully!");
            document.getElementById("reviewForm").reset(); // ✅ Clear form after submission
            fetchReviews(); // ✅ Refresh the reviews
        } else {
            alert("Failed to add review");
        }
    } catch (error) {
        console.error("Error submitting review:", error);
    }
});

// 🔹 Fetch and Display Reviews
async function fetchReviews() {
    try {
        const response = await fetch(`http://localhost:5000/reviews/${movieId}`);
        const reviews = await response.json();

        let reviewSection = document.getElementById("reviews");
        reviewSection.innerHTML = ""; // ✅ Clear previous reviews

        if (reviews.length === 0) {
            reviewSection.innerHTML = `<p class="no-reviews">No reviews yet. Be the first to review!</p>`; 
            return;
        }

        reviews.forEach(review => {
            let reviewElement = document.createElement("div");
            reviewElement.classList.add("review");

            reviewElement.innerHTML = `
                <strong>${review.user}</strong> 
                <span>(${review.rating}/5)</span>
                <p>${review.comment}</p>
            `;

            reviewSection.appendChild(reviewElement);
        });
    } catch (error) {
        console.error("Error fetching reviews:", error);
        document.getElementById("reviews").innerHTML = `<p class="error-message">Error loading reviews.</p>`;
    }
}

// 🔹 Load Reviews on Page Load
fetchReviews();
