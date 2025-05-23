package com.projectjava.dto;

import com.projectjava.enums.UserRole;
import lombok.Data;

@Data
public class UserDto {
    private long id;
    private String name;
    private String email;
    private UserRole userRole;
}
