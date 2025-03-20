package com.web.winter.member;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@Entity
@Getter
public class Member {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotEmpty
    @Column(unique = true)
    private String username;

    @NotEmpty
    private String password;

    @NotEmpty
    @Column(unique = true)
    private String nickname;

    @NotNull
    private MemberRole role;

    @NotNull
    private Position position;

    // private String imgUrl;

    // 자기소개 ?

    public Member(String username, String password, String nickname, Position position) {
        this.username = username;
        this.password = password;
        this.nickname = nickname;
        this.position = position;

        this.role = "admin".equals(username) ? MemberRole.ADMIN : MemberRole.USER;
    }
}
