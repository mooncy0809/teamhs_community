package com.teamhs.community.controller;

import com.teamhs.community.dto.Request.ReplyDTO;
import com.teamhs.community.service.ReplyService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;


@RestController
@RequestMapping("/api/replies")
public class ReplyController {
    private final ReplyService replyService;

    @Autowired
    public ReplyController(ReplyService replyService){
        this.replyService = replyService;
    }

    @PostMapping("/write/{problemId}")
    public ResponseEntity<ReplyDTO> createReply(@PathVariable Long problemId, @RequestBody ReplyDTO replyDTO){
        ReplyDTO createReply = replyService.createReply(problemId, replyDTO);
        return new ResponseEntity<>(createReply, HttpStatus.CREATED);
    }
    @GetMapping
    public ResponseEntity<Page<ReplyDTO>> getProblems(Pageable pageable) {
        Page<ReplyDTO> repiesPage = replyService.getRepliesPage(pageable);
        return ResponseEntity.ok(repiesPage);
    }

    @GetMapping("/problem/{problemId}")
    public ResponseEntity<Page<ReplyDTO>> getRepliesByProblem(@PathVariable Long problemId, Pageable pageable) {
        Page<ReplyDTO> repliesPage = replyService.getRepliesByProblem(problemId, pageable);
        return ResponseEntity.ok(repliesPage);
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

    @PutMapping("/{replyId}")
    public ResponseEntity<ReplyDTO> updateReply(@PathVariable Long replyId, @RequestBody ReplyDTO replyDTO) {
        ReplyDTO updateReply = replyService.updateReply(replyId,replyDTO);
        if (updateReply != null) {
            return new ResponseEntity<>(updateReply, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    //delete
    @DeleteMapping("/{replyId}")
    public ResponseEntity<Void> deleteReply(@PathVariable Long replyId) {
        replyService.deleteReply(replyId);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }
}
