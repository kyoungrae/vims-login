package com.gilogin.auth;

import com.gilogin.user.CommonUserRepository;
import com.gilogin.user.CommonUserService;
import com.gilogin.user.Role;
import com.gilogin.user.User;
import com.gilogin.jwt.JwtService;
import com.gilogin.token.Token;
import com.gilogin.token.TokenRepository;
import com.gilogin.token.TokenType;
import com.gilogin.util.userinfo.UserInfo;
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
    private final CommonUserRepository repository;
    private final TokenRepository tokenRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;
    private final AuthenticationManager authenticationManager;
    private final CommonUserService commonUserService;

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
        repository.save(user);

        var token = Token.builder()
                .token(jwtToken)
                .tokenType(TokenType.AUTHORIZATION)
                .user(user)
                .build();
        tokenRepository.save(token);
        return AuthenticationResponse.builder()
                .token(jwtToken)
                .build();
    }
    public AuthenticationResponse authenticate(AuthenticationRequest request){
        authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(request.getEmail(),request.getPassword())
        );
        var user = repository.findByEmail(request.getEmail()).orElseThrow();
        var jwtToken = jwtService.generateToken(user);

        return AuthenticationResponse.builder()
                .token(jwtToken)
                .build();
    }
}
