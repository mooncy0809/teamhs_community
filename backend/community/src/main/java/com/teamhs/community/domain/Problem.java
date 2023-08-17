package com.teamhs.community.domain;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDate;

@AllArgsConstructor
@NoArgsConstructor //기본 생성자를 대신 생성
@Data
@Entity
@Table(name = "problem") //DB 테이블과 매핑한다. 기본적으로 @Entity로 선언된 클래스의 이름과  DB테이블 명과 일치하는 것을 매핑한다.

public class Problem {
    @Id //Primary Key를 가지는 변수를 선언 @GeneratedValue을 사용하여 어떻게 id값을 자동으로 생성할지 설정할 수 있다.
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer problemId;

//    @ManyToOne
//    @JoinColumn(name = "user_id")
//    private User user;

    @Column(name = "user_id")
    private String userId;

    @Column(name = "cate_id")
    private Integer cateId;

    @Column(name = "problem_point")
    private Integer problemPoint;

    @Column(name = "problem_date")
    private LocalDate problemDate;

    @Column(name = "problem_type")
    private Integer problemType;

    @Column(name = "problem_title",nullable = false) //DB컬럼 명과 변수명이 일치하는 것끼리 기본적으로 매핑되지만 서로 다르게 설정하고 싶다면 @Column(name="컬럼명")을 사용하여 설정을 한다.
    private String problemTitle;

    @Column(name = "problem_content",nullable = false)
    private String problemContent;

    @Column(name = "problem_recom")
    private Integer problemRecom;

    @Column(name = "problem_cnt")
    private Integer problemCnt;

    @Column(name = "answer_cnt")
    private Integer answerCnt;

    @Column(name = "submit_cnt")
    private Integer submitCnt;

}


/*
 도메인모델은 @Entity 애노테이션을 붙여야 합니다.
 @Table 애노테이션은 엔터티가 매핑될 테이블의 세부 정보를 제공하는 데 사용됩니다.
 @Id 애노테이션은 기본 키를 정의하는 데 사용됩니다.
 @GeneratedValue 애노테이션은 기본 키 생성 전략을 정의하는 데 사용됩니다.
 @Column 애노테이션은 애노테이션이 있는 필드에 매핑될 열의 속성을 정의하는 데 사용됩니다.
 @Getter, @Setter 애노태이션은 메소드를 통해 데이터 변경을 위해 사용됩니다.
 @AllArgsConstructor 과 @NoArgsConstructor 애노테이션은 기본 생성자를 대신 생성해줍니다.
*/