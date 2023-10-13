package com.interactive.comments.section.models;

import lombok.Data;

@Data
public class LoginResponse {

    private String token;
    private User user;
}
