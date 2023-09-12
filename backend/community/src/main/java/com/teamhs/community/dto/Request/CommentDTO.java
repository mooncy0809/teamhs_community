package com.teamhs.community.dto.Request;

import java.time.LocalDate;
import java.time.LocalDateTime;


public class CommentDTO {

    private int commentId;
    private String userId;
    private Long boardId;

    private String commentContent;
    private String commentDate;

    public int getCommentId() {
        return commentId;
    }
    public void setCommentId(int commentId) {
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

    public String getCommentContent() {
        return commentContent;
    }
    public void setCommentContent(String commentContent) {
        this.commentContent = commentContent;
    }

    public String getCommentDate() {
        return commentDate;
    }

    public void setCommentDate(String commentDate) {
        this.commentDate = commentDate;
    }
}


