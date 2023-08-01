package com.teamhs.community.cotroller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class testController {

    @GetMapping("/api/juyeong-ya")
    public String test() {
        return "영호야, 로그인 페이지 제목 리턴이야.";
    }
}