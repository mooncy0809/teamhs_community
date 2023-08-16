package com.teamhs.community.domain;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import java.time.LocalDate;

@Entity
@Table(name = "board")
@Getter
@Setter
@AllArgsConstructor @NoArgsConstructor
public class Board {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY) // Auto-increment strategy
    private int board_id;

    @Column(nullable = true)
    private String user_id;

    @Column(nullable = true)
    private int cate_id;

    @Column(nullable = true)
    private String board_title;

    @Column(nullable = true)
    private String board_content;

    @Column(nullable = true)
    private LocalDate board_date;

    @Column(nullable = true)
    private int board_recom;

    @Column(nullable = true)
    private int board_cnt;

    @Column(nullable = true)
    private int comment_cnt;

}
