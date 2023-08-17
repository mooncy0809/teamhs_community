package com.teamhs.community.domain;

import com.teamhs.community.dto.SignUpDto;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.util.Date;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Entity(name="Member")
@Table(name="Member")
public class Member {
    @Id
    private String userId;
    private String userPassword;
    private String userName;
    private String userEmail;
    private String Rating;
    private Date joinDate;
    private Character status;

    public Member(SignUpDto dto){
        this.userId = dto.getUserId();
        this.userPassword = dto.getUserPassword();
        this.userName = dto.getUserName();
        this.userEmail = dto.getUserEmail();
        Rating = "Bronze";
        joinDate = new Date();
        status = 'n';
    }
}
