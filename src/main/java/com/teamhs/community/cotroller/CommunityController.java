package com.teamhs.community.cotroller;

import org.springframework.boot.web.servlet.error.ErrorController;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class CommunityController{
    @GetMapping({"/api/teamhs"})
    public String test() {
        return "조영호 돼지새끼..맨날 먹김나하고..";
    }

}
