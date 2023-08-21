package com.teamhs.community.controller;

import com.teamhs.community.dto.Request.ProblemDTO;
import com.teamhs.community.service.ProblemService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;


@RestController
@RequestMapping("/api/problems")
public class ProblemController {
    private ProblemService problemService;
    @Autowired
    public ProblemController(ProblemService problemService) {
        this.problemService = problemService;
    }

    //create problem board rest api
    @PostMapping("/write")
    public ResponseEntity<ProblemDTO> createProblem(@RequestBody ProblemDTO problemDTO) {
        ProblemDTO createProblem = problemService.createProblem(problemDTO);
        return new ResponseEntity<>(createProblem, HttpStatus.CREATED);
    }

    //list
    @GetMapping
    public ResponseEntity<List<ProblemDTO>> getAllProblems() {
        List<ProblemDTO> problems = problemService.getAllProblems();
        return new ResponseEntity<>(problems, HttpStatus.OK);
    }

    //detail
    @GetMapping("/{id}")
    public ResponseEntity<ProblemDTO> getProblemById(@PathVariable Integer id) {
        ProblemDTO problem = problemService.getProblemById(id);
        if (problem != null) {
            return new ResponseEntity<>(problem, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    //update
    @PutMapping("/{id}")
    public ResponseEntity<ProblemDTO> updateProblem(@PathVariable Integer id, @RequestBody ProblemDTO problemDTO) {
        ProblemDTO updateProblem = problemService.updateProblem(id, problemDTO);
        if (updateProblem != null) {
            return new ResponseEntity<>(updateProblem, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    //delete
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteProblem(@PathVariable Integer id) {
        problemService.deleteProblem(id);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }
}
