/**
 *  ++ giens Product ++
 */
package com.gilogin.user;

import com.gilogin.common.AbstractCommonService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class CommonUserService extends AbstractCommonService<User> {
    @Override
    protected List<User> findImpl(User request) throws Exception {
        return List.of();
    }

    @Override
    protected int removeImpl(User request) throws Exception {
        return 0;
    }

    @Override
    protected int updateImpl(User request) throws Exception {
        return 0;
    }

    @Override
    protected int registerImpl(User request) throws Exception {
        return 0;
    }

    @Override
    protected List<User> selectPage(User request) throws Exception {
        return List.of();
    }

    @Override
    protected int selectPagingTotalNumber(User request) throws Exception {
        return 0;
    }
}