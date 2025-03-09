package com.web.winter.member;

import com.web.winter.DataNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Optional;

@RequiredArgsConstructor
@Service
public class MemberService {
    private final MemberRepository memberRepository;
    private final PasswordEncoder passwordEncoder;

    public void create(RegisterForm registerForm) {
        if(!registerForm.getPassword().equals(registerForm.getPasswordCheck())) {
            throw new IllegalArgumentException("비밀번호가 일치하지 않습니다");
        }

        Member member = new Member(registerForm.getLoginId(), passwordEncoder.encode(registerForm.getPassword()),
                registerForm.getNickname(), registerForm.getPosition());
        this.memberRepository.save(member);
    }

    public Member getMember(String loginId) {
        Optional<Member> member = this.memberRepository.findByLoginId(loginId);

        if(member.isPresent()) return member.get();
        else throw new DataNotFoundException("member not found");
    }
}
