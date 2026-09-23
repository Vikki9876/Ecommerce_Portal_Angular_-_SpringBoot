package com.example.demo.controller;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.example.demo.exception.OrderException;
import com.example.demo.exception.UserException;
import com.example.demo.model.Address;
import com.example.demo.model.Order;
import com.example.demo.model.User;
import com.example.demo.service.OrderService;
import com.example.demo.service.UserService;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;

@RestController
@RequestMapping("/api/orders")
@Tag(name="Order Management", description="Endpoints for creating and retrieving user orders")
public class OrderController {

    private final OrderService orderService;
    private final UserService userService;

    public OrderController(OrderService orderService, UserService userService) {
        this.orderService = orderService;
        this.userService = userService;
    }

    @PostMapping("")
    @Operation(summary = "Create Order", description = "Creates a new order from the user's current cart using the provided shipping address.")
    public ResponseEntity<Order> createOrderHandler(@RequestBody Address shippingAddress, 
            @RequestHeader("Authorization") String jwt) throws UserException {
        
        User user = userService.findUserProfileByJwt(jwt);
        Order order = orderService.createOrder(user, shippingAddress);
        
        System.out.print("order"+order);
        return new ResponseEntity<>(order, HttpStatus.CREATED);
    }

    @GetMapping("/user")
    @Operation(summary = "Get Order History", description = "Retrieves a list of all orders placed by the authenticated user.")
    public ResponseEntity<List<Order>> usersOrderHistoryHandler(@RequestHeader("Authorization") String jwt) throws UserException {
        
        User user = userService.findUserProfileByJwt(jwt);
        List<Order> orders = orderService.usersOrderHistory(user.getId());
        
        return new ResponseEntity<>(orders, HttpStatus.OK);
    }

    @GetMapping("/{orderId}")
    @Operation(summary = "Get Order By ID", description = "Retrieves detailed information for a specific order.")
    public ResponseEntity<Order> findOrderByIdId(@PathVariable Long orderId, 
            @RequestHeader("Authorization") String jwt) throws UserException, OrderException {
        
        User user = userService.findUserProfileByJwt(jwt);
        Order order = orderService.findOrderById(orderId);
        
        return new ResponseEntity<>(order, HttpStatus.ACCEPTED);
    }
}