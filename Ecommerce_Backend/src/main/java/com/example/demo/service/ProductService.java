package com.example.demo.service;

import java.util.List;
import org.springframework.data.domain.Page; // Corrected import

import com.example.demo.exception.ProductException;
import com.example.demo.model.Product;
import com.example.demo.request.CreateProductRequest;

public interface ProductService {

    public Product createProduct(CreateProductRequest req);
    
    public String deleteProduct(Long productId) throws ProductException;
    
    public Product updateProduct(Long productId, Product req) throws ProductException;
    
    public Product findProductById(Long id) throws ProductException;
    
    public List<Product> findProductByCategory(String category);
    public Page<Product> getAllProduct(
            String category, 
            List<String> colors, 
            List<String> sizes, 
            Integer minPrice, 
            Integer maxPrice,
            Integer minDiscount, 
            String sort, 
            String stock, 
            Integer pageNumber, 
            Integer pageSize
    );

	List<Product> findProductByIdCategory(String category);

	public List<Product> findAllProducts();
}