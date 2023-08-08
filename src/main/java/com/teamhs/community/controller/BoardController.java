package com.teamhs.community.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class BoardController {

    @GetMapping("/board/list")
    public String boardList() {
        return "boardlist";
    }


    @GetMapping({"/api/teamhs"})
    public String test() {
        return "조영호 돼지새끼..맨날 먹김나하고..";
    }

    @GetMapping("/api/juju-ya")
    public String test2() {
        return "로그인 페이지 제목입니다!!!.";
    }

}
