package com.teamhs.community.controller;

import com.teamhs.community.dto.Request.AnswerDTO;
import com.teamhs.community.service.AnswerService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/answers")
public class AnswerController {
    private final AnswerService answerService ;

    @Autowired
    public AnswerController(AnswerService answerService){
        this.answerService = answerService;
    }

    @PostMapping("/write/{problemId}")
    public ResponseEntity<AnswerDTO> createAnswer(@PathVariable Long problemId, @RequestBody AnswerDTO answerDTO){
        AnswerDTO createAnswer = answerService.createAnswer(problemId, answerDTO);
        return new ResponseEntity<>(createAnswer, HttpStatus.CREATED);
    }

    @GetMapping
    public ResponseEntity<Page<AnswerDTO>> getProblems(Pageable pageable){
        Page<AnswerDTO> answersPage = answerService.getAnswersPage(pageable);
        return ResponseEntity.ok(answersPage);
    }

    @GetMapping("/problem/{problemId}")
    public ResponseEntity<Page<AnswerDTO>> getAnswersByProblem(@PathVariable Long problemId, Pageable pageable){
        Page<AnswerDTO> answersPage = answerService.getAnswersByProblem(problemId, pageable);
        return ResponseEntity.ok(answersPage);
    }

    @GetMapping("{answerId}")
    public ResponseEntity<AnswerDTO> getAnswerById(@PathVariable Long answerId){
        AnswerDTO answer = answerService.getAnswerById(answerId);
        if (answer != null){
            return ResponseEntity.ok(answer);
        }else {
            return ResponseEntity.notFound().build();
        }
    }

    @PutMapping("/{answerId}")
    public ResponseEntity<AnswerDTO> updateAnswer(@PathVariable Long answerId, @RequestBody AnswerDTO answerDTO){
        AnswerDTO updateAnswer = answerService.updateAnswer(answerId,answerDTO);
        if (updateAnswer != null){
            return new ResponseEntity<>(updateAnswer,HttpStatus.OK);
        }else{
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @DeleteMapping("/{answerId}")
    public ResponseEntity<Void> deleteAnswer(@PathVariable Long answerId){
        answerService.deleteAnswer(answerId);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }
}
