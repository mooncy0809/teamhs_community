package com.teamhs.community.dto.Response;

import java.sql.Date;
import java.time.LocalDate;

public class BoardListResponseDTO {
    private int c_id;
    private String user_id;
    private int cate_id;
    private String c_title;
    private String c_content;
    private LocalDate c_date;
    private int c_recom;
    private int c_cnt;
    private int cm_cnt;

    public BoardListResponseDTO(){
        super();
    }



}
