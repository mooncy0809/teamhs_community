package com.teamhs.community.cotroller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ResponseBody;

@Controller
public class CommunityController {
    @GetMapping("/")
    @ResponseBody

    public String main(){
        return "Hello TeamHS!!!!!!!";
    }
}
