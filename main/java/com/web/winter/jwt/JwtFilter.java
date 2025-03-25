package com.web.winter.jwt;

import com.web.winter.member.Member;
import com.web.winter.member.MemberDetails;
import com.web.winter.member.MemberService;
import com.web.winter.member.Position;
import io.jsonwebtoken.ExpiredJwtException;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.filter.OncePerRequestFilter;
import java.io.IOException;

@RequiredArgsConstructor
public class JwtFilter extends OncePerRequestFilter {
    private final JwtUtil jwtUtil;

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain) throws ServletException, IOException {
        String authorization = request.getHeader("Authorization");

        if(authorization == null || !authorization.startsWith("Bearer ")) {
            System.out.println("token null");
            filterChain.doFilter(request, response);

            return;
        }

        System.out.println("authorization start");

        String token = authorization.split(" ")[1];

        try {
            jwtUtil.isExpired(token);
        } catch (ExpiredJwtException e) {
            System.out.println("token expired");
            response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
            filterChain.doFilter(request, response);

            return;
        }

        String username = jwtUtil.getUsername(token);
        String role = jwtUtil.getRole(token);

        Member member = new Member(username, "tmpPassword","tmpNickname", Position.ALLROUNDER);
        System.out.println("getMember");

        if(member==null) {
            System.out.println("member is null");
            response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
            filterChain.doFilter(request, response);
            return;
        }

        MemberDetails memberDetails = new MemberDetails(member);

        Authentication authToken = new UsernamePasswordAuthenticationToken(memberDetails, null, memberDetails.getAuthorities());

        SecurityContextHolder.getContext().setAuthentication(authToken);

        filterChain.doFilter(request, response);
    }
}
