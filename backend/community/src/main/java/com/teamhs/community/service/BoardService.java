package com.teamhs.community.service;

import com.teamhs.community.domain.Board;
import com.teamhs.community.dto.Request.WriteBoardRequestDTO;
import com.teamhs.community.repository.BoardRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.RequestBody;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;

@Service
public class BoardService {

    @Autowired
    private BoardRepository boardRepository;

    public Board postBoard(WriteBoardRequestDTO requestDTO) {
        Board newBoard = new Board();

        newBoard.setUser_id("임시 아이디"); // 사용자 아이디 설정
        newBoard.setC_title(requestDTO.getTitle()); // 글 제목 설정
        newBoard.setC_content(requestDTO.getContent()); // 글 내용 설정
        newBoard.setC_date(LocalDate.now()); // 등록 날짜 설정
        newBoard.setC_recom(0); // 추천 수 초기화
        newBoard.setC_cnt(0); // 조회 수 초기화
        newBoard.setCm_cnt(0); // 댓글 수 초기화

        return boardRepository.save(newBoard);
    }

    // list all boards
    public List<Board> listAllBoards() {
        return boardRepository.findAll();
    }
}