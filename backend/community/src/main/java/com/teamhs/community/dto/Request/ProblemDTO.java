package com.teamhs.community.dto.Request;

import lombok.Data;

import java.time.LocalDate;

@Data
public class ProblemDTO {
    private Long problemId;
    private String userId;
    private Integer cateId;
    private Integer problemPoint;
    private LocalDate problemDate;
    private Integer problemType;
    private String problemTitle;
    private String problemContent;
    private Integer problemRecom;
    private Integer problemCnt;
    private Integer answerCnt;
    private Integer submitCnt;
    private Integer totalPages; //총 페이지 수
    private Integer currentPage; //현재 페이지 번호
    private Long totalElements; //전체 게시물 수

}
