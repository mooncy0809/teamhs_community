package com.teamhs.community.dto.Request;

import lombok.Data;

import java.time.LocalDate;

@Data
public class ReplyDTO {
    private Long replyId;
    private Long problemId;
    private String userId;
    private String replyContent;
    private LocalDate replyDate;
    private Boolean replyState;
}
