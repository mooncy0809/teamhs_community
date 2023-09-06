package com.teamhs.community.service;

import com.teamhs.community.domain.Answer;
import com.teamhs.community.domain.Problem;
import com.teamhs.community.dto.Request.AnswerDTO;
import com.teamhs.community.repository.AnswerRepository;
import com.teamhs.community.repository.ProblemRepository;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.PathVariable;

import java.util.Optional;

@Service
public class AnswerService {
    private final AnswerRepository answerRepository;
    private final ProblemRepository problemRepository;

    @Autowired
    public AnswerService(AnswerRepository answerRepository, ProblemRepository problemRepository) {
        this.answerRepository = answerRepository;
        this.problemRepository = problemRepository;
    }

    public AnswerDTO createAnswer(Long problemId, AnswerDTO answerDTO) {
        Problem problem = problemRepository.getById(problemId);

        if (problem == null) {
            throw new RuntimeException("Problem not found with id: " + problemId);
        }

        Answer answer = new Answer();
        answer.setProblem(problem);
        answer.setUserId("admin1");
        answer.setAnswer(answerDTO.getAnswer());

        Answer savedAnswer = answerRepository.save(answer);

        return convertToDTO(savedAnswer);
    }

    public AnswerDTO getAnswerById(Long answerId) {
        Optional<Answer> optionalAnswer = answerRepository.findById(answerId);
        if (optionalAnswer.isPresent()) {
            return convertToDTO(optionalAnswer.get());
        }
        return null;
    }

    public AnswerDTO updateAnswer(@PathVariable Long answerId, AnswerDTO answerDTO){
        Optional<Answer> optionalAnswer = answerRepository.findById(answerId);
        if (optionalAnswer.isPresent()){
            Answer answer = optionalAnswer.get();
            BeanUtils.copyProperties(answerDTO, answer);
            Answer updateAnswer = answerRepository.save(answer);
            return convertToDTO(updateAnswer);
        }
        return null;
    }

    public void deleteAnswer(Long answerId) {
        answerRepository.deleteById(answerId);
    }

    public Page<AnswerDTO> getAnswersPage(Pageable pageable){
        Page<Answer> page = answerRepository.findAll(pageable);
        return page.map(this::convertToDTO);
    }

    public Page<AnswerDTO> getAnswersByProblem(Long problemId, Pageable pageable){
        Problem problem = problemRepository.getById(problemId);

        if (problem == null) {
            throw new RuntimeException("Problem not found with id: " + problemId);
        }

        Page<Answer> page = answerRepository.findByProblem(problem,pageable);
        return page.map(this::convertToDTO);
    }

    private AnswerDTO convertToDTO(Answer answer){
        AnswerDTO answerDTO = new AnswerDTO();
        BeanUtils.copyProperties(answer, answerDTO);
        answerDTO.setProblemId(answer.getProblem().getProblemId());
        return  answerDTO;
    }
}
