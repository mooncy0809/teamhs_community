package com.teamhs.community.controller;

import com.teamhs.community.domain.Board;
import com.teamhs.community.dto.Request.BoardDTO;
import com.teamhs.community.service.BoardService;
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


    @PostMapping("/write")
    public ResponseEntity<Board> createBoard(@RequestBody BoardDTO board) {
        Board createdBoard = boardService.postBoard(board);
        return new ResponseEntity<>(createdBoard, HttpStatus.CREATED);
    }

    @GetMapping("/list")
    public ResponseEntity<List<Board>> getAllBoards() {
        List<Board> boards = boardService.listAllBoards();
        return new ResponseEntity<>(boards, HttpStatus.OK);
    }

    @GetMapping("/{c_id}")
    public ResponseEntity<Board> getBoardById(@PathVariable Long c_id) {
        Board board = boardService.getBoardById(c_id);
        return ResponseEntity.ok(board);
    }



}
