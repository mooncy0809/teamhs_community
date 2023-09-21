package com.teamhs.community.repository;

import com.teamhs.community.domain.Comment;
import com.teamhs.community.domain.Recomment;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface RecommentRepository extends JpaRepository<Recomment, Long> {
    List<Recomment> findAllByComment_commentId(Long commentId);
    void deleteByComment(Comment comment);
    List<Recomment> findByComment(Comment comment);
}
