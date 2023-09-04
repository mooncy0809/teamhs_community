package com.teamhs.community.service;

import com.teamhs.community.domain.Problem;
import com.teamhs.community.domain.Reply;
import com.teamhs.community.dto.Request.ReplyDTO;
import com.teamhs.community.repository.ProblemRepository;
import com.teamhs.community.repository.ReplyRepository;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.PathVariable;

import java.time.LocalDate;
import java.util.Optional;

@Service
public class ReplyService {
    private final ReplyRepository replyRepository;
    private final ProblemRepository problemRepository;

    @Autowired
    public ReplyService(ReplyRepository replyRepository, ProblemRepository problemRepository) {
        this.replyRepository = replyRepository;
        this.problemRepository = problemRepository;
    }

    public ReplyDTO createReply(Long problemId, ReplyDTO replyDTO){
        Problem problem = problemRepository.getById(problemId);

        if (problem == null){
            throw new RuntimeException("Problem not found with id: " + problemId);
        }

        Reply reply = new Reply();
        reply.setProblem(problem);
        // reply.setUserId(replyDTO.getUserId());
        reply.setUserId("admin1");
        reply.setReplyContent(replyDTO.getReplyContent());
        reply.setReplyDate(LocalDate.now());
        reply.setReplyState(false);

        Reply savedReply = replyRepository.save(reply);

        return convertToDTO(savedReply);
    }

    public ReplyDTO getReplyById(Long replyId) {
        Optional<Reply> optionalReply = replyRepository.findById(replyId);
        if (optionalReply.isPresent()) {
            return convertToDTO(optionalReply.get());
        }
        return null;
    }

    public ReplyDTO updateReply(@PathVariable Long replyId, ReplyDTO replyDTO) {
        Optional<Reply> optionalReply = replyRepository.findById(replyId);
        if (optionalReply.isPresent()) {
            Reply reply = optionalReply.get();
            BeanUtils.copyProperties(replyDTO, reply);
            Reply updateReply = replyRepository.save(reply);
            return convertToDTO(updateReply);
        }
        return null;
    }

    public void deleteReply(Long replyId) {
        replyRepository.deleteById(replyId);
    }

    //답변 전체목록
    public Page<ReplyDTO> getRepliesPage(Pageable pageable) {
        Page<Reply> page = replyRepository.findAll(pageable);
        return page.map(this::convertToDTO);
    }

    //problemId에 해당하는 답변목록
    public Page<ReplyDTO> getRepliesByProblem(Long problemId, Pageable pageable) {
        Problem problem = problemRepository.getById(problemId);

        if (problem == null) {
            throw new RuntimeException("Problem not found with id: " + problemId);
        }

        Page<Reply> page = replyRepository.findByProblem(problem, pageable);
        return page.map(this::convertToDTO);
    }

    private ReplyDTO convertToDTO(Reply reply) {
        ReplyDTO replyDTO = new ReplyDTO();
        BeanUtils.copyProperties(reply, replyDTO);
        replyDTO.setProblemId(reply.getProblem().getProblemId()); // problemId 설정
        return replyDTO;
    }


}
