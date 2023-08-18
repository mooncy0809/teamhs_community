package com.teamhs.community.dto.Request;

import jakarta.persistence.Column;

import java.time.LocalDate;

public class CommentDTO {

    private int commentId;
    private String userId;
    private int boardId;
    private String commentContent;
    private LocalDate commentDate;

    public int getCommentId() {
        return commentId;
    }
    public void setUserId(int commentId) {
        this.commentId = commentId;
    }
    public String getUserId() {return userId;}
    public void setUserId(String userId) {
        this.userId = userId;
    }

    public int getBoardId() {
        return boardId;
    }
    public void setBoardId(int boardId) {
        this.boardId = boardId;
    }

    public String getCommentContent() {
        return commentContent;
    }
    public void setCommentContent(String commentContent) {
        this.commentContent = commentContent;
    }

    public LocalDate getCommentDate() {
        return commentDate;
    }

    public void setCommentDate(LocalDate commentDate) {
        this.commentDate = commentDate;
    }



}
