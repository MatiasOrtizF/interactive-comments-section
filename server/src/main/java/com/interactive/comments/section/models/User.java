package com.interactive.comments.section.models;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.Data;

@Entity
@Data
@Table(name = "user")
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;

    @Size(min = 3, max = 10)
    @NotBlank(message = "name is mandatory")
    @Column(name = "user_name", unique = true)
    private String userName;

    @NotBlank(message = "name is mandatory")
    @Column(name = "password")
    private String password;

    @Column(name = "image")
    private String image;
}
