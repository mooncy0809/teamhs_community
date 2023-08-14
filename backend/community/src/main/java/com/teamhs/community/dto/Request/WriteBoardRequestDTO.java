package com.teamhs.community.dto.Request;

import java.time.LocalDate;

public class WriteBoardRequestDTO {

    private int c_id;
    private String user_id;
    private int cate_id;
    private String c_title;
    private String c_content;
    private LocalDate c_date;
    private int c_recom;
    private int c_cnt;
    private int cm_cnt;

    public String getId() {
        return user_id;
    }

    public void setId(String user_id) {
        this.user_id = user_id;
    }

    public int getBoardId() {
        return c_id;
    }
    public void setBoardId(int c_id) {
        this.c_id = c_id;
    }

    public String getTitle() {
        return c_title;
    }

    public void setTitle(String c_title) {
        this.c_title = c_title;
    }

    public String getContent() {
        return c_content;
    }

    public void setContent(String c_content) {
        this.c_content = c_content;
    }

    public int getCategoryId () {
        return cate_id;
    }

    public void setCategoryId(int cate_id) {
        this.cate_id = cate_id;
    }

    public LocalDate getCDate() {
        return c_date;
    }

    public void setCDate(LocalDate c_date) {
        this.c_date = c_date;
    }


    public int getRecommend() {
        return c_recom;
    }

    public void setRecommend(int c_recom) {
        this.c_recom = c_recom;
    }

    public int getCount() {
        return c_cnt;
    }

    public void setCount(int c_cnt) {
        this.c_cnt = c_cnt;
    }

    public int getCommentCount() {
        return cm_cnt;
    }

    public void setCommentCount(int cm_cnt) {
        this.cm_cnt = cm_cnt;
    }


}
