package com.web.winter.member;

import lombok.Getter;
import lombok.Setter;

@Getter @Setter
public class RegisterForm {

    // 나중에 validation 추가
    private String nickname;

    private String loginId;

    private String password;

    private  String passwordCheck;

    private Position position;
}
