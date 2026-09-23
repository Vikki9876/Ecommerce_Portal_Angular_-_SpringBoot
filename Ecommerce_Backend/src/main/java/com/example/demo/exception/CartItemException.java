package com.example.demo.exception;

public class CartItemException extends Exception {

    // Default constructor
    public CartItemException() {
        super();
    }

    // Constructor that accepts a custom message
    public CartItemException(String message) {
        super(message);
    }
}