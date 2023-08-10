package com.teamhs.community.domain;

import jakarta.persistence.Column;
import jakarta.persistence.Id;

import java.sql.Date;

public class Board {
    @Id
    private String user_id;
    @Column(nullable = false)
    private int c_id;
    @Column(nullable = false)
    private int cate_id;
    @Column(nullable = false)
    private String c_title;
    @Column(nullable = false)
    private String c_content;
    @Column(nullable = false)
    private Date c_date;
    @Column(nullable = true)
    private int c_recom;
    @Column(nullable = true)
    private int c_cnt;
    @Column(nullable = true)
    private int cm_cnt;

    public Board(){
    }

    public Board(String user_id, int c_id, int cate_id, String c_title, String c_content, Date c_date, int c_recom, int c_cnt, int cm_cnt){
        super();
        this.user_id = user_id;
        this.c_id = c_id;
        this.cate_id = cate_id;
        this.c_title = c_title;
        this.c_content = c_content;
        this.c_date = c_date;
        this.c_recom = c_recom;
        this.c_cnt = c_cnt;
        this.cm_cnt = cm_cnt;
    }

    public Board(String user_id,String c_title, String c_content){
        super();
        this.user_id = user_id;
        this.c_title = c_title;
        this.c_content = c_content;
    }



}
