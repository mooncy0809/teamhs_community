package com.teamhs.community.dto.Request;

import lombok.Getter;

import java.time.LocalDate;

public class BoardDTO {
    private int boardId;
    @Getter
    private String userId;
    private int cateId;
    private String boardTitle;
    private String boardContent;
    private LocalDate boardDate;
    private int viewCnt;
    private int likeCnt;

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

    public int getViewCnt() {
        return viewCnt;
    }

    public void setViewCnt(int viewCnt) {
        this.viewCnt = viewCnt;
    }

    public int getLikeCnt() {
        return likeCnt;
    }

    public void setLikeCnt(int likeCnt) {
        this.likeCnt = likeCnt;
    }

}
