package com.teamhs.community.domain;


import com.fasterxml.jackson.annotation.JsonIgnore;
import io.swagger.annotations.ApiModelProperty;
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
    @ApiModelProperty(value = "recomment_id")
    private int recommentId;

    @ManyToOne
    @JoinColumn(name = "commentId", referencedColumnName = "commentId", nullable = true)
    @OneToMany(mappedBy = "comment", cascade = CascadeType.ALL, orphanRemoval = true)
    @ApiModelProperty(value = "comment_id")
    private Comment comment;

    @Column(nullable = true, name = "user_id")
    @ApiModelProperty(value = "user_id")
    private String userId;

    @ManyToOne //Board 엔티티와 다대일 매핑
    @JoinColumn(name = "boardId")
    @ApiModelProperty(value = "board_id")
    private Board board;

    @Column(nullable = true, name = "recomment_content")
    @ApiModelProperty(value = "recomment_content")
    private String recommentContent;

    @Column(nullable = true, name = "recomment_date")
    @ApiModelProperty(value = "recomment_date")
    private String recommentDate;

}
