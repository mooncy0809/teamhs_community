package com.teamhs.community.cotroller;

import org.springframework.boot.web.servlet.error.ErrorController;
import org.springframework.web.bind.annotation.GetMapping;

public class TeamhsErrorController implements ErrorController {
    @GetMapping("/error")
    public String index() {
        return "index.html";
    }
}
