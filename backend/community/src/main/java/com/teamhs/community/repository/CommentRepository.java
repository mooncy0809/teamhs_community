package com.teamhs.community.repository;

import com.teamhs.community.domain.Comment;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CommentRepository extends JpaRepository<Comment, Long> {
    //board_id로 해당 게시글 Comment 목록 불러오기
    List<Comment> findAllByBoard_boardId(Long boardId);

}