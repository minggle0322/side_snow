package com.web.winter.member;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class RegisterForm {

    private String nickname;

    private String username;

    private String password;

    private Position position;
}
