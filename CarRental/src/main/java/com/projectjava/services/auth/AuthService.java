package com.projectjava.services.auth;

import com.projectjava.dto.SignupRequest;
import com.projectjava.dto.UserDto;

public interface AuthService {
    UserDto createCustomer(SignupRequest signupRequest);

    boolean hasCustomerWithEmail(String email);
}
