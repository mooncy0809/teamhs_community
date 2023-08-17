package com.teamhs.community.dto.Request;

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
}
