package com.teamhs.community.service;

import com.teamhs.community.domain.Board;
import com.teamhs.community.domain.BoardLike;
import com.teamhs.community.repository.BoardLikeRepository;
import com.teamhs.community.repository.BoardRepository;
import com.teamhs.community.repository.MemberRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class BoardLikeService {

    @Autowired
    private BoardRepository boardRepository;
    @Autowired
    private BoardLikeRepository boardLikeRepository;

    @Autowired
    private MemberRepository memberRepository;

    public boolean clickLike(String userId, Long boardId) {
        Optional<Board> boardOptional = boardRepository.findById(boardId);
        if (boardOptional.isPresent()) {
            Board existingBoard = boardOptional.get();

            // 사용자가 이미 해당 게시글에 좋아요를 눌렀는지 확인.
            boolean userLiked = hasUserLikedBoard(userId, boardId);

            if (!userLiked) {
                // 사용자가 아직 좋아요를 누르지 않은 경우에만 좋아요.
                existingBoard.setLikeCnt(existingBoard.getLikeCnt() + 1);
                boardRepository.save(existingBoard);

                // 사용자의 좋아요 정보를 저장합니다.
                BoardLike boardLike = new BoardLike();

                boardLike.setMember(memberRepository.getOne(userId)); // 사용자 엔티티를 가져옵니다.
                boardLike.setBoard(existingBoard);
                boardLikeRepository.save(boardLike);

                return true;
            }
        }
        return false;
    }

    public boolean cancelLike(String userId, Long boardId) {
        Optional<Board> boardOptional = boardRepository.findById(boardId);
        if (boardOptional.isPresent()) {
            Board existingBoard = boardOptional.get();

            // 여기에서 사용자가 해당 게시글에 좋아요를 눌렀는지 확인합니다.
            boolean userLiked = hasUserLikedBoard(userId, boardId);

            if (userLiked) {
                existingBoard.setLikeCnt(existingBoard.getLikeCnt() - 1);
                boardRepository.save(existingBoard);
                // 사용자의 좋아요 정보를 삭제합니다.
                boardLikeRepository.deleteByMemberUserIdAndBoardBoardId(userId, boardId);

                return true;
            }
        }
        return false;
    }

    public boolean hasUserLikedBoard(String userId, Long boardId) {
        // 사용자 ID와 게시글 ID를 이용하여 해당 사용자가 해당 게시글에 좋아요를 눌렀는지 확인.
        return boardLikeRepository.existsByMemberUserIdAndBoardBoardId(userId, boardId);
    }
}