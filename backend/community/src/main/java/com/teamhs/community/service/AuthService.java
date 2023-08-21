package com.teamhs.community.service;

import com.teamhs.community.config.TokenProvider;
import com.teamhs.community.domain.Member;
import com.teamhs.community.dto.Request.SignInDto;
import com.teamhs.community.dto.ResponseDto;
import com.teamhs.community.dto.Request.SignUpDto;
import com.teamhs.community.dto.SignInResponseDto;
import com.teamhs.community.repository.MemberRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class AuthService {

    @Autowired MemberRepository memberRepository;

    @Autowired TokenProvider tokenProvider;

    public ResponseDto<?> signUp(SignUpDto dto){

        String userId = dto.getUserId();

        Member member = new Member(dto);
        try{
            //중복 확인
            if(memberRepository.existsById(userId))
                return ResponseDto.setFailed("Exist ID!");
            else memberRepository.save(member);
        }catch(Exception error){
            return ResponseDto.setFailed("DB Error!");
        }

        return ResponseDto.setSuccess("SignUp Sucess!", null);
    }

    public ResponseDto<SignInResponseDto> signIn(SignInDto dto){
        String userId = dto.getUserId();
        String userPassword = dto.getUserPassword();

        try{
            boolean existed = memberRepository.existsByUserIdAndUserPassword(userId, userPassword);
            if(!existed) return ResponseDto.setFailed("Sign In Information Does Not Match");
        }catch (Exception error){
            return ResponseDto.setFailed("DB Error!");
        }

        Member member = null;

        try{
            member = memberRepository.findById(userId).get();
        }catch (Exception error){
            return ResponseDto.setFailed("DB Error!");
        }
        member.setUserPassword("");

        String token = tokenProvider.create(userId);
        int exprTime = 3600000;

        SignInResponseDto signInResponseDto = new SignInResponseDto(token, exprTime, member);
        return ResponseDto.setSuccess("Sign In Sucess!", signInResponseDto);

    }
}
