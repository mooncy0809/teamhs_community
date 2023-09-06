package com.teamhs.community.repository;

import com.teamhs.community.domain.Board;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Page;

@Repository
public interface BoardRepository extends JpaRepository<Board, Long> {
    Page<Board> findAllByCateId(Long cateId, Pageable pageable);
}

