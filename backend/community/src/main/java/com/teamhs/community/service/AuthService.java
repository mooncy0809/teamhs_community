package com.teamhs.community.service;

import com.teamhs.community.domain.Member;
import com.teamhs.community.dto.ResponseDto;
import com.teamhs.community.dto.SignUpDto;
import com.teamhs.community.repository.MemberRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class AuthService {

    @Autowired MemberRepository memberRepository;

    public ResponseDto<?> signUp(SignUpDto dto){
        String userId = dto.getUserId();
        try{
            //중복 확인
            if(memberRepository.existsById(userId))
                return ResponseDto.setFailed("Exist ID!");
        }catch(Exception e){
            return ResponseDto.setFailed("DB Error!");
        }
        Member member = new Member(dto);
        try{
            memberRepository.save(member);
        }catch (Exception e){
            return ResponseDto.setFailed("DB Error!");
        }

        return ResponseDto.setSuccess("SignUp Sucess!", null);
    }
}
