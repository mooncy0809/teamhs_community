package com.teamhs.community.controller;

import com.teamhs.community.domain.Board;
import com.teamhs.community.dto.Request.BoardDTO;
import com.teamhs.community.service.BoardService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

/*
게시판
1. 글 쓰기 (/board/write) ㅇ
2. 글 목록 (/board/list) ㅇ
3. 글 조회 (/board/{c_id}) ㅇ
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

    /*
    @GetMapping("/list")
    public ResponseEntity<List<Board>> getAllBoards() {
        List<Board> boards = boardService.listAllBoards();
        return new ResponseEntity<>(boards, HttpStatus.OK);
    }*/

    //글 목록 + 페이징 처리 추가(글 갯수 더 조회하고 싶으면 defaultValue 수정)
    @GetMapping("/list")
    public ResponseEntity<Page<Board>> getPaginatedBoards(@RequestParam(defaultValue = "0") int page,
                                                          @RequestParam(defaultValue = "15") int size) {
        Pageable pageable = PageRequest.of(page, size);
        Page<Board> boards = boardService.listPaginatedBoards(pageable);
        return new ResponseEntity<>(boards, HttpStatus.OK);
    }

    @PostMapping("/write")
    public ResponseEntity<Board> createBoard(@RequestBody BoardDTO board) {
        Board createdBoard = boardService.postBoard(board);
        return new ResponseEntity<>(createdBoard, HttpStatus.CREATED);
    }

    @GetMapping("/{board_id}")
    public ResponseEntity<Board> getBoardById(@PathVariable Long board_id) {
        Board board = boardService.getBoardById(board_id);
        return ResponseEntity.ok(board);
    }
}
