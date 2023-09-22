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
    public ResponseEntity<Recomment> createReComment(@RequestBody RecommentDTO recommentDTO) {
        Recomment createdComment = recommentService.postReComment(recommentDTO);
        return new ResponseEntity<>(createdComment, HttpStatus.CREATED);
    }

    @GetMapping("/list/{commentId}")
    public ResponseEntity<List<Recomment>> getReCommentsByBoardId(@PathVariable Long commentId) {
        List<Recomment> getrecomments = recommentService.getReCommentsByCommentId(commentId);
        return new ResponseEntity<>(getrecomments, HttpStatus.OK);
    }

    @DeleteMapping("/delete/{recommentId}")
    public ResponseEntity<String> deleteReComment(@PathVariable Long recommentId) {
        boolean success = recommentService.deleteReComment(recommentId);
        if (success) {
            return ResponseEntity.ok("답글이 삭제되었습니다.");
        } else {
            return ResponseEntity.badRequest().body("답글 삭제에 실패하였습니다.");
        }
    }

    @PutMapping("/update/{recommentId}")
    public ResponseEntity<String> updateReComment(@PathVariable Long recommentId, @RequestBody RecommentDTO updatedReCommentDTO) {
        boolean success = recommentService.updateReComment(recommentId, updatedReCommentDTO);
        if (success) {
            return ResponseEntity.ok("답글이 수정되었습니다.");
        } else {
            return ResponseEntity.badRequest().body("답글 수정에 실패하였습니다.");
        }
    }

}