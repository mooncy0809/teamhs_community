package com.teamhs.community.service;

import com.teamhs.community.domain.Board;
import com.teamhs.community.repository.BoardRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.RequestBody;

import java.util.List;

@Service
public class BoardService {

    @Autowired
    private BoardRepository boardRepository;

    // create board rest api
    public Board createBoard(@RequestBody Board board) {
        return boardRepository.save(board);
    }

    // list all boards
    public List<Board> listAllBoards() {
        return boardRepository.findAll();
    }
}








