package com.teamhs.community.service;

import com.teamhs.community.domain.Problem;
import com.teamhs.community.domain.Reply;
import com.teamhs.community.dto.Request.ReplyDTO;
import com.teamhs.community.repository.ProblemRepository;
import com.teamhs.community.repository.ReplyRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

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
        reply.setUserId(replyDTO.getUserId());
        reply.setReplyContent(replyDTO.getReplyContent());
        reply.setReplyDate(LocalDate.now());
        reply.setReplyState(false);

        Reply savedReply = replyRepository.save(reply);

        return convertToDTO(savedReply);
    }

    public List<ReplyDTO> getAllReplies() {
        List<Reply> replies = replyRepository.findAll();
        return replies.stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }

    public ReplyDTO getReplyById(Long replyId) {
        Optional<Reply> optionalReply = replyRepository.findById(replyId);
        if (optionalReply.isPresent()) {
            return convertToDTO(optionalReply.get());
        }
        return null;
    }
    private ReplyDTO convertToDTO(Reply reply) {
        ReplyDTO replyDTO = new ReplyDTO();
        replyDTO.setReplyId(reply.getReplyId());
        replyDTO.setProblemId(reply.getProblem().getProblemId());
        replyDTO.setUserId(reply.getUserId());
        replyDTO.setReplyContent(reply.getReplyContent());
        replyDTO.setReplyDate(reply.getReplyDate());
        replyDTO.setReplyState(reply.getReplyState());
        return replyDTO;
    }
}
