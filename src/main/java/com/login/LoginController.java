package com.login;

import com.system.auth.dto.AuthenticationRequest;
import com.system.auth.dto.AuthenticationResponse;
import com.system.auth.service.AuthenticationService;
import com.system.auth.authuser.AuthUserService;
import com.system.auth.jwt.JwtService;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;

import java.util.*;

@Controller
@RequestMapping("/")
public class LoginController {
    private final AuthenticationService authenticationService;
    private final JwtService jwtService;
    private final UserDetailsService userDetailsService;
    private final AuthUserService authUserService;

    private static final Logger logger = LoggerFactory.getLogger(LoginController.class);
    public LoginController(AuthenticationService authenticationService , JwtService jwtService, UserDetailsService userDetailsService, AuthUserService authUserService){
        this.authenticationService = authenticationService;
        this.jwtService = jwtService;
        this.userDetailsService = userDetailsService;
        this.authUserService = authUserService;
    }
    @GetMapping("")
    public String loginPage(HttpServletRequest request){
        if(request.getCookies() == null){
            return "login/login";
        } else {
            Cookie[] cookies  = request.getCookies();
            Optional<Cookie> optionalCookie = Arrays.stream(cookies).filter(cookie -> "Authorization".equals(cookie.getName())).findFirst();

            if (optionalCookie.isEmpty()) {
                return "login/login";
            }
            String jwt = optionalCookie.get().getValue();
            String userEmail;
            userEmail = jwtService.extractUsername(jwt);
            if (userEmail != null && SecurityContextHolder.getContext().getAuthentication() != null) {
                UserDetails userDetails = this.userDetailsService.loadUserByUsername(userEmail);
                if (jwtService.isTokenValid(jwt, userDetails)) {
                    return "layout/home4";
                }else{
                    return "redirect:/api/v1/auth/logout";
                }
            }else{
                    return "redirect:/api/v1/auth/logout";
            }
        }
    }

    @PostMapping("login")
    public ResponseEntity<?> login(@RequestBody Map<String, Object> param, HttpServletResponse response) {
        AuthenticationRequest ar = AuthenticationRequest.builder()
                .email((String) param.get("email"))
                .password((String) param.get("password"))
                .build();
        AuthenticationResponse authenticationResponse = authenticationService.authenticate(ar);

        String jwtToken = authenticationResponse.getToken();
        Cookie authrizationCookie = new Cookie("Authorization", jwtToken);
        authrizationCookie.setHttpOnly(false);
        authrizationCookie.setSecure(false);
        authrizationCookie.setPath("/"); // 쿠키 경로 설정
        response.addCookie(authrizationCookie);
        // 리다이렉트 URL 포함
        Map<String, String> responseBody = new HashMap<>();
        responseBody.put("redirectUrl", "/");

        return new ResponseEntity<>(responseBody, HttpStatus.OK);
    }
}