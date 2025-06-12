package com.gilogin.user;

import com.gilogin.common.AbstractCommonController;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/common/common/commonUser")
@RequiredArgsConstructor
public class CommonUserController extends AbstractCommonController<User> {
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
}