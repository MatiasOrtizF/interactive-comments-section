package com.interactive.comments.section.services;

import com.interactive.comments.section.exceptions.ResourceNotFoundException;
import com.interactive.comments.section.exceptions.UnauthorizedException;
import com.interactive.comments.section.models.Comment;
import com.interactive.comments.section.models.Reply;
import com.interactive.comments.section.models.User;
import com.interactive.comments.section.repositories.ReplyRepository;
import com.interactive.comments.section.repositories.UserRepository;
import com.interactive.comments.section.utils.JWTUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;

@Service
public class ReplyService {
    private final JWTUtil jwtUtil;
    private final AuthService authService;
    private final UserRepository userRepository;
    private final ReplyRepository replyRepository;

    @Autowired
    public ReplyService(JWTUtil jwtUtil, AuthService authService, UserRepository userRepository,
                        ReplyRepository replyRepository) {
        this.jwtUtil = jwtUtil;
        this.authService = authService;
        this.userRepository = userRepository;
        this.replyRepository = replyRepository;
    }

    public Reply addReply(Reply reply, String token) {
        if(authService.validationToken(token)) {
            String userId = jwtUtil.getKey(token);
            User user = userRepository.findById(Long.valueOf(userId)).orElseThrow(()-> new ResourceNotFoundException("The user is not found"));

            Comment newComment = new Comment();
            newComment.setScore(0);
            newComment.setUser(user);

            newComment.setCreatedAt(LocalDateTime.now());

            return replyRepository.save(reply);
        } throw new UnauthorizedException("Unauthorized: invalid token");
    }

    public boolean deleteReply(Long id, String token) {
        if(authService.validationToken(token)) {
            String userId = jwtUtil.getKey(token);
            Reply reply = replyRepository.findById(Long.valueOf(userId)).orElseThrow(()-> new ResourceNotFoundException("The comment with this id: " + id + "is not found"));
            if(reply.getUser().getId() == Long.valueOf(userId)) {
                replyRepository.delete(reply);
                return true;
            } throw new UnauthorizedException("Unauthorized: you do not have permission to delete this comment"); //ver como manejar esas exceptions
        } throw new UnauthorizedException("Unauthorized: invalid token");
    }

    public Reply editReply(String newContent, Long id, String token) {
        if(authService.validationToken(token)) {
            String userId = jwtUtil.getKey(token);
            Reply reply = replyRepository.findById(Long.valueOf(userId)).orElseThrow(()-> new ResourceNotFoundException("The comment with this id: " + id + "is not found"));
            if(reply.getUser().getId() == Long.valueOf(userId)) {
                reply.setContent(newContent);
                return replyRepository.save(reply);
            } throw new UnauthorizedException("Unauthorized: you do not have permission to delete this comment"); //ver como manejar esas exceptions
        } throw new UnauthorizedException("Unauthorized: invalid token");
    }
}
