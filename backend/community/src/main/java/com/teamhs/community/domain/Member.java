package com.teamhs.community.domain;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity
@Getter
@Builder
@NoArgsConstructor
public class Member {
    @Id
    private Long user_id;

    @Column(nullable = false)
    private String pwd;

    @Column(nullable = false)
    private String name;

    @Column(nullable = false)
    private String nickname;

    @Column(nullable = false)
    private String email;

    @Column(nullable = false)
    private String contact;

    public void setNickname(String nickname){
        this.nickname = nickname;
    }
    public void setPwd(String pwd) {this.pwd = pwd;}

    @Builder
    public Member(Long user_id, String pwd, String name, String nickname, String email, String contact){
        this.user_id = user_id;
        this.pwd = pwd;
        this.name = name;
        this.nickname = nickname;
        this.email = email;
        this.contact = contact;

    }


}