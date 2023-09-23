package com.teamhs.community.domain;


import com.fasterxml.jackson.annotation.JsonIgnore;
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
    private int recommentId;

    @ManyToOne
    @JoinColumn(name = "commentId", referencedColumnName = "commentId", nullable = true)
    private Comment comment;

    @Column(nullable = true)
    private String userId;

    @ManyToOne //Board 엔티티와 다대일 매핑
    @JoinColumn(name = "boardId")
    private Board board;

    @Column(nullable = true)
    private String recommentContent;

    @Column(nullable = true)
    private String recommentDate;

}
