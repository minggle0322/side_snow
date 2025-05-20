package com.web.winter.member;

import com.web.winter.jwt.JwtUtil;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
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
@Tag(name = "Member Controller", description = "Nickname 중복체크, Username 중복체크, 회원가입")
@RequestMapping("/member")
public class MemberController {
    private final MemberService memberService;
    private final JwtUtil jwtUtil;

    @PostMapping("/checkNickname")
    @Operation(summary = "Nickname 중복체크", description = "Nickname 중복체크 처리 API")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "닉네임 중복체크 통과", content = {@Content}),
            @ApiResponse(responseCode = "400", description = "닉네임 중복체크 실패", content = @Content),
            @ApiResponse(responseCode = "500", description = "백엔드 정신안차림", content = @Content)
    })
    public ResponseEntity<String> checkNickname(@RequestBody Map<String, String> request) {
        String nickname = request.get("nickname");
        memberService.checkNickname(nickname);

        return ResponseEntity.ok("checkNickname");
    }

    @PostMapping("/checkUsername")
    @Operation(summary = "Username 중복체크", description = "Username 중복체크 처리 API")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "아이디 중복체크 통과", content = {@Content}),
            @ApiResponse(responseCode = "400", description = "아이디 중복체크 실패", content = @Content),
            @ApiResponse(responseCode = "500", description = "백엔드 정신안차림", content = @Content)
    })
    public ResponseEntity<String> checkUsername(@RequestBody Map<String, String> request) {
        String username = request.get("username");
        memberService.checkUsername(username);

        return ResponseEntity.ok("checkUsername");
    }

    @PostMapping("/register")
    @Operation(summary = "회원가입", description = "회원가입 처리")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "회원가입 성공", content = {@Content}),
            @ApiResponse(responseCode = "400", description = "회원가입 실패", content = @Content),
            @ApiResponse(responseCode = "500", description = "백엔드 정신안차림", content = @Content)
    })
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
}
