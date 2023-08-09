package com.teamhs.community.dto.Request;

import java.sql.Date;

public class BoardListRequestDTO {
    private int c_id;
    private String user_id;
    private int cate_id;
    private String c_title;
    private String c_content;
    private Date c_date;
    private int c_recom;
    private int c_cnt;
    private int cm_cnt;

    public BoardListRequestDTO(){
        super();
    }



}
