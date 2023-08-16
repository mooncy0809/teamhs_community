package com.teamhs.community.service;

import com.teamhs.community.domain.Problem;
import com.teamhs.community.dto.Request.ProblemDTO;
import com.teamhs.community.exception.ResourceNotFoundException;
import com.teamhs.community.repository.ProblemRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Service
public class ProblemService {
    @Autowired
    private ProblemRepository problemRepository;

    //create problem board rest api
    public Problem createProblem(@RequestBody Problem problem){
        return problemRepository.save(problem);
    }

    //list all boards
    public List<ProblemDTO> getAllBoards() {
        List<Problem> problem = problemRepository.findAll();
        return problem.stream()
                .map(this::convertoDTO)
                .collect(Collectors.toList());
    }

    //get problem board by id
    public ResponseEntity<Problem> getProblemById(@PathVariable Integer id){
        Problem problem = problemRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Board not exist with id : " + id));
        int cnt = problem.getViewCnt();
        problem.setViewCnt(cnt + 1);
        return ResponseEntity.ok(problem); //ResponseEntity.ok : 모든 로직이 성공하고 나서 Controller로 정상적인 응답이 반환되었을 때 클라이언트로 반환되는 응답코드.
    }

    //update problem board
    public ResponseEntity<Problem> updateProblem(@PathVariable Integer id, @RequestBody Problem problemDetails){
        Problem problem = problemRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Board not exist with id : " + id));
        problem.setTitle(problemDetails.getTitle());
        problem.setContent(problemDetails.getContent());

        Problem updateProblem = problemRepository.save(problem);
        return ResponseEntity.ok(updateProblem);
    }

    //delete problem board
    public ResponseEntity<Map<String,Boolean>> deleteProblem(@PathVariable Integer id) {
        Problem problem = problemRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Board not exist with id : " + id));
        problemRepository.delete(problem);
        Map<String, Boolean> response = new HashMap<>();
        response.put("deleted", Boolean.TRUE);
        return ResponseEntity.ok(response);
    }

}