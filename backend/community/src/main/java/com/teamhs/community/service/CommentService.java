package com.teamhs.community.service;

import com.teamhs.community.domain.Board;
import com.teamhs.community.domain.Comment;
import com.teamhs.community.dto.Request.CommentDTO;
import com.teamhs.community.exception.ResourceNotFoundException;
import com.teamhs.community.repository.BoardRepository;
import com.teamhs.community.repository.CommentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;

@Service
public class CommentService {
    @Autowired
    private CommentRepository commentRepository;
    @Autowired
    private BoardRepository boardRepository;

    public List<Comment> getCommentsByBoardId(Long boardId) {
        return commentRepository.findAllByBoard_boardId(boardId);
    }


    public Comment postComment(CommentDTO commentDTO) {
        Comment comment = new Comment();

        comment.setUserId(commentDTO.getUserId());

        Board board = boardRepository.findById(commentDTO.getBoardId())
                .orElseThrow(() -> new ResourceNotFoundException("Board not found"));

        comment.setBoard(board);
        comment.setCommentContent(commentDTO.getCommentContent());
        comment.setCommentDate(LocalDate.now());

        return commentRepository.save(comment);
    }





}