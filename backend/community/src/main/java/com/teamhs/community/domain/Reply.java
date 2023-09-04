package com.teamhs.community.domain;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@AllArgsConstructor //클래스의 모든 필드를 인자로 받는 생성자를 자동으로 생성, 객체를 초기화할 때 모든 필드 값을 한 번에 설정
@NoArgsConstructor //기본 생성자를 자동으로 생성
@Data
@Entity
@Table(name = "reply")
public class Reply {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "reply_id")
    private Long replyId;

    @ManyToOne
    @JoinColumn(name = "problem_id")
    private Problem problem;

    @Column(name = "user_id")
    private String userId;

    @Column(name = "reply_content", nullable = false)
    private String replyContent;

    @Column(name = "reply_date")
    private LocalDate replyDate;

    @Column(name = "reply_state")
    private Boolean replyState;

}
