package com.teamhs.community.domain;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "problem")
@Getter @Setter
@AllArgsConstructor @NoArgsConstructor
public class Problem {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(name = "title")
    private String title;

    @Column(name = "content")
    private String content;

    @Column(name = "writer")
    private String writer;

    @Column(name = "view_cnt")
    private Integer viewCnt;

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