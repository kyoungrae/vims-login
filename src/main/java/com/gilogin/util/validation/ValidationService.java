package com.gilogin.util.validation;

import org.springframework.stereotype.Service;

@Service
public class ValidationService {
    public boolean checkEmptyValue(String value){
        return value != null && !value.trim().isEmpty() && !value.equals("null");
    }
}
