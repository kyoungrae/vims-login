/**
 *  ++ giens Product ++
 */
package com.system.auth.authuser;

import lombok.RequiredArgsConstructor;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
@RequiredArgsConstructor
public class AuthUserService{
    private final AuthUserMapper authUserMapper;

    public Optional<AuthUser> findByUserName(String req){
        System.out.println("########################################################");
        var user = AuthUser.builder().email(req).build();
        return authUserMapper.SELECT_USER_INFO(user);
    }
    public int save(AuthUser authUser){
        return authUserMapper.INSERT_USER_INFO(authUser);
    }
}