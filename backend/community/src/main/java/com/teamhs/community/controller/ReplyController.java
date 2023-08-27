package com.teamhs.community.controller;

import com.teamhs.community.dto.Request.ReplyDTO;
import com.teamhs.community.service.ReplyService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/replies")
public class ReplyController {
    private final ReplyService replyService;

    @Autowired
    public ReplyController(ReplyService replyService){
        this.replyService = replyService;
    }

    @PostMapping("/create/{problemId}")
    public ResponseEntity<ReplyDTO> createReply(@PathVariable Long problemId, @RequestBody ReplyDTO replyDTO){
        ReplyDTO createReply = replyService.createReply(problemId, replyDTO);
        return new ResponseEntity<>(createReply, HttpStatus.CREATED);
    }

    @GetMapping
    public ResponseEntity<List<ReplyDTO>> getAllReplies() {
        List<ReplyDTO> replies = replyService.getAllReplies();
        return ResponseEntity.ok(replies);
    }

    @GetMapping("/{replyId}")
    public ResponseEntity<ReplyDTO> getReplyById(@PathVariable Long replyId){
        ReplyDTO reply = replyService.getReplyById(replyId);
        if (reply != null){
            return  ResponseEntity.ok(reply);
        }else {
            return ResponseEntity.notFound().build();
        }
    }
}
