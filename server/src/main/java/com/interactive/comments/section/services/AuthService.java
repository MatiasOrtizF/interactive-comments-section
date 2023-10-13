package com.interactive.comments.section.services;

import com.interactive.comments.section.models.LoginResponse;
import com.interactive.comments.section.models.User;
import com.interactive.comments.section.repositories.UserRepository;
import com.interactive.comments.section.utils.JWTUtil;
import de.mkammerer.argon2.Argon2;
import de.mkammerer.argon2.Argon2Factory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class AuthService {

    private final JWTUtil jwtUtil;
    private final UserRepository userRepository;

    @Autowired
    AuthService(JWTUtil jwtUtil,  UserRepository userRepository) {
        this.jwtUtil = jwtUtil;
        this.userRepository = userRepository;
    }

    public boolean validationToken (String token) {
        String userId = jwtUtil.getKey(token);
        return (userId != null);
    }

    public User validationUserName (String userName) {
        return userRepository.findByUserName(userName);
    }

    public LoginResponse validationCredentials(User user) {
        User userLogged = validationUserName(user.getUserName());
        if(userLogged != null) {
            String passwordHashed = userLogged.getPassword();

            Argon2 argon2 = Argon2Factory.create(Argon2Factory.Argon2Types.ARGON2id);
            if(argon2.verify(passwordHashed, user.getPassword())) {
                String tokenJWT = jwtUtil.create(userLogged.getId().toString(), userLogged.getUserName());

                LoginResponse response = new LoginResponse();
                response.setToken(tokenJWT);
                response.setUser(userLogged);

                return response;
            }
        }
        throw new RuntimeException("Email or password is incorrect");
    }
}
