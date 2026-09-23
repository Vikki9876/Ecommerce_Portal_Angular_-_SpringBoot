package com.example.demo.controller;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.example.demo.exception.ProductException;
import com.example.demo.exception.UserException;
import com.example.demo.model.Rating;
import com.example.demo.model.User;
import com.example.demo.request.RatingRequest;
import com.example.demo.service.RatingService;
import com.example.demo.service.UserService;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;

@RestController
@RequestMapping("/api/ratings")
@Tag(name = "Rating Management", description = "Endpoints for users to rate products")
public class RatingController {

    private final RatingService ratingService;
    private final UserService userService;

    public RatingController(RatingService ratingService, UserService userService) {
        this.ratingService = ratingService;
        this.userService = userService;
    }

    @PostMapping("/create")
    @Operation(summary = "Create Rating", description = "Allows a user to submit a numerical rating for a product.")
    public ResponseEntity<Rating> createRatingHandler(
            @RequestBody RatingRequest req, 
            @RequestHeader("Authorization") String jwt) throws UserException, ProductException {
        
        User user = userService.findUserProfileByJwt(jwt);
        Rating rating = ratingService.createRating(req, user);
        
        return new ResponseEntity<>(rating, HttpStatus.CREATED);
    }

    @GetMapping("/product/{productId}")
    @Operation(summary = "Get Product Ratings", description = "Retrieves all ratings submitted for a specific product.")
    public ResponseEntity<List<Rating>> getProductsRatingHandler(@PathVariable Long productId) {
        
        List<Rating> ratings = ratingService.getProductsRating(productId);
        
        return new ResponseEntity<>(ratings, HttpStatus.OK);
    }
}