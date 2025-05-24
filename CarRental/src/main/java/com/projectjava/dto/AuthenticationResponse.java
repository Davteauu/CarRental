package com.projectjava.dto;

import com.projectjava.enums.UserRole;
import lombok.Data;

@Data
public class AuthenticationResponse {
    private String jwt;
    private UserRole userRole;
    private long userId;
}
