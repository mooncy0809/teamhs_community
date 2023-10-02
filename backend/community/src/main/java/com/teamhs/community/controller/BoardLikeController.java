package com.teamhs.community.controller;

import com.teamhs.community.service.BoardLikeService;
import com.teamhs.community.service.BoardService;
import io.swagger.annotations.ApiOperation;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequiredArgsConstructor
@RequestMapping("/like")
public class BoardLikeController {

    @Autowired
    private BoardService boardService;
    @Autowired
    private BoardLikeService boardLikeService;

    @PostMapping("/{boardId}/{userId}")
    @ApiOperation(value="BoardLike", notes="게시글 좋아요")
    public ResponseEntity<?> likeBoard(@PathVariable ("boardId") Long boardId, @PathVariable("userId") String userId) {
        // 사용자가 이미 좋아요를 눌렀는지 확인
        boolean alreadyLiked = boardLikeService.checkIfUserLikedBoard(userId, boardId);

        if (alreadyLiked) {
            // 이미 좋아요를 눌렀다면 좋아요 취소
            boardLikeService.unlikeBoard(userId, boardId);
            return ResponseEntity.ok(Map.of("success", true, "message", "좋아요를 취소했습니다."));
        } else {
            // 좋아요 추가
            boardLikeService.likeBoard(userId, boardId);
            return ResponseEntity.ok(Map.of("success", true, "message", "좋아요를 눌렀습니다."));
        }
    }

    @GetMapping("/check/{boardId}/{userId}")
    @ApiOperation(value="BoardLikeCheck", notes="좋아요 여부 확인")
    public boolean checkLike(@PathVariable ("boardId") Long boardId, @PathVariable("userId") String userId) {
        // 사용자가 이미 좋아요를 눌렀는지 확인
        boolean alreadyLiked = boardLikeService.checkIfUserLikedBoard(userId, boardId);
        return alreadyLiked;
    }


}