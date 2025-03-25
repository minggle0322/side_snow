package com.web.winter.shopReview;

import com.web.winter.member.Member;
import com.web.winter.rentalShop.RentalShop;
import jakarta.persistence.*;
import lombok.Getter;
import org.springframework.cglib.core.Local;

import java.time.LocalDateTime;

@Entity
@Getter
public class Review {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    private RentalShop rentalShop;

    private String content;

    private Integer score;

    @ManyToOne
    private Member author;

    private LocalDateTime createTime;

    public Review(RentalShop rentalShop, String content, Integer score, Member author, LocalDateTime createTime) {
        this.rentalShop = rentalShop;
        this.content = content;
        this.score = score;
        this.author = author;
        this.createTime = createTime;
    }
}
