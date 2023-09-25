package com.teamhs.community.service;

import com.teamhs.community.domain.Board;
import com.teamhs.community.domain.BoardLike;
import com.teamhs.community.domain.Member;
import com.teamhs.community.exception.ResourceNotFoundException;
import com.teamhs.community.repository.BoardLikeRepository;
import com.teamhs.community.repository.BoardRepository;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class BoardLikeService {

    @Autowired
    private BoardLikeRepository boardLikeRepository;
    @Autowired
    private BoardRepository boardRepository;

    @Transactional
    public void likeBoard(String userId, Long boardId) {
        Member member = new Member();
        member.setUserId(userId);

        Board boards = boardRepository.findById(boardId).orElseThrow(() -> new ResourceNotFoundException("Board not found with id: " + boardId));
        // 조회수 증가
        boards.setBoardId(boards.getBoardId());
        boards.setViewCnt(boards.getViewCnt());
        boards.setLikeCnt(boards.getLikeCnt() + 1);

        BoardLike like = new BoardLike();
        like.setMember(member);
        like.setBoard(boards);

        boardRepository.save(boards);
        boardLikeRepository.save(like);
    }

    @Transactional
    public void unlikeBoard(String userId, Long boardId) {

        Board boards = boardRepository.findById(boardId).orElseThrow(() -> new ResourceNotFoundException("Board not found with id: " + boardId));
        // 조회수 증가
        boards.setBoardId(boards.getBoardId());
        boards.setViewCnt(boards.getViewCnt());
        boards.setLikeCnt(boards.getLikeCnt() - 1);
        boardRepository.save(boards);
        boardLikeRepository.deleteByMemberUserIdAndBoardBoardId(userId, boardId);
    }

    public boolean checkIfUserLikedBoard(String userId, Long boardId) {
        return boardLikeRepository.existsByMemberUserIdAndBoardBoardId(userId, boardId);
    }
}