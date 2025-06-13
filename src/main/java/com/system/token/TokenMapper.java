package com.system.token;

import org.apache.ibatis.annotations.Mapper;

import java.util.Optional;

@Mapper
public interface TokenMapper {
    public Optional<Token> SELECT(String token);
    int INSERT(Token token);
}
