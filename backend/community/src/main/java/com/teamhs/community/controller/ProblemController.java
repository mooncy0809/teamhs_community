package com.teamhs.community.controller;

import com.teamhs.community.domain.Problem;
import com.teamhs.community.service.ProblemService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;
@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/api")
public class ProblemController {
    @Autowired
    private ProblemService problemService;

    //create problem board rest api
    @PostMapping("/problems/write")
    public Problem createProblem(@RequestBody Problem problem){
        return problemService.createProblem(problem);
    }

    //list all problems
    @GetMapping("/problems")
    public List<Problem> listAllProblems(){
        return problemService.listAllProblems();
    }

    //get problem board by id
    @GetMapping("/problems/{id}")
    public ResponseEntity<Problem> getProblemById(@PathVariable Integer id){
        return problemService.getProblemById(id);
    }

    //update problem board
    @PutMapping("/problems/{id}")
    public ResponseEntity<Problem> updateProblem(@PathVariable Integer id, @RequestBody Problem problemDetails){
        return problemService.updateProblem(id,problemDetails);
    }

    //delete problem board
    @DeleteMapping("/problems/{id}")
    public ResponseEntity<Map<String, Boolean>> deleteProblem(@PathVariable Integer id){
        return problemService.deleteProblem(id);
    }

}
