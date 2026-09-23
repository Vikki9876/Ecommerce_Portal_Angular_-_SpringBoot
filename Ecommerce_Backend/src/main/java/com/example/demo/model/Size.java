package com.example.demo.model;

import jakarta.persistence.Embeddable;

@Embeddable // Required for use in @ElementCollection
public class Size {

    private String name;
    
    private int quantity; // Changed to int to match your getter/setter

    // Default Constructor
    public Size() {
    }

    // Parameterized Constructor (Optional but helpful for data entry)
    public Size(String name, int quantity) {
        this.name = name;
        this.quantity = quantity;
    }

    // Getters and Setters
    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public int getQuantity() {
        return quantity;
    }

    public void setQuantity(int quantity) {
        this.quantity = quantity;
    }
}