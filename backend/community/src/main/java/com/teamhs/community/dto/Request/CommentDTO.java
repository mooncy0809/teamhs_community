package com.teamhs.community.dto.Request;

import lombok.Getter;

import java.time.LocalDate;
import java.time.LocalDateTime;


public class CommentDTO {

    private int commentId;
    @Getter
    private String userId;
    @Getter
    private Long boardId;
    @Getter
    private String commentContent;
    private String commentDate;

    public void setUserId(String userId) {
        this.userId = userId;
    }
    public void setBoardId(Long boardId) {
        this.boardId = boardId;
    }
}


