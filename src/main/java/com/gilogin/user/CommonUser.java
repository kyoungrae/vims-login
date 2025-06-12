package com.gilogin.user;

import com.gilogin.common.Common;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import jakarta.persistence.Transient;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;
import lombok.experimental.SuperBuilder;

import java.util.Arrays;

@EqualsAndHashCode(callSuper = true)
@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
@SuperBuilder
@Table(name = "COMMON_USER")
public class CommonUser extends Common {
    @Transient
	private String keys = Arrays.toString(new String[]{"id"});

    @Id

    /***<pre> id : 시퀀스 아이디 </pre> */
	private Integer id;

    /***<pre> email : 이메일 </pre> */
	private String email;

    /***<pre> password : 비밀번호 </pre> */
	private String password;

    /***<pre> before_password : 기존비밀번호 </pre> */
    private String before_password;

    /***<pre> role : 역할 </pre> */
	private String role;

    /***<pre> user_id : 유저아이디 </pre> */
	private String user_id;

    /***<pre> office_code : 소속코드 </pre> */
	private String office_code;

    /***<pre> user_name : 사용자명 </pre> */
    private String user_name;
    /***<pre> tel : 전화번호 </pre> */
    private String tel;
    /***<pre> address : 주소 </pre> */
    private String address;
    /***<pre> address_detail : 주소상세 </pre> */
    private String address_detail;
    /***<pre> postal_code : 우편번호 </pre> */
    private String postal_code;
    /***<pre> uuid : 공통파일 </pre> */
    private String uuid;

    /***<pre> id : 그룹아이디 </pre> */
    @Transient
    private String group_id;

    /***<pre> lane_number : 레인번호 </pre> */
    @Transient
    private String lane_number;

    /***<pre> inspector_group_id : 검사원 그룹 아이디 </pre> */
    @Transient
    private String inspector_group_id;

    /***<pre> id : 시퀀스 아이디 </pre> */
    @Transient
	private Integer _id;

    /***<pre> email : 이메일 </pre> */
    @Transient
	private String _email;

    /***<pre> password : 비밀번호 </pre> */
    @Transient
	private String _password;

    /***<pre> role : 역할 </pre> */
    @Transient
	private String _role;

    /***<pre> user_id : 유저아이디 </pre> */
    @Transient
	private String _user_id;

    /***<pre> office_code : 소속코드 </pre> */
    @Transient
	private String _office_code;


    /***<pre> user_name : 사용자명 </pre> */
    @Transient
    private String _user_name;

    /***<pre> tel : 전화번호 </pre> */
    @Transient
    private String _tel;

    /***<pre> address : 주소 </pre> */
    @Transient
    private String _address;

    /***<pre> address_detail : 주소상세 </pre> */
    @Transient
    private String _address_detail;

    /***<pre> postal_code : 우편번호 </pre> */
    @Transient
    private String _postal_code;

    /***<pre> uuid : 공통파일 </pre> */
    @Transient
    private String _uuid;

}