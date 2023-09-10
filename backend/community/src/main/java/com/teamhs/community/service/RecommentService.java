package com.teamhs.community.service;

import com.teamhs.community.domain.Board;
import com.teamhs.community.domain.Comment;
import com.teamhs.community.domain.Recomment;
import com.teamhs.community.dto.Request.RecommentDTO;
import com.teamhs.community.exception.ResourceNotFoundException;
import com.teamhs.community.repository.BoardRepository;
import com.teamhs.community.repository.CommentRepository;
import com.teamhs.community.repository.RecommentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

@Service
public class RecommentService {
    @Autowired
    private RecommentRepository recommentRepository;
    @Autowired
    private CommentRepository commentRepository;

    @Autowired
    private BoardRepository boardRepository;


    //대댓글 리스트 조회
    public List<Recomment> getReCommentsByCommentId(Long commentId) {
        return recommentRepository.findAllByComment_commentId(commentId);
    }

    //대댓글 작성
    public Recomment postReComment(RecommentDTO recommentDTO) {
        Recomment recomment = new Recomment();

        Comment comment = commentRepository.findById(recommentDTO.getCommentId())
                .orElseThrow(() -> new ResourceNotFoundException("CommentId not found"));

        Board board = boardRepository.findById(recommentDTO.getBoardId())
                .orElseThrow(() -> new ResourceNotFoundException("Board not found"));


        recomment.setComment(comment);
        recomment.setBoard(board);

        recomment.setUserId(recommentDTO.getUserId());
        recomment.setReCommentContent(recommentDTO.getReCommentContent());
        recomment.setRecommentDate(LocalDate.now());

        return recommentRepository.save(recomment);
    }


    //대댓글 삭제
    public boolean deleteReComment(Long recommentId) {
        Optional<Recomment> commentOptional = recommentRepository.findById(recommentId);
        if (commentOptional.isPresent()) {
            Recomment recomment = commentOptional.get();
            recommentRepository.delete(recomment);
            return true;
        }
        return false;
    }

    //대댓글 수정
    public boolean updateReComment(Long recommentId, RecommentDTO updateReCommentDTO) {
        Optional<Recomment> recommentOptional = recommentRepository.findById(recommentId);
        if (recommentOptional.isPresent()) {
            Recomment existingreComment = recommentOptional.get();

            existingreComment.setReCommentContent(updateReCommentDTO.getReCommentContent());
            recommentRepository.save(existingreComment);
            return true;
        }
        return false;
    }

}