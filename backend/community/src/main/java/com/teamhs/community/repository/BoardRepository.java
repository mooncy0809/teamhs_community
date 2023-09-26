package com.teamhs.community.repository;

import com.teamhs.community.domain.Board;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Page;

@Repository
public interface BoardRepository extends JpaRepository<Board, Long> {
    Page<Board> findAllByCateId(Long cateId, Pageable pageable);
    // 카테고리와 제목을 기준으로 게시글 검색
    Page<Board> findAllByCateIdAndBoardTitleContaining(Long cateId, String title, Pageable pageable);

    // 카테고리와 내용을 기준으로 게시글 검색
    Page<Board> findAllByCateIdAndBoardContentContaining(Long cateId, String content, Pageable pageable);

    // 전체 게시글에서 제목 또는 내용으로 검색
    Page<Board> findAllByCateIdAndBoardTitleContainingOrCateIdAndBoardContentContaining(Long cateId, String title, Long cateId2, String content, Pageable pageable);
    void deleteById(Long boardId);


}



