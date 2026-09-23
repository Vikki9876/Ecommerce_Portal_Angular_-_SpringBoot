package com.example.demo.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "ratings")
public class Rating {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY) // Fixed typo: GeneratedType -> GenerationType
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY) // Lazy loading is usually better for performance
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "product_id", nullable = false)
    @JsonIgnore // Prevents infinite recursion when serializing Product -> Rating -> Product
    private Product product;

    @Column(name = "rating_value") // 'rating' can be a reserved word in some DBs
    private double rating;

    private LocalDateTime createdAt;

    // --- Constructors ---

    // REQUIRED: Default no-args constructor
    public Rating() {
    }

    // Parameterized Constructor
    public Rating(User user, Product product, double rating, LocalDateTime createdAt) {
        this.user = user;
        this.product = product;
        this.rating = rating;
        this.createdAt = createdAt;
    }

    // --- Getters and Setters ---

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public Product getProduct() {
        return product;
    }

    public void setProduct(Product product) {
        this.product = product;
    }

    public double getRating() {
        return rating;
    }

    public void setRating(double rating) {
        this.rating = rating;
    }

    public LocalDateTime getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(LocalDateTime createdAt) {
        this.createdAt = createdAt;
    }
}