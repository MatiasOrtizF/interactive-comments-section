package com.interactive.comments.section.controllers;

import com.interactive.comments.section.exceptions.ResourceNotFoundException;
import com.interactive.comments.section.exceptions.UnauthorizedException;
import com.interactive.comments.section.models.Comment;
import com.interactive.comments.section.models.Reply;
import com.interactive.comments.section.models.User;
import com.interactive.comments.section.services.ReplyService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;

@RestController
@CrossOrigin(origins = {"http://localhost:19006/", "192.168.0.9:8081"})
@RequestMapping("/api/reply")
public class ReplyController {

    private final ReplyService replyService;

    @Autowired
    public ReplyController(ReplyService replyService) {
        this.replyService = replyService;
    }

    public ResponseEntity<?> addReply(Reply reply, String token) {
        try {
            return ResponseEntity.ok(replyService.addReply(reply, token));
        } catch (UnauthorizedException e) {
            return ResponseEntity.badRequest().body("Unauthorized: invalid token");
        }
    }
    @DeleteMapping("{id}")
    public ResponseEntity<?> deleteReply(@PathVariable Long id, @RequestHeader(value = "Authorization")String token) {
        try {
            replyService.deleteReply(id, token);
            return ResponseEntity.ok().build();
        } catch (UnauthorizedException e) {
            return ResponseEntity.badRequest().body("Unauthorized: invalid token");
        }
    }

    @PutMapping("{id}")
    public ResponseEntity<?> editReply(@RequestBody String newContent, @PathVariable Long id, @RequestHeader(value = "Authorization")String token) {
        try {
            return ResponseEntity.ok(replyService.editReply(newContent, id, token));
        } catch (UnauthorizedException e) {
            return ResponseEntity.badRequest().body("Unauthorized: invalid token");
        }
    }
}
