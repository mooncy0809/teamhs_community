package com.teamhs.community.domain;

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
    private int boardId;

    @Column(nullable = true)
    private String userId;

    @Column(nullable = true)
    private int cateId;

    @Column(nullable = true)
    private String boardTitle;

    @Column(nullable = true)
    private String boardContent;

    @Column(nullable = true)
    private LocalDate boardDate;

    @Column(nullable = true)
    private int boardRecom;

    //조회수
    @Column(nullable = true)
    private int boardCnt;


    //없애도됨
    @Column(nullable = true)
    private int commentCnt;


    @OneToMany(mappedBy = "board", cascade = CascadeType.ALL) //Comment와 일대다 매핑
    private List<Comment> comments = new ArrayList<>();

}
