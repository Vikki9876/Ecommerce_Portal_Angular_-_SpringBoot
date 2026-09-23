package com.example.demo.controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.example.demo.exception.ProductException;
import com.example.demo.exception.UserException;
import com.example.demo.model.Cart;
import com.example.demo.model.User;
import com.example.demo.request.AddItemRequest;
import com.example.demo.response.ApiResponse;
import com.example.demo.service.CartService;
import com.example.demo.service.UserService;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;

@RestController
@RequestMapping("/api/cart")
@Tag(name = "Cart Management", description = "Endpoints for finding user carts and adding items")
public class CartController {

    private final CartService cartService;
    private final UserService userService;

    public CartController(CartService cartService, UserService userService) {
        this.cartService = cartService;
        this.userService = userService;
    }

    @GetMapping("/")
    @Operation(summary = "Find User Cart", description = "Retrieves the cart associated with the user identified by the JWT token.")
    public ResponseEntity<Cart> findUserCartHandler(@RequestHeader("Authorization") String jwt) throws UserException {
        User user = userService.findUserProfileByJwt(jwt);
        Cart cart = cartService.findUserCart(user.getId());
        
        return new ResponseEntity<>(cart, HttpStatus.OK);
    }

    @PutMapping("/add")
    @Operation(summary = "Add Item To Cart", description = "Adds a specific product to the user's cart. If the item already exists, it updates the quantity.")
    public ResponseEntity<ApiResponse> addItemToCart(@RequestBody AddItemRequest req, 
            @RequestHeader("Authorization") String jwt) throws UserException, ProductException {
        
        User user = userService.findUserProfileByJwt(jwt);
        cartService.addCartItem(user.getId(), req);
        
        ApiResponse res = new ApiResponse("Item added to cart successfully", true);
        return new ResponseEntity<>(res, HttpStatus.OK);
    }
    
    
}