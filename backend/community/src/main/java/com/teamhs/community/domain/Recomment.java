package com.teamhs.community.domain;


import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDate;

@Entity
@Table(name = "recomment")
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class Recomment {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY) // Auto-increment
    private int recommentId;


    @ManyToOne //Comment 엔티티와 다대일 매핑
    @JoinColumn(name = "commentId")
    @JsonIgnore //Comment - Recomment 직렬화(무한 순환 문제 해결)
    private Comment comment;

    @Column(nullable = true)
    private String userId;

    @ManyToOne //Board 엔티티와 다대일 매핑
    @JoinColumn(name = "boardId")
    @JsonIgnore //Board - Comment 직렬화(무한 순환 문제 해결)
    private Board board;

    @Column(nullable = true)
    private String reCommentContent;

    @Column(nullable = true)
    private LocalDate recommentDate;

}
