package com.teamhs.community.service;


import com.teamhs.community.domain.Board;
import com.teamhs.community.dto.Request.BoardDTO;
import com.teamhs.community.exception.ResourceNotFoundException;
import com.teamhs.community.repository.BoardRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;

@Service
public class BoardService {

    @Autowired
    private BoardRepository boardRepository;


    /*
    //자유 게시판 리스트 조회
    public List<Board> listAllBoards() {
        return boardRepository.findAll();
    }*/

    //자유 게시판 리스트 조회 페이징 작업 추가
    public Page<Board> listPaginatedBoards(Pageable pageable) {
        return boardRepository.findAll(pageable);
    }

    //자유게시판 작성
    public Board postBoard(BoardDTO board) {
        Board newBoard = new Board();
        newBoard.setUser_id("임시 아이디");
        newBoard.setC_title(board.getTitle());
        newBoard.setC_content(board.getContent());
        newBoard.setC_date(LocalDate.now());
        newBoard.setC_recom(0);
        newBoard.setC_cnt(0);
        newBoard.setCm_cnt(0);

        return boardRepository.save(newBoard);
    }

    //게시판 상세 조회
    public Board getBoardById(Long c_id) {
        return boardRepository.findById(c_id)
                .orElseThrow(() -> new ResourceNotFoundException("Board not found with id: " + c_id));
    }

}

