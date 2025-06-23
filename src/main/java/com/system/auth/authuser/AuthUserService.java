/**
 *  ++ giens Product ++
 */
package com.system.auth.authuser;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.Map;
import java.util.Optional;
import java.util.concurrent.ConcurrentHashMap;

@Service
@RequiredArgsConstructor
public class AuthUserService{
    private final AuthUserMapper authUserMapper;
    private final Map<String, AuthUser> userCache = new ConcurrentHashMap<>();
    public Optional<AuthUser> findByUserName(String req){
        if (userCache.containsKey(req)) return Optional.of(userCache.get(req));
        var user = AuthUser.builder().email(req).build();
        var result = authUserMapper.SELECT_USER_INFO(user);
        result.ifPresent(u -> userCache.put(req, u));
        return result;
    }
    public int save(AuthUser authUser){
        return authUserMapper.INSERT_USER_INFO(authUser);
    }
}