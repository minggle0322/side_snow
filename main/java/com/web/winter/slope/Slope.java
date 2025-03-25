package com.web.winter.slope;

import com.web.winter.rentalShop.RentalShop;
import jakarta.persistence.*;
import lombok.Getter;

import java.util.List;

@Entity
@Getter
public class Slope {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    private String resort;

    private String operation;

    private String price;

    private String camUrl;

    private String discount;

    @OneToMany(mappedBy = "slope", cascade = CascadeType.REMOVE)
    private List<RentalShop> rentalShopList;

    public Slope(String resort, String operation, String price, String camUrl, String discount) {
        this.resort = resort;
        this.operation = operation;
        this.price = price;
        this.camUrl = camUrl;
        this.discount = discount;
    }
}
