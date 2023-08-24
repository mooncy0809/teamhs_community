package com.teamhs.community.controller;

import com.teamhs.community.domain.Comment;
import com.teamhs.community.dto.Request.CommentDTO;
import com.teamhs.community.service.CommentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/comment")
public class CommentController {
    @Autowired
    private CommentService commentService;

    @PostMapping("/write")
    public ResponseEntity<Comment> createComment(@RequestBody CommentDTO commentDTO) {
        Comment createdComment = commentService.postComment(commentDTO);
        return new ResponseEntity<>(createdComment, HttpStatus.CREATED);
    }

    @GetMapping("/list/{boardId}")
    public ResponseEntity<List<Comment>> getCommentsByBoardId(@PathVariable Long boardId) {
        List<Comment> comments = commentService.getCommentsByBoardId(boardId);
        return new ResponseEntity<>(comments, HttpStatus.OK);
    }

    @DeleteMapping("/delete/{comment_id}")
    public ResponseEntity<String> deleteComment(@PathVariable Long comment_id) {
        boolean success = commentService.deleteComment(comment_id);
        if (success) {
            return ResponseEntity.ok("댓글이 삭제되었습니다.");
        } else {
            return ResponseEntity.badRequest().body("댓글 삭제에 실패하였습니다.");
        }
    }





}