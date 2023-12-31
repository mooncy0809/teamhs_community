package com.teamhs.community.controller;

import com.teamhs.community.domain.Board;
import com.teamhs.community.dto.Request.BoardDTO;
import com.teamhs.community.service.BoardLikeService;
import com.teamhs.community.service.BoardService;
import com.teamhs.community.service.ImageUploadService;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import lombok.extern.java.Log;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.io.Console;


@RestController
@RequestMapping("/board")
@Api(tags = "Board 컨트롤러", description = "게시글 관련 API 명세서")
public class BoardController {

    @Autowired
    private BoardService boardService;

    //글 목록 + 페이징 처리 추가(글 갯수 더 조회하고 싶으면 defaultValue 수정)
    @GetMapping("/list")
    @ApiOperation(value="BoardList", notes="커뮤니티 조회")
    public ResponseEntity<Page<Board>> getPaginatedBoardsByCateId(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "15") int size,
            @RequestParam Long cateId, // 카테고리 ID를 받아옴
            @RequestParam(defaultValue = "all") String sCate, // 검색 카테고리
            @RequestParam(defaultValue = "") String sText // 검색 텍스트
    ) {
        // 정렬 정보 설정: 내림차순으로 정렬하도록 변경
        Pageable pageable = PageRequest.of(page, size, Sort.by("boardId").descending());


        Page<Board> boards;

        if (cateId == 2 && sText.isEmpty() && "all".equals(sCate)) {
            //전체 게시글 조회
            boards = boardService.listPaginateGBoards(pageable);
        } else if(cateId != 2 && sText.isEmpty() && "all".equals(sCate)){
            // 카테고리 ID가 주어진 경우 해당 카테고리에 속하는 게시글만 조회
            boards = boardService.listPaginatedBoardsByCateId(cateId, pageable);
        }else{// 만약 검색어와 검색 카테고리가 주어진 경우, 검색을 수행
            boards = boardService.searchBoards(cateId, sCate, sText, pageable);
        }

        return new ResponseEntity<>(boards, HttpStatus.OK);
    }

    @PostMapping("/write")
    @ApiOperation(value="BoardWrite", notes="게시글 작성")
    public ResponseEntity<Board> createBoard(@RequestBody BoardDTO board) {
        Board createdBoard = boardService.postBoard(board);
        return new ResponseEntity<>(createdBoard, HttpStatus.CREATED);
    }

    @GetMapping("/{boardId}")
    @ApiOperation(value="BoardDetail", notes="게시글 상세 조회")
    public ResponseEntity<Board> getBoardById(@PathVariable Long boardId) {
        Board board = boardService.getBoardById(boardId);
        return ResponseEntity.ok(board);
    }

    @DeleteMapping("/delete/{boardId}")
    @ApiOperation(value="BoardDelete", notes="게시글 삭제")
    public ResponseEntity<String> deleteBoard(@PathVariable Long boardId) {
        boolean success = boardService.deleteBoard(boardId);
        if (success) {
            return ResponseEntity.ok("게시글이 삭제되었습니다.");
        } else {
            return ResponseEntity.badRequest().body("게시글 삭제에 실패하였습니다.");
        }
    }

    @PutMapping("/update/{boardId}/{userId}")
    @ApiOperation(value="BoardUpdate", notes="게시글 수정")
    public ResponseEntity<String> updateBoard(@PathVariable Long boardId,@PathVariable String userId, @RequestBody BoardDTO updatedBoardDTO) {
        boolean success = boardService.updateBoard(boardId, userId, updatedBoardDTO);
        if (success) {
            return ResponseEntity.ok("게시글이 수정되었습니다.");
        } else {
            return ResponseEntity.badRequest().body("게시글 수정에 실패하였습니다.");
        }
    }
}
