package com.interactive.comments.section.controllers;

import com.interactive.comments.section.exceptions.UnauthorizedException;
import com.interactive.comments.section.models.Comment;
import com.interactive.comments.section.repositories.CommentRepository;
import com.interactive.comments.section.services.CommentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin(origins = {"http://localhost:19006/", "192.168.0.9:8081"})
@RequestMapping("/api/comment")

public class CommentController {
    private final CommentService commentService;
    private final CommentRepository commentRepository;

    @Autowired
    public CommentController(CommentService commentService,
                             CommentRepository commentRepository) {
        this.commentService = commentService;
        this.commentRepository = commentRepository;
    }

    @GetMapping
    public ResponseEntity<?> getAllComments(@RequestHeader(value = "Authorization")String token) {
        try {
            return ResponseEntity.ok(commentService.getAllComments(token));
        } catch (UnauthorizedException e) {
            return ResponseEntity.badRequest().body("Unauthorized: invalid token");
        }
    }

    @PostMapping
    public ResponseEntity<?> addComment(@RequestBody Comment comment, @RequestHeader(value = "Authorization")String token) {
        try {
            return ResponseEntity.ok(commentService.addComment(comment, token));
        } catch (UnauthorizedException e) {
            return ResponseEntity.badRequest().body("Unauthorized: invalid token");
        }
    }

    @DeleteMapping("{id}")
    public ResponseEntity<?> deleteComment(@PathVariable Long id, @RequestHeader(value = "Authorization")String token) {
        try {
            commentService.deleteComment(id, token);
            return ResponseEntity.ok().build();
        } catch (UnauthorizedException e) {
            return ResponseEntity.badRequest().body("Unauthorized: invalid token");
        }
    }

    @PutMapping("{id}")
    public ResponseEntity<?> editComment(@RequestBody String newComment, @PathVariable Long id, @RequestHeader(value = "Authorization")String token) {
        try {
            return ResponseEntity.ok(commentService.editComment(newComment, id, token));
        } catch (UnauthorizedException e) {
            return ResponseEntity.badRequest().body("Unauthorized: invalid token");
        }
    }
}
