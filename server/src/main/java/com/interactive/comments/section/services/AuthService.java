package com.interactive.comments.section.services;

import com.interactive.comments.section.utils.JWTUtil;
import org.springframework.beans.factory.annotation.Autowired;

public class AuthService {

    private final JWTUtil jwtUtil;

    @Autowired
    AuthService(JWTUtil jwtUtil) {
        this.jwtUtil = jwtUtil;
    }

    public boolean validationToken (String token) {
        String userId = jwtUtil.getKey(token);
        return (userId != null);
    }
}
