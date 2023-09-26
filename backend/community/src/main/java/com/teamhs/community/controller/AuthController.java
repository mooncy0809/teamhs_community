package com.teamhs.community.controller;

import com.teamhs.community.domain.Member;
import com.teamhs.community.dto.Request.SignInDto;
import com.teamhs.community.dto.ResponseDto;
import com.teamhs.community.dto.SignInResponseDto;
import com.teamhs.community.dto.Request.SignUpDto;
import com.teamhs.community.service.AuthService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;


@RestController
@RequestMapping("/api/auth")
public class AuthController {
    @Autowired AuthService authService;
    @PostMapping("/signUp")
    public ResponseDto<?> signUp(@RequestBody SignUpDto requestBody) {
        ResponseDto<?> result = authService.signUp(requestBody);
        return result;
    }
    @PostMapping("/signIn")
    public ResponseDto<SignInResponseDto> signIn(@RequestBody SignInDto requestBody){
        ResponseDto<SignInResponseDto> result = authService.signIn(requestBody);
        return result;
    }

    @GetMapping("/getUserInfo")
    public Member userInfo(@RequestParam String userId)
    {
        Member member = authService.getUserInfo(userId);
        return member;
    }


}

//axios.post로 rest 방식으로 데이터를 전송하고 PostMapping으로 걸려있는 SignUpDto에서 데이터를 Body에 담아서 가져온다..?