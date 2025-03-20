package com.web.winter.member;

import com.web.winter.DataNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Optional;

@RequiredArgsConstructor
@Service
public class MemberService {
    private final MemberRepository memberRepository;
    private final PasswordEncoder passwordEncoder;

    public void create(RegisterForm registerForm) {
        /*if(!registerForm.getPassword().equals(registerForm.getPasswordCheck())) {
            throw new IllegalArgumentException("비밀번호가 일치하지 않습니다");
        }*/

        Member member = new Member(registerForm.getUsername(), passwordEncoder.encode(registerForm.getPassword()),
                registerForm.getNickname(), registerForm.getPosition());
        this.memberRepository.save(member);
    }

    public void checkNickname(String nickname) {
        if (memberRepository.existsByNickname(nickname)) {
            throw new IllegalArgumentException("이미 존재하는 닉네임입니다.");
        }
    }

    public void checkUsername(String username) {
        if (memberRepository.existsByUsername(username)) {
            throw new IllegalArgumentException("이미 존재하는 아이디입니다.");
        }
    }

    public Member getMember(String username) {
        Optional<Member> member = this.memberRepository.findByUsername(username);

        if (member.isPresent()) return member.get();
        else throw new DataNotFoundException("member not found");
    }
}
