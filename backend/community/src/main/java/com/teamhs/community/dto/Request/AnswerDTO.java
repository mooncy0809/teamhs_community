package com.teamhs.community.dto.Request;

import lombok.Data;

@Data
public class AnswerDTO {
    private Long answerId;
    private Long problemId;
    private String userId;
    private String answer;
}
