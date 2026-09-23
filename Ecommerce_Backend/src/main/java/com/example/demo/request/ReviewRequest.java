package com.example.demo.request;

public class ReviewRequest {

    private Long productId;
    
    private String review; // Fixed: Corrected "priate" to "private"

    // --- CONSTRUCTORS ---

    public ReviewRequest() {
    }

    public ReviewRequest(Long productId, String review) {
        this.productId = productId;
        this.review = review;
    }

    // --- GETTERS AND SETTERS ---

    public Long getProductId() {
        return productId;
    }

    public void setProductId(Long productId) {
        this.productId = productId;
    }

    public String getReview() {
        return review;
    }

    public void setReview(String review) {
        this.review = review;
    }
}