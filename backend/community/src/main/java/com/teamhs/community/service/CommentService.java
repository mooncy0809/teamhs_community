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

@Service
public class CommentService {
    @Autowired
    private CommentRepository commentRepository;
    @Autowired
    private BoardRepository boardRepository;

    public Comment postComment(CommentDTO commentDTO) {
        Comment comment = new Comment();

        comment.setUserId(commentDTO.getUserId());

        // 수정된 부분: boardId를 사용하여 Board 엔티티를 찾습니다.
        Board board = boardRepository.findById(commentDTO.getBoardId())
                .orElseThrow(() -> new ResourceNotFoundException("Board not found"));

        // 수정된 부분: Comment 엔티티에 Board 엔티티를 설정합니다.
        comment.setBoard(board);
        comment.setCommentContent(commentDTO.getCommentContent());
        comment.setCommentDate(LocalDate.now());

        return commentRepository.save(comment);
    }
}