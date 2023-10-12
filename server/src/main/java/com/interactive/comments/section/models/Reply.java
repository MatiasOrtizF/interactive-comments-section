package com.interactive.comments.section.models;

import jakarta.persistence.*;
import lombok.Data;

import java.util.Date;

@Data
@Entity
@Table(name = "reply")
public class Reply {
    @Id
    @GeneratedValue (strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;

    @ManyToOne(fetch = FetchType.EAGER, cascade = CascadeType.MERGE)
    @Column(name = "comment_id")
    private Comment comment;

    @Column(name = "content")
    private String content;

    @Column(name = "createdAt")
    private Date createdAt;

    @Column(name = "score")
    private Integer score;

    @ManyToOne(fetch = FetchType.EAGER, cascade = CascadeType.MERGE)
    @Column(name = "user_id")
    private User user;
}
