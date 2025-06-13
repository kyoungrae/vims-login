/**
 *  ++ giens Product ++
 */
package com.system.user;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
@RequiredArgsConstructor
public class UserService{
    private final UserMapper userMapper;

    public Optional<User> findByUserName(String req){
        var user = User.builder().email(req).build();
        return userMapper.SELECT_USER_INFO(user);
    }
    public int save(User user){
        return 0;
    }
}