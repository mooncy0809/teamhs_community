package com.teamhs.community.domain;

import io.swagger.annotations.ApiModelProperty;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "board")
@Getter
@Setter
@AllArgsConstructor @NoArgsConstructor
public class Board {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY) // Auto-increment strategy
    private Long boardId;

    @Column(nullable = true, name = "user_id")
    @ApiModelProperty(value = "user_id")
    private String userId;

    @Column(nullable = true, name = "cate_id")
    @ApiModelProperty(value = "cate_id ")
    private int cateId;

    @Column(nullable = true, name = "board_title")
    @ApiModelProperty(value = "board_title ")
    private String boardTitle;

    @Column(nullable = true, name = "board_content")
    @ApiModelProperty(value = "board_content ")
    private String boardContent;

    @Column(nullable = true, name = "board_date")
    @ApiModelProperty(value = "board_date ")
    private LocalDate boardDate;

    @Column(nullable = true, name = "like_cnt")
    @ApiModelProperty(value = "like_cnt ")
    private int likeCnt;

    //조회수
    @Column(nullable = true, name = "view_cnt")
    @ApiModelProperty(value = "view_cnt ")
    private int viewCnt;

    @Column(nullable = true)
    private String imgUrl;

    //일대 다 매핑
    @OneToMany(mappedBy = "board", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Comment> comments = new ArrayList<>();
}
