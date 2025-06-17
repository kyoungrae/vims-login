package com.system.auth.mapper;

import com.system.auth.authuser.AuthUser;
import com.system.common.base.CommonMapper;
import org.apache.ibatis.annotations.Mapper;

import java.util.Optional;

@Mapper
public interface SequenceMapper extends CommonMapper<AuthUser> {
    int SELECT_NEXT_TOKEN_ID();
}