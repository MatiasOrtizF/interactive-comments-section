package com.interactive.comments.section.services;

import com.interactive.comments.section.exceptions.ResourceNotFoundException;
import com.interactive.comments.section.exceptions.UnauthorizedException;
import com.interactive.comments.section.models.Comment;
import com.interactive.comments.section.models.User;
import com.interactive.comments.section.repositories.CommentRepository;
import com.interactive.comments.section.repositories.UserRepository;
import com.interactive.comments.section.utils.JWTUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
public class CommentService {
    private final CommentRepository commentRepository;
    private final AuthService authService;
    private final UserRepository userRepository;
    private final JWTUtil jwtUtil;

    @Autowired
    public CommentService(CommentRepository commentRepository, AuthService authService,
                          UserRepository userRepository, JWTUtil jwtUtil) {
        this.commentRepository = commentRepository;
        this.authService = authService;
        this.userRepository = userRepository;
        this.jwtUtil = jwtUtil;
    }

    public List<Comment> getAllComments(String token) {
        if(authService.validationToken(token)) {
            return commentRepository.findAll();
        } throw new UnauthorizedException("Unauthorized: invalid token");
    }

    public Comment addComment(Comment comment, String token) {
        if(authService.validationToken(token)) {
            String userId = jwtUtil.getKey(token);
            User user = userRepository.findById(Long.valueOf(userId)).orElseThrow(()-> new ResourceNotFoundException("The user is not found"));

            Comment newComment = new Comment();
            newComment.setScore(0);
            newComment.setUser(user);

            newComment.setCreatedAt(LocalDateTime.now());

            return commentRepository.save(comment);
        } throw new UnauthorizedException("Unauthorized: invalid token");
    }

    public boolean deleteComment(Long id, String token) {
        if(authService.validationToken(token)) {
            String userId = jwtUtil.getKey(token);
            Comment comment = commentRepository.findById(Long.valueOf(userId)).orElseThrow(()-> new ResourceNotFoundException("The comment with this id: " + id + "is not found"));
            if(comment.getUser().getId() == Long.valueOf(userId)) {
                commentRepository.delete(comment);
                return true;
            } throw new UnauthorizedException("Unauthorized: you do not have permission to delete this comment"); //ver como manejar esas exceptions
        } throw new UnauthorizedException("Unauthorized: invalid token");
    }

    public Comment editComment(String newComment, Long id, String token) {
        if(authService.validationToken(token)) {
            String userId = jwtUtil.getKey(token);
            Comment comment = commentRepository.findById(Long.valueOf(userId)).orElseThrow(()-> new ResourceNotFoundException("The comment with this id: " + id + "is not found"));
            if(comment.getUser().getId() == Long.valueOf(userId)) {
                comment.setContent(newComment);
                return commentRepository.save(comment);
            } throw new UnauthorizedException("Unauthorized: you do not have permission to delete this comment"); //ver como manejar esas exceptions
        } throw new UnauthorizedException("Unauthorized: invalid token");
    }
}
