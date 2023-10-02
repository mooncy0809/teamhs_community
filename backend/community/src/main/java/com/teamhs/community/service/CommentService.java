package com.teamhs.community.service;

import com.teamhs.community.domain.Board;
import com.teamhs.community.domain.Comment;
import com.teamhs.community.domain.Recomment;
import com.teamhs.community.dto.Request.CommentDTO;
import com.teamhs.community.exception.ResourceNotFoundException;
import com.teamhs.community.repository.BoardRepository;
import com.teamhs.community.repository.CommentRepository;
import com.teamhs.community.repository.RecommentRepository;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.List;
import java.util.Optional;

@Service
public class CommentService {
    @Autowired
    private CommentRepository commentRepository;
    @Autowired
    private BoardRepository boardRepository;

    @Autowired
    private RecommentRepository recommentRepository;


    //댓글 리스트 조회
    public List<Comment> getCommentsByBoardId(Long boardId) {
        return commentRepository.findAllByBoard_boardId(boardId);
    }

    //댓글 작성

    public Comment postComment(CommentDTO commentDTO) {
        Comment comment = new Comment();

        comment.setUserId(commentDTO.getUserId());

        Board board = boardRepository.findById(commentDTO.getBoardId())
                .orElseThrow(() -> new ResourceNotFoundException("Board not found"));

        comment.setBoard(board);
        comment.setCommentContent(commentDTO.getCommentContent());

        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss");
        String formattedDateTime = LocalDateTime.now().format(formatter);
        comment.setCommentDate(formattedDateTime);

        return commentRepository.save(comment);
    }


    //댓글 삭제
    @Transactional
    public boolean deleteComment(Long commentId) {
        Optional<Comment> commentOptional = commentRepository.findById(commentId);
        if (commentOptional.isPresent()) {
            Comment comment = commentOptional.get();

            recommentRepository.deleteByComment(comment);

            commentRepository.delete(comment);
            return true;
        }
        return false;
    }


    //댓글 수정
    public boolean updateComment(Long commentId, CommentDTO updateCommentDTO) {
        Optional<Comment> commentOptional = commentRepository.findById(commentId);
        if (commentOptional.isPresent()) {
            Comment existingComment = commentOptional.get();

            DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss");
            String formattedDateTime = LocalDateTime.now().format(formatter);


            existingComment.setCommentContent(updateCommentDTO.getCommentContent());
            existingComment.setCommentDate(formattedDateTime + "(수정됨)");

            commentRepository.save(existingComment);
            return true;
        }
        return false;
    }

}