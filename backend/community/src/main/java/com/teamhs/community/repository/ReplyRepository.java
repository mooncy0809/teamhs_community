package com.teamhs.community.repository;

import com.teamhs.community.domain.Problem;
import com.teamhs.community.domain.Reply;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ReplyRepository extends JpaRepository<Reply, Long> {
    Page<Reply> findByProblem(Problem problem, Pageable pageable);
}
