package com.teamhs.community.repository;

import com.teamhs.community.domain.BoardLike;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface BoardLikeRepository extends JpaRepository<BoardLike, Long> {

    // 사용자 아이디(userId)와 게시글 아이디(boardId)를 이용하여 해당 좋아요 정보가 존재하는지 확인
    boolean existsByMemberUserIdAndBoardBoardId(String userId, Long boardId);

    // 사용자 아이디(userId)와 게시글 아이디(boardId)를 이용하여 해당 좋아요 정보를 찾음
    BoardLike findByMemberUserIdAndBoardBoardId(String userId, Long boardId);

    // 사용자 아이디(userId)와 게시글 아이디(boardId)를 이용하여 해당 좋아요 정보를 삭제
    void deleteByMemberUserIdAndBoardBoardId(String userId, Long boardId);


}