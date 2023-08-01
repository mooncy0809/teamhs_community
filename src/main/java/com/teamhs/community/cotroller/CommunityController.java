package com.teamhs.community.cotroller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ResponseBody;

/*
@Controller
public class CommunityController {
    @GetMapping("/api/backdata")
    @ResponseBody
    public String main(){
        return "백엔드 데이터를 불러왔습니다.";
    }
}
*/


import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class CommunityController {

    @GetMapping("/api/teamhs")
    public String test() {
        return "백엔드 데이터로 샘플 제목 띄우기 테스트";
    }
}