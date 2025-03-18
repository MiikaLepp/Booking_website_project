import { useState, useEffect } from 'react';
import axios from 'axios';
import './reviews.css';

function Reviews() {
    const [reviews, setReviews] = useState([]);
    const [newReview, setNewReview] = useState('');
    const [newRating, setNewRating] = useState(5);
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
        checkLoginStatus();
        fetchReviews();
    }, []);

    const checkLoginStatus = () => {
        const token = sessionStorage.getItem('token');
        setIsLoggedIn(!!token);
    };

    const fetchReviews = async () => {
        try {
            const response = await axios.get('http://localhost:5000/reviews');
            setReviews(response.data);
        } catch (error) {
            console.error('Error fetching reviews:', error);
        }
    };

    const handleReviewSubmit = async () => {
        if (!newReview.trim()) return;

        try {
            const response = await axios.post('http://localhost:5000/reviews', {
                text: newReview,
                rating: newRating
            });

            setReviews([response.data, ...reviews]);
            setNewReview('');
            setNewRating(5);
        } catch (error) {
            console.error('Error submitting review:', error);
        }
    };

    return (
        <div className="reviews-container">
            <h2>Latest Reviews</h2>
            <h4>See what others thought about our service, login to leave your own review!</h4>

            <div className="reviews-list">
                {reviews.length > 0 ? (
                    reviews.map((review, index) => (
                        <div key={index} className="review-item">
                            <div className="stars">
                                {'★'.repeat(review.rating) + '☆'.repeat(5 - review.rating)}
                            </div>
                            <p>{review.text}</p>
                        </div>
                    ))
                ) : (
                    <p>No reviews yet.</p>
                )}
            </div>

            {isLoggedIn && (
                <div className="review-form">
                    <textarea
                        value={newReview}
                        onChange={(e) => setNewReview(e.target.value)}
                        placeholder="Write your review here..."
                    />
                    <div className="rating-select">
                        <label>Rating:</label>
                        <select value={newRating} onChange={(e) => setNewRating(Number(e.target.value))}>
                            {[5, 4, 3, 2, 1].map((num) => (
                                <option key={num} value={num}>{num} Stars</option>
                            ))}
                        </select>
                    </div>
                    <button onClick={handleReviewSubmit}>Submit Review</button>
                </div>
            )}
        </div>
    );
}

export default Reviews;
