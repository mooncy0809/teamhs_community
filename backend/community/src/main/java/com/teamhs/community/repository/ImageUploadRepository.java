package com.teamhs.community.repository;

import com.teamhs.community.domain.Answer;
import com.teamhs.community.domain.Problem;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ImageUploadRepository extends JpaRepository<Answer, Long> {

}
