package com.example.demo.service;

import com.example.demo.exception.CartItemException;
import com.example.demo.exception.UserException;
import com.example.demo.model.Cart;
import com.example.demo.model.CartItem;
import com.example.demo.model.Product;

public interface CartItemService {

    // Fixed: Corrected "public" and "createCartItem"
    public CartItem createCartItem(CartItem cartItem);
    
    // Fixed: Corrected "UserException" casing and parameter naming
    public CartItem updateCartItem(Long userId, Long id, CartItem cartItem) throws CartItemException, UserException; 
    
    public CartItem isCartItemExist(Cart cart, Product product, String size, Long userId);
    
    // Fixed: Changed "userOD" to "userId" and corrected Exception spelling
    public void removeCartItem(Long userId, Long cartItemId) throws CartItemException, UserException;
    
    // Fixed: Changed "long" to "Long" (Object wrapper is better for IDs)
    public CartItem findCartItemById(Long cartItemId) throws CartItemException;
    
}