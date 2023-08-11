package com.teamhs.community.repository;

import com.teamhs.community.domain.Board;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;


@Repository
public interface BoardRepository extends JpaRepository<Board, Long> {
}
