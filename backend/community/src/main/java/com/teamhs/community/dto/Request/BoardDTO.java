package com.teamhs.community.dto.Request;

import java.time.LocalDate;

public class BoardDTO {

    private int board_id;
    private String user_id;
    private int cate_id;
    private String board_title;
    private String board_content;
    private LocalDate board_date;
    private int board_recom;
    private int board_cnt;
    private int comment_cnt;

    public String getUserId() {
        return user_id;
    }

    public void setUserId(String user_id) {
        this.user_id = user_id;
    }

    public int getBoardId() {
        return board_id;
    }
    public void setBoardId(int board_id) {
        this.board_id = board_id;
    }

    public String getTitle() {
        return board_title;
    }

    public void setTitle(String board_title) {
        this.board_title = board_title;
    }

    public String getContent() {
        return board_content;
    }

    public void setContent(String board_content) {
        this.board_content = board_content;
    }

    public int getCategoryId () {
        return cate_id;
    }

    public void setCategoryId(int cate_id) {
        this.cate_id = cate_id;
    }

    public LocalDate getBoardDate() {
        return board_date;
    }

    public void setBoardDate(LocalDate board_date) {
        this.board_date = board_date;
    }

    public int getRecommend() {
        return board_recom;
    }

    public void setRecommend(int c_recom) {
        this.board_recom = c_recom;
    }

    public int getCount() {
        return board_cnt;
    }

    public void setCount(int board_cnt) {
        this.board_cnt = board_cnt;
    }

    public int getCommentCount() {
        return comment_cnt;
    }

    public void setCommentCount(int comment_cnt) {
        this.comment_cnt = comment_cnt;
    }

}
