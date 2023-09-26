package com.teamhs.community.domain;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import static jakarta.persistence.FetchType.LAZY;

@Getter
@Setter
@NoArgsConstructor
@Entity
@Table(name = "boardlike")
public class BoardLike {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long likeId;

    @ManyToOne(fetch = LAZY)
    @JoinColumn(name = "user_id")
    private Member member;

    @ManyToOne(fetch = LAZY)
    @JoinColumn(name = "board_id")
    @OneToMany(mappedBy = "board", cascade = CascadeType.ALL, orphanRemoval = true)
    private Board board;

}