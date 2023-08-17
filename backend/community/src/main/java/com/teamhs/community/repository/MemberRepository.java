package com.teamhs.community.repository;

import com.teamhs.community.domain.Member;
import org.springframework.data.jpa.repository.JpaRepository;

public interface MemberRepository extends JpaRepository<Member, String> {

    public boolean existsByUserIdAndUserPassword(String userId, String userPassword);
}
