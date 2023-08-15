package com.teamhs.community.domain;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import java.time.LocalDate;

@Entity
@Table(name = "community")
@Getter
@Setter
@AllArgsConstructor @NoArgsConstructor
public class Board {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY) // Auto-increment strategy
    private int c_id;

    @Column(nullable = true)
    private String user_id;

    @Column(nullable = true)
    private int cate_id;

    @Column(nullable = true)
    private String c_title;

    @Column(nullable = true)
    private String c_content;

    @Column(nullable = true)
    private LocalDate c_date;

    @Column(nullable = true)
    private int c_recom;

    @Column(nullable = true)
    private int c_cnt;

    @Column(nullable = true)
    private int cm_cnt;

}
