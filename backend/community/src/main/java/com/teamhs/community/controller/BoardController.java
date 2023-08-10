package com.teamhs.community.controller;

import ch.qos.logback.core.model.Model;
import com.teamhs.community.dto.Request.WriteBoardRequestDTO;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

/*
게시판
1. /board/write : 게시글 작성
2. /board/list : 게시글 리스트 조회
3. /board/detail/{c_id} : 게시글 상세 조회
4. /board/delete/{c_id} : 게시글 삭제
5. /board/update/{c_id} : 게시글 수정
 */



@Controller
public class BoardController {

    @PostMapping("/board/write")
    public String boardWrite(@RequestBody WriteBoardRequestDTO requestDTO){
        return "boardwrite";
    }

    @GetMapping("/board/list")
    public String boardList(Model model) {

        return "boardlist";
    }



    @GetMapping("/board/detail")
    public String boardDetail() {
        return "boardlist";
    }

    @GetMapping("/board/update")
    public String boardUpdate() {
        return "boardlist";
    }

    @GetMapping("/board/delete")
    public String boardDelete() {
        return "boardlist";
    }


}
