package com.web.winter.member;

import com.web.winter.jwt.JwtUtil;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Map;

@RequiredArgsConstructor
@RestController
@RequestMapping("/member")
public class MemberController {
    private final MemberService memberService;
    private final JwtUtil jwtUtil;

    @PostMapping("/checkNickname")
    public ResponseEntity<String> checkNickname(@RequestBody Map<String, String> request) {
        String nickname = request.get("nickname");
        memberService.checkNickname(nickname);

        return ResponseEntity.ok("checkNickname");
    }

    @PostMapping("/checkUsername")
    public ResponseEntity<String> checkUsername(@RequestBody Map<String, String> request) {
        String username = request.get("username");
        memberService.checkUsername(username);

        return ResponseEntity.ok("checkUsername");
    }

    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody @Valid RegisterForm registerForm, BindingResult bindingResult) {
        if (bindingResult.hasErrors()) return ResponseEntity.badRequest().body(bindingResult.getAllErrors());

        try {
            memberService.create(registerForm);
            return ResponseEntity.status(HttpStatus.CREATED).body("회원가입 완료");
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        } catch (DataIntegrityViolationException e) {
            return ResponseEntity.status(HttpStatus.CONFLICT).body("이미 등록된 사용자입니다");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Signup failed: " + e.getMessage());
        }
    }

    @PostMapping("/member/login")
    public ResponseEntity<?> login(@RequestBody LoginForm loginForm, HttpServletResponse response) {
        String token = jwtUtil.createJwt(loginForm.getUsername(), "USER", 1000 * 60 * 60L);

        return ResponseEntity.ok(Map.of("token", token));
    }
}
