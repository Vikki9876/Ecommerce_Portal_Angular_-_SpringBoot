package com.example.demo.service;

import java.util.List;
import com.example.demo.exception.ProductException;
import com.example.demo.model.Review;
import com.example.demo.model.User;
import com.example.demo.request.ReviewRequest;

public interface ReviewService {

    // Creates a new review linked to a product and a user
    public Review createReview(ReviewRequest req, User user) throws ProductException;
    
    // Retrieves all reviews for a specific product ID
    public List<Review> getAllReview(Long productId); 
    
}