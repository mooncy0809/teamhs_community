package com.teamhs.community.domain;


import com.fasterxml.jackson.annotation.JsonIgnore;
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
    @GeneratedValue(strategy = GenerationType.IDENTITY) // Auto-increment
    private int commentId;

    @Column(nullable = true)
    private String userId;

    @ManyToOne
    @JoinColumn(name = "board_id")
    @JsonIgnore //Board - Comment 직렬화(무한 순환 문제 해결)
    private Board board;

    @Column(nullable = true)
    private String commentContent;

    @Column(nullable = true)
    private LocalDate commentDate;

}
