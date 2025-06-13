package com.system.token;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
@RequiredArgsConstructor
public class TokenService {
    private final TokenMapper tokenMapper;
    public Optional<Token> findByToken(String token){
        return tokenMapper.SELECT(token);
    }

    public int save(Token token){
        return tokenMapper.INSERT(token);
    }
}
