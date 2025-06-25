/**
 *  ++ giens Product ++
 */
package com.vims.common.menu;

import com.system.common.base.AbstractCommonService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.context.MessageSource;
import org.springframework.context.i18n.LocaleContextHolder;
import org.springframework.stereotype.Service;

import java.awt.*;
import java.util.List;

@Service
@RequiredArgsConstructor
public class CommonMenuService extends AbstractCommonService<CommonMenu> {
    private final CommonMenuMapper commonMenuMapper;
    private final CommonMenuRepository commonMenuRepository;
    private final MessageSource messageSource;

     private String getMessage(String code) {
        return messageSource.getMessage(code, null, LocaleContextHolder.getLocale());
    }
    public List<CommonMenu> findHierarchy(CommonMenu request) throws Exception {
        return commonMenuMapper.SELECT_HIERARCHY(request);
//        return commonMenuMapper.SELECT_HIERARCHY_WITH_ACCESS_RIGHT_GROUP(request);
    }
    @Override
    protected List<CommonMenu> selectPage(CommonMenu request) throws Exception {
        return commonMenuMapper.SELECT_PAGE(request);
    }

    @Override
    protected int selectPagingTotalNumber(CommonMenu request) throws Exception {
        return commonMenuMapper.SELECT_PAGING_TOTAL_NUMBER(request);
    }
    @Override
    protected List<CommonMenu> findImpl(CommonMenu request) throws Exception {
        return commonMenuMapper.SELECT(request);
    }

    @Override
    protected int removeImpl(CommonMenu request) {
        return commonMenuMapper.DELETE(request);
    }

    @Override
    protected int updateImpl(CommonMenu request) {
        return commonMenuMapper.UPDATE(request);
    }

    @Override
    protected int registerImpl(CommonMenu request){
        return commonMenuMapper.INSERT(request);
    }
}