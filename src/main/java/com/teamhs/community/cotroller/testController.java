package com.teamhs.community.cotroller;

import org.springframework.boot.web.servlet.error.ErrorController;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class testController {

    @GetMapping("/api/juju-ya")
    public String test() {
        return "로그인 페이지 제목입니다!!!.";
    }
}