package com.teamhs.community.controller;

import com.teamhs.community.domain.Recomment;
import com.teamhs.community.dto.Request.RecommentDTO;
import com.teamhs.community.service.RecommentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/recomment")
public class RecommentController {
    @Autowired
    private RecommentService recommentService;

    @PostMapping("/write")
    public ResponseEntity<Recomment> createComment(@RequestBody RecommentDTO recommentDTO) {
        Recomment createdComment = recommentService.postReComment(recommentDTO);
        return new ResponseEntity<>(createdComment, HttpStatus.CREATED);
    }

    @GetMapping("/list/{comment_id}")
    public ResponseEntity<List<Recomment>> getReCommentsByBoardId(@PathVariable Long commentId) {
        List<Recomment> getcomments = recommentService.getReCommentsByCommentId(commentId);
        return new ResponseEntity<>(getcomments, HttpStatus.OK);
    }

    @DeleteMapping("/delete/{recomment_id}")
    public ResponseEntity<String> deleteReComment(@PathVariable Long comment_id) {
        boolean success = recommentService.deleteReComment(comment_id);
        if (success) {
            return ResponseEntity.ok("대댓글이 삭제되었습니다.");
        } else {
            return ResponseEntity.badRequest().body("대댓글 삭제에 실패하였습니다.");
        }
    }

    @PutMapping("/update/{recomment_id}")
    public ResponseEntity<String> updateReComment(@PathVariable Long comment_id, @RequestBody RecommentDTO updatedReCommentDTO) {
        boolean success = recommentService.updateReComment(comment_id, updatedReCommentDTO);
        if (success) {
            return ResponseEntity.ok("대댓글이 수정되었습니다.");
        } else {
            return ResponseEntity.badRequest().body("대댓글 수정에 실패하였습니다.");
        }
    }

}