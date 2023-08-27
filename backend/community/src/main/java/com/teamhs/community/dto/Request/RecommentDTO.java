package com.teamhs.community.dto.Request;

import java.time.LocalDate;


public class RecommentDTO {
    private int recommentId;
    private Long commentId;
    private String userId;
    private Long boardId;
    private String recommentContent;
    private LocalDate recommentDate;


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

    public String getReCommentContent() {
        return recommentContent;
    }
    public void setReCommentContent(String commentContent) {
        this.recommentContent = commentContent;
    }

    public LocalDate getReCommentDate() {
        return recommentDate;
    }

    public void setReCommentDate(LocalDate recommentDate) {
        this.recommentDate = recommentDate;
    }
}


