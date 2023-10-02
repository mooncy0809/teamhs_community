package com.teamhs.community.domain;


import com.fasterxml.jackson.annotation.JsonIgnore;
import io.swagger.annotations.ApiModelProperty;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDate;
import java.time.LocalDateTime;

@Entity
@Table(name = "comment")
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class Comment {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY) // Auto-increment
    @ApiModelProperty(value = "comment_id ")
    private int commentId;

    @JoinColumn(name = "userId")
    @ApiModelProperty(value = "user_id ")
    private String userId;

    @ManyToOne //Board 엔티티와 다대일 매핑
    @JoinColumn(name = "boardId", referencedColumnName = "boardId", nullable = true)
    @OneToMany(mappedBy = "board", cascade = CascadeType.ALL, orphanRemoval = true)
    @JsonIgnore //Board - Comment 직렬화(무한 순환 문제 해결)
    @ApiModelProperty(value = "board_id ")
    private Board board;

    @Column(nullable = true, name = "comment_content")
    @ApiModelProperty(value = "comment_content")
    private String commentContent;

    @Column(nullable = true, name = "comment_date")
    @ApiModelProperty(value = "comment_date")
    private String commentDate;

}
