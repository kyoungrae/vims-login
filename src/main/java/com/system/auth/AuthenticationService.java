package com.system.auth;

import com.system.token.TokenService;
import com.system.user.Role;
import com.system.user.User;
import com.system.user.UserService;
import com.system.jwt.JwtService;
import com.system.token.Token;
import com.system.token.TokenType;
import com.system.util.userinfo.UserInfo;
import lombok.AllArgsConstructor;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.sql.Timestamp;
import java.time.LocalDateTime;
@Service
@AllArgsConstructor
public class AuthenticationService {
    private final TokenService tokenService;
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;
    private final AuthenticationManager authenticationManager;
    private final UserService UserService;

    public AuthenticationResponse register(RegisterRequest request) throws Exception {
        UserInfo userInfo = new UserInfo();
        LocalDateTime localDateTime = LocalDateTime.now();
        Timestamp timestamp = Timestamp.valueOf(localDateTime);
        var user = User.builder()
                .user_id(request.getUser_id())
                .email(request.getEmail())
                .password(passwordEncoder.encode(request.getPassword()))
                .role(Role.USER)
                .system_create_userid(userInfo.getUserEmail())
                .system_create_date(timestamp)
                .build();
        var jwtToken = jwtService.generateToken(user);
        UserService.save(user);

        var token = Token.builder()
                .token(jwtToken)
                .tokenType(TokenType.AUTHORIZATION)
                .user(user)
                .build();
        tokenService.save(token);
        return AuthenticationResponse.builder()
                .token(jwtToken)
                .build();
    }
    public AuthenticationResponse authenticate(AuthenticationRequest request){

        authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(request.getEmail(),request.getPassword())
        );
        var user = UserService.findByUserName(request.getEmail()).orElseThrow();
        var jwtToken = jwtService.generateToken(user);
        return AuthenticationResponse.builder()
                .token(jwtToken)
                .build();
    }
}
