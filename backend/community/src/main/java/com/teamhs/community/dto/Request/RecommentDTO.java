package com.teamhs.community.dto.Request;

import lombok.Getter;

import java.time.LocalDate;


public class RecommentDTO {
    private int recommentId;
    private Long commentId;
    private String userId;
    private Long boardId;
    @Getter
    private String reCommentContent;
    private String recommentDate;


    public int getRecommentId() {
        return recommentId;
    }
    public void setRecommentId(int recommentId) {
        this.recommentId = recommentId;
    }

    public Long getCommentId() {
        return commentId;
    }
    public void setCommentId(Long commentId) {
        this.commentId = commentId;
    }
    public String getUserId() {return userId;}
    public void setUserId(String userId) {
        this.userId = userId;
    }

    public Long getBoardId() {
        return boardId;
    }
    public void setBoardId(Long boardId) {
        this.boardId = boardId;
    }

    public void setReCommentContent(String reCommentContent) {
        this.reCommentContent = reCommentContent;
    }

    public String getReCommentDate() {
        return recommentDate;
    }

    public void setReCommentDate(String recommentDate) {
        this.recommentDate = recommentDate;
    }
}


