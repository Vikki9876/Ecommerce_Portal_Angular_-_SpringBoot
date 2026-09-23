package com.example.demo.controller;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.example.demo.exception.ProductException;
import com.example.demo.exception.UserException;
import com.example.demo.model.Review;
import com.example.demo.model.User;
import com.example.demo.request.ReviewRequest;
import com.example.demo.service.ReviewService;
import com.example.demo.service.UserService;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;

@RestController
@RequestMapping("/api/reviews")
@Tag(name = "Review Management", description = "Endpoints for users to post and read product reviews")
public class ReviewController {

    private final ReviewService reviewService;
    private final UserService userService;

    public ReviewController(ReviewService reviewService, UserService userService) {
        this.reviewService = reviewService;
        this.userService = userService;
    }

    @PostMapping("/create")
    @Operation(summary = "Create Review", description = "Allows a logged-in user to post a text review for a specific product.")
    public ResponseEntity<Review> createReviewHandler(
            @RequestBody ReviewRequest req, 
            @RequestHeader("Authorization") String jwt) throws UserException, ProductException {
        
        User user = userService.findUserProfileByJwt(jwt);
        Review review = reviewService.createReview(req, user);
        
        return new ResponseEntity<>(review, HttpStatus.CREATED);
    }

    @GetMapping("/product/{productId}")
    @Operation(summary = "Get Product Reviews", description = "Fetches all written reviews for a particular product ID.")
    public ResponseEntity<List<Review>> getProductsReviewHandler(@PathVariable Long productId) {
        
        List<Review> reviews = reviewService.getAllReview(productId);
        
        return new ResponseEntity<>(reviews, HttpStatus.ACCEPTED);
    }
}