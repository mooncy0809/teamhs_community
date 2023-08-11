package com.teamhs.community.controller;

import ch.qos.logback.core.model.Model;
import com.teamhs.community.domain.Board;
import com.teamhs.community.dto.Request.BoardListRequestDTO;
import com.teamhs.community.dto.Request.WriteBoardRequestDTO;
import com.teamhs.community.dto.Response.BoardListResponseDTO;
import com.teamhs.community.service.BoardService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.List;

/*
게시판
1. 글 쓰기 (/board/write)
2. 글 목록 (/board/list)
3. 글 조회 (/board/{c_id})
4. 글 수정 (/board/update/{c_id})
5. 글 삭제 (/board/delete/{c_id})
6. 페이징 처리 (/board/paging)
 */



@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/board")
public class BoardController {

    private final BoardService boardService;

    @Autowired
    public BoardController(BoardService boardService) {
        this.boardService = boardService;
    }

    @PostMapping("/write")
    public ResponseEntity<Board> createBoard(@RequestBody Board boardDTO) {
        Board createdBoard = boardService.createBoard(boardDTO);
        return new ResponseEntity<>(createdBoard, HttpStatus.CREATED);
    }

    @GetMapping("/list")
    public ResponseEntity<List<Board>> getAllBoards() {
        List<Board> boards = boardService.listAllBoards();
        return new ResponseEntity<>(boards, HttpStatus.OK);
    }

}
