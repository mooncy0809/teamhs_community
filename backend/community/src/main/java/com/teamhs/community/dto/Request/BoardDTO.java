package com.teamhs.community.dto.Request;

import java.time.LocalDate;

public class BoardDTO {
    private int boardId;
    private String userId;
    private int cateId;
    private String boardTitle;
    private String boardContent;
    private LocalDate boardDate;
    private int boardRecom;
    private int boardCnt;
    private int commentCnt;

    public String getUserId() {
        return userId;
    }

    public void setUserId(String userId) {
        this.userId = userId;
    }

    public int getBoardId() {
        return boardId;
    }
    public void setBoardId(int boardId) {
        this.boardId = boardId;
    }

    public String getTitle() {
        return boardTitle;
    }

    public void setTitle(String board_title) {
        this.boardTitle = board_title;
    }

    public String getContent() {
        return boardContent;
    }

    public void setContent(String boardContent) {
        this.boardContent = boardContent;
    }

    public int getCategoryId () {
        return cateId;
    }

    public void setCategoryId(int cateId) {
        this.cateId = cateId;
    }

    public LocalDate getBoardDate() {
        return boardDate;
    }

    public void setBoardDate(LocalDate boardDate) {
        this.boardDate = boardDate;
    }

    public int getRecommend() {
        return boardRecom;
    }

    public void setRecommend(int boardRecom) {
        this.boardRecom = boardRecom;
    }

    public int getCount() {
        return boardCnt;
    }

    public void setCount(int boardCnt) {
        this.boardCnt = boardCnt;
    }

    public int getCommentCount() {
        return commentCnt;
    }

    public void setCommentCount(int commentCnt) {
        this.commentCnt = commentCnt;
    }

}
