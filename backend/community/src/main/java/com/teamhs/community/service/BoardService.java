package com.teamhs.community.service;

import com.teamhs.community.domain.Board;
import com.teamhs.community.dto.Request.WriteBoardRequestDTO;
import com.teamhs.community.repository.BoardRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;

@Service
public class BoardService {

    @Autowired
    private BoardRepository boardRepository;

    public Board postBoard(WriteBoardRequestDTO requestDTO) {
        Board newBoard = new Board();

        newBoard.setUser_id("임시 아이디");
        newBoard.setC_title(requestDTO.getTitle());
        newBoard.setC_content(requestDTO.getContent());
        newBoard.setC_date(LocalDate.now());
        newBoard.setC_recom(0);
        newBoard.setC_cnt(0);
        newBoard.setCm_cnt(0);

        return boardRepository.save(newBoard);
    }

    // list all boards
    public List<Board> listAllBoards() {
        return boardRepository.findAll();
    }
}