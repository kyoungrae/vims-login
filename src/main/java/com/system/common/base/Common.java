package com.system.common.base;

import jakarta.persistence.MappedSuperclass;
import jakarta.persistence.Transient;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.experimental.SuperBuilder;

import java.util.Date;

@AllArgsConstructor
@NoArgsConstructor
@Data
@SuperBuilder
@MappedSuperclass
public class Common{
    @Transient
    private Integer no;

    @Transient
    private String from_date;

    @Transient
    private String to_date;

    @Transient
    private Integer page_no;

    @Transient
    private Integer total;

    @Transient
    private Integer row_range;

    @Transient
    private String is_not_null;

    @Transient
    private String is_null;


    /***<pre> office_name : 기관명 </pre> */
    @Transient
    private String office_name;

    /***<pre> office_type : 기관유형 </pre> */
    @Transient
    private String office_type;

    /***<pre> receipt_number : 신청서 리턴 번호 </pre> */
    @Transient
    private String receipt_number;
    
    /***<pre> sort_id : 정렬 기준 ID </pre> */
    @Transient
    private String sort_id;
    
    /***<pre> sort_order : 정렬방법(asc, desc) </pre> */
    @Transient
    private String sort_order;


    @Transient
    private Date system_create_date;
    @Transient
    private String system_create_userid;
    @Transient
    private Date system_update_date;
    @Transient
    private String system_update_userid;

    /***<pre> system_create_date : 작성일자 </pre> */
    @Transient
    private java.sql.Date _system_create_date;

    /***<pre> system_create_userid : 작성자ID </pre> */
    @Transient
    private String _system_create_userid;

    /***<pre> system_update_date : 수정일자 </pre> */
    @Transient
    private java.sql.Date _system_update_date;

    /***<pre> system_update_userid : 수정자ID </pre> */
    @Transient
    private String _system_update_userid;

    /***<pre> sort_id : 정렬 기준 ID </pre> */
    @Transient
    private String _sort_id;

    /***<pre> sort_order : 정렬방법(asc, desc) </pre> */
    @Transient
    private String _sort_order;
}
