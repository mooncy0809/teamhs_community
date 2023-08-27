package com.teamhs.community.service;

import com.teamhs.community.domain.Problem;
import com.teamhs.community.dto.Request.ProblemDTO;
import com.teamhs.community.repository.ProblemRepository;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.PathVariable;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class ProblemService {
    @Autowired
    private ProblemRepository problemRepository;

    //create problem board rest api
    public ProblemDTO createProblem(ProblemDTO problemDTO) {
        Problem problem = convertToEntity(problemDTO);
        Problem savedProblem = problemRepository.save(problem);
        return convertToDTO(savedProblem);
    }

    //list all boards
    public List<ProblemDTO> getAllProblems() {
        List<Problem> problem = problemRepository.findAll();
        return problem.stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }

    //detail
    public ProblemDTO getProblemById(@PathVariable Long problemId) {
        Optional<Problem> optionalProblem = problemRepository.findById(problemId);
        if (optionalProblem.isPresent()) {
            return convertToDTO(optionalProblem.get());
        }
        return null; // or throw an exception
    }

    //update problem board
    public ProblemDTO updateProblem(@PathVariable Long problemId, ProblemDTO problemDTO) {
        Optional<Problem> optionalProblem = problemRepository.findById(problemId); //결과를 Optional로 감싸는 이유는, 찾는 게시물이 없을 수 있기 때문
        if (optionalProblem.isPresent()) { //optionalProblem 값이 존재하는 경우에 실행
            Problem problem = optionalProblem.get(); // 실제 엔티티 객체인 Problem을 가져와서 problem에 저장
            BeanUtils.copyProperties(problemDTO, problem); //problemDTO 객체의 속성들을 problem 객체에 복사
            Problem updateProblem = problemRepository.save(problem); //save는 저장하거나 업데이트하는 메서드
            return convertToDTO(updateProblem); //convertToDTO 메서드를 사용하여 ProblemDTO 변환하고 반환
        }
        return null; //데이터베이스에서 해당 게시물을 찾지 못한 경우에는 null을 반환
    }

    //delete problem board
    public void deleteProblem(Long problemId) {
        problemRepository.deleteById(problemId);
    }

    //list paging
    public Page<ProblemDTO> getProblemsPage(Pageable pageable) {
        Page<Problem> page = problemRepository.findAll(pageable);
        return page.map(this::convertToDTO);
    }

    //엔티티 객체와 DTO 객체 간의 변환을 수행하는 역할
    private ProblemDTO convertToDTO(Problem problem) { //Problem을 ProblemDTO 객체로 변환
        ProblemDTO problemDTO = new ProblemDTO();
        BeanUtils.copyProperties(problem, problemDTO);
//        problemDTO.setUserId(problem.getUser().getId()); //게시물의 작성자(User)의 id 값을 가져와 problemDTO 객체의 userId 속성에 설정
        return problemDTO;
    }

    private Problem convertToEntity(ProblemDTO problemDTO) {
        Problem problem = new Problem();
        BeanUtils.copyProperties(problemDTO, problem);
        problem.setUserId("admin1"); // userId 임시 지정
        problem.setProblemDate(LocalDate.now());
        problem.setCateId(1);
//        problem.setUser(userService.getUserById(problemDTO.getUserId()));
        return problem;
    }
}