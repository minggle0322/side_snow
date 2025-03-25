package com.web.winter.rentalShop;

import com.web.winter.shopReview.Review;
import com.web.winter.slope.Slope;
import jakarta.persistence.*;
import lombok.Getter;

import java.util.List;

@Entity
@Getter
public class RentalShop {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    private Slope slope;

    private String map;

    private Integer distance;

    private boolean pickupService;

    @OneToMany(mappedBy = "rentalShop",cascade = CascadeType.REMOVE)
    private List<Review> reviewList;

    public RentalShop(Slope slope, String map, Integer distance, boolean pickupService) {
        this.slope = slope;
        this.map = map;
        this.distance = distance;
        this.pickupService = pickupService;
    }
}
