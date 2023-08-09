package com.teamhs.community.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class BoardController {

    //게시판 작성
    @GetMapping("/board/write")
    public String boardWrite(){
        return "boardwrite";
    }

    //게시판 리스트 조회
    @GetMapping("/board/list")
    public String boardList() {
        return "boardlist";
    }

    //게시판 상세조회
    @GetMapping("/board/detail")
    public String boardDetail() {
        return "boardlist";
    }

    //게시판 수정
    @GetMapping("/board/update")
    public String boardUpdate() {
        return "boardlist";
    }

    //게시판 삭제
    @GetMapping("/board/delete")
    public String boardDelete() {
        return "boardlist";
    }


}
