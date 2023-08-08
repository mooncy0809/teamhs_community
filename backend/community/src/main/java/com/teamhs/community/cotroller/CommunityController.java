package com.teamhs.community.cotroller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class CommunityController {

    public String main() {
        return "Hello TeamHS!!!!!!!";
    }

}
