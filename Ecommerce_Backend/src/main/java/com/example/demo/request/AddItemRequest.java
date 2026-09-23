package com.example.demo.request;

// Note: Moved to .request package as per standard Spring naming conventions
public class AddItemRequest {

    private Long productId;
    private String size;
    private int quantity;
    private Integer price;
    private Integer discountedPrice; // Often included to sync with CartItem


    public AddItemRequest() {
    }

    public AddItemRequest(Long productId, String size, int quantity, Integer price, Integer discountedPrice) {
        this.productId = productId;
        this.size = size;
        this.quantity = quantity;
        this.price = price;
        this.discountedPrice = discountedPrice;
    }

    // --- GETTERS AND SETTERS ---

    public Long getProductId() {
        return productId;
    }

    public void setProductId(Long productId) {
        this.productId = productId;
    }

    public String getSize() {
        return size;
    }

    public void setSize(String size) {
        this.size = size;
    }

    public int getQuantity() {
        return quantity;
    }

    public void setQuantity(int quantity) {
        this.quantity = quantity;
    }

    public Integer getPrice() {
        return price;
    }

    public void setPrice(Integer price) {
        this.price = price;
    }

    public Integer getDiscountedPrice() {
        return discountedPrice;
    }

    public void setDiscountedPrice(Integer discountedPrice) {
        this.discountedPrice = discountedPrice;
    }
}