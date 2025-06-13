package com.system.user;

import com.system.common.CommonMapper;
import org.apache.ibatis.annotations.Mapper;

import java.util.Optional;

@Mapper
public interface UserMapper extends CommonMapper<User> {
    Optional<User> SELECT_USER_INFO(User vo);
    int DELETE_TOKEN(User vo);
}