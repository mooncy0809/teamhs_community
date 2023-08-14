package com.teamhs.community.controller;

import com.teamhs.community.domain.Board;
import com.teamhs.community.dto.Request.WriteBoardRequestDTO;
import com.teamhs.community.service.BoardService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
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

    private static final Logger logger = LoggerFactory.getLogger(BoardController.class);


    @PostMapping("/write")
    public ResponseEntity<Board> createBoard(@RequestBody WriteBoardRequestDTO board) {
        Board createdBoard = boardService.postBoard(board);
        logger.info(board.toString());
        return new ResponseEntity<>(createdBoard, HttpStatus.CREATED);
    }

    @GetMapping("/list")
    public ResponseEntity<List<Board>> getAllBoards() {
        List<Board> boards = boardService.listAllBoards();
        return new ResponseEntity<>(boards, HttpStatus.OK);
    }

}
