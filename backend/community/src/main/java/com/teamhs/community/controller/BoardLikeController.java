package com.teamhs.community.controller;

import com.teamhs.community.service.BoardLikeService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
@RequestMapping("/like")
public class BoardLikeController {

    private final BoardLikeService boardLikeService;

    @PostMapping("/click/{boardId}/{userId}")
    public ResponseEntity<Boolean> clickLike(@PathVariable Long boardId, @PathVariable String userId) {
        boolean success = boardLikeService.clickLike(userId, boardId);
        if (success) {
            return ResponseEntity.ok(true);
        } else {
            return ResponseEntity.badRequest().body(false);
        }
    }

    @DeleteMapping("/cancel/{boardId}/{userId}")
    public ResponseEntity<Boolean> cancelLike(@PathVariable Long boardId, @PathVariable String userId) {
        boolean success = boardLikeService.cancelLike(userId, boardId);
        if (success) {
            return ResponseEntity.ok(true);
        } else {
            return ResponseEntity.badRequest().body(false);
        }
    }

}