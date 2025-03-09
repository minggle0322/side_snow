package com.web.winter.member;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.Getter;

@Entity @Getter
public class Member {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String loginId;

    private String password;

    private String passwordCheck;

    private String nickname;

    private MemberRole role;

    private Position position;

    // private String imgUrl;

    // 자기소개 ?

    public Member(String loginId, String password, String nickname, Position position) {
        this.loginId = loginId;
        this.password = password;
        this.nickname = nickname;
        this.position = position;
    }
}
