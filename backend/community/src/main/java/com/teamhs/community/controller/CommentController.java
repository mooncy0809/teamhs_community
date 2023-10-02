package com.teamhs.community.controller;

import com.teamhs.community.domain.Comment;
import com.teamhs.community.dto.Request.CommentDTO;
import com.teamhs.community.service.CommentService;
import io.swagger.annotations.ApiOperation;
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
    @ApiOperation(value="CommentWrite", notes="댓글 작성")
    public ResponseEntity<Comment> createComment(@RequestBody CommentDTO commentDTO) {
        Comment createdComment = commentService.postComment(commentDTO);
        return new ResponseEntity<>(createdComment, HttpStatus.CREATED);
    }

    @GetMapping("/list/{boardId}")
    @ApiOperation(value="CommentList", notes="댓글 조회")
    public ResponseEntity<List<Comment>> getCommentsByBoardId(@PathVariable Long boardId) {
        List<Comment> comments = commentService.getCommentsByBoardId(boardId);
        return new ResponseEntity<>(comments, HttpStatus.OK);
    }

    @DeleteMapping("/delete/{commentId}")
    @ApiOperation(value="CommentDelete", notes="댓글 삭제")
    public ResponseEntity<String> deleteComment(@PathVariable Long commentId) {
        boolean success = commentService.deleteComment(commentId);
        if (success) {
            return ResponseEntity.ok("댓글이 삭제되었습니다.");
        } else {
            return ResponseEntity.badRequest().body("댓글 삭제에 실패하였습니다.");
        }
    }

    @PutMapping("/update/{commentId}")
    @ApiOperation(value="CommentUpdate", notes="댓글 수정")
    public ResponseEntity<String> updateComment(@PathVariable Long commentId, @RequestBody CommentDTO updatedCommentDTO) {
        boolean success = commentService.updateComment(commentId, updatedCommentDTO);
        if (success) {
            return ResponseEntity.ok("댓글이 수정되었습니다.");
        } else {
            return ResponseEntity.badRequest().body("댓글 수정에 실패하였습니다.");
        }
    }

}