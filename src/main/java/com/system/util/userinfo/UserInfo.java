package com.system.util.userinfo;

import com.system.jwt.JwtService;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;


public class UserInfo {
    JwtService jwtService;
    public String getUserEmail() throws Exception{
        try{
            Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
            if (authentication != null && authentication.isAuthenticated()) {
                Object principal = authentication.getPrincipal();

                if (principal instanceof UserDetails) {
                    return ((UserDetails) principal).getUsername();
                } else {
                    return principal.toString();
                }
            }
            return null;
        }catch (Exception e){
            throw new Exception("not find User Email");
        }
    }
}
