package com.teamhs.community.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class SignUpDto {
    private String userId;
    private String userEmail;
    private String userPassword;
    private String userName;
    private String userNickname;
    private String userPhoneNumber;
}
