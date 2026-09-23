package com.example.demo.service;

import org.springframework.stereotype.Service;
import com.example.demo.exception.ProductException;
import com.example.demo.exception.UserException;
import com.example.demo.model.Cart;
import com.example.demo.model.CartItem;
import com.example.demo.model.Product;
import com.example.demo.model.User;
import com.example.demo.repository.CartRepository;
import com.example.demo.request.AddItemRequest;

import jakarta.transaction.Transactional;

@Service
public class CartServiceImplementation implements CartService {

    private final CartRepository cartRepository;
    private final CartItemService cartItemService;
    private final ProductService productService;

   private final UserService userService;
    // Constructor Injection
    public CartServiceImplementation(CartRepository cartRepository, 
                                    CartItemService cartItemService, 
                                    UserService userService,      ProductService productService) {
        this.cartRepository = cartRepository;
        this.cartItemService = cartItemService;
        this.productService = productService;
        this.userService= userService;
    }

    @Override
    public Cart createCart(User user) {
        Cart cart = new Cart();
        cart.setUser(user);
        return cartRepository.save(cart);
    }

    @Transactional
    @Override
    public String addCartItem(Long userId, AddItemRequest req) throws ProductException {
        Cart cart = cartRepository.findByUserId(userId);

        if (cart == null) {
          User user = null;
			try {
				user = userService.findUserById(userId);
			} catch (UserException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			} 
            cart = new Cart();
            cart.setUser(user);
            cart = cartRepository.save(cart); // Persist to get a 'cart_id'
        }

        Product product = productService.findProductById(req.getProductId());
        CartItem isPresent = cartItemService.isCartItemExist(cart, product, req.getSize(), userId);

        if (isPresent == null) {
            CartItem cartItem = new CartItem();
            cartItem.setProduct(product);
            cartItem.setCart(cart);
            cartItem.setQuantity(req.getQuantity());
            cartItem.setUserId(userId);

            int qty = (req.getQuantity() > 0) ? req.getQuantity() : 1;
            cartItem.setQuantity(qty);
            cartItem.setPrice(qty * product.getPrice());
            cartItem.setDiscountedPrice(qty * product.getDiscountedPrice());
            cartItem.setSize(req.getSize());

            CartItem createdCartItem = cartItemService.createCartItem(cartItem);
            cart.getCartItems().add(createdCartItem);
        } else {
            isPresent.setQuantity(isPresent.getQuantity() + req.getQuantity());
            cartItemService.createCartItem(isPresent);
        }

        return "Item Added To Cart Successfully";
    }

    
    
    @Override
    public Cart findUserCart(Long userId) {
        Cart cart = cartRepository.findByUserId(userId);

        int totalPrice = 0;
        int totalDiscountedPrice = 0;
        int totalItem = 0;

        for (CartItem cartItem : cart.getCartItems()) {
            totalPrice += cartItem.getPrice();
            totalDiscountedPrice += cartItem.getDiscountedPrice();
            totalItem += cartItem.getQuantity();
        }

        cart.setTotalItem(totalItem);
        cart.setTotalPrice(totalPrice);
        cart.setTotalDiscountedPrice(totalDiscountedPrice);
        cart.setDiscount(totalPrice - totalDiscountedPrice);

        return cartRepository.save(cart);
    }
}