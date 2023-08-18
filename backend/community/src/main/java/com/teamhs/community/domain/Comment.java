package com.teamhs.community.domain;


import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDate;

@Entity
@Table(name = "comment")
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class Comment {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY) // Auto-increment strategy
    private int commentId;

    @Column(nullable = true)
    private String userId;

    @Column(nullable = true)
    private int boardId;

    @Column(nullable = true)
    private String commentContent;

    @Column(nullable = true)
    private LocalDate commentDate;

}
