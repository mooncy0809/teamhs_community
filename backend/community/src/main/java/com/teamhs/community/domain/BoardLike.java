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
    @Column(name = "like_id")
    private Long likeId;

    @ManyToOne(fetch = LAZY)
    @JoinColumn(name = "user_id")
    private Member member; // 수정: 필드 이름을 member로 변경

    @ManyToOne(fetch = LAZY)
    @JoinColumn(name = "board_id")
    private Board board;

}