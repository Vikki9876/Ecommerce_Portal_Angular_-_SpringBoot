package com.example.demo.controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;
import com.example.demo.response.ApiResponse;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;

@RestController
@Tag(name = "Home Controller", description = "Standard entry point and status check for the API")
public class HomeController {

    @GetMapping("/")
    @Operation(summary = "API Welcome Message", description = "The default landing page for the backend API.")
    public ResponseEntity<ApiResponse> homeControllerHandler() {
        
        ApiResponse res = new ApiResponse("Welcome To E-Commerce System Backend API", true);
        
        return new ResponseEntity<>(res, HttpStatus.OK);
    }
}