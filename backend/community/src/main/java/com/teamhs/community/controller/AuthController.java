package com.teamhs.community.controller;

import com.teamhs.community.dto.ResponseDto;
import com.teamhs.community.dto.SignUpDto;
import org.springframework.web.bind.annotation.*;


@RestController
@RequestMapping("/api/auth")
public class AuthController {
    @PostMapping("/signUp")
    public ResponseDto<?> signUp(@RequestBody SignUpDto requestBody) {
        System.out.println(requestBody.toString());
        return null;
    }
}
