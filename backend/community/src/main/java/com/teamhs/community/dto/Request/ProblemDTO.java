package com.teamhs.community.dto.Request;

import lombok.Data;

import java.time.LocalDate;

@Data
public class ProblemDTO {
    private Integer problemId;
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

}
