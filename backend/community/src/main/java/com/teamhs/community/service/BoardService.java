package com.teamhs.community.service;


import com.teamhs.community.controller.BoardController;
import com.teamhs.community.domain.Board;
import com.teamhs.community.domain.BoardLike;
import com.teamhs.community.domain.Comment;
import com.teamhs.community.domain.Member;
import com.teamhs.community.dto.Request.BoardDTO;
import com.teamhs.community.dto.Request.BoardLikeDTO;
import com.teamhs.community.exception.ResourceNotFoundException;
import com.teamhs.community.repository.BoardLikeRepository;
import com.teamhs.community.repository.BoardRepository;
import com.teamhs.community.repository.CommentRepository;
import com.teamhs.community.repository.RecommentRepository;
import jakarta.transaction.Transactional;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

@Service
public class BoardService {

    @Autowired
    private BoardRepository boardRepository;
    @Autowired
    private CommentRepository commentRepository;
    @Autowired
    private RecommentRepository recommentRepository;
    @Autowired
    private BoardLikeRepository boardLikeRepository;

    public Page<Board> listPaginateGBoards(Pageable pageable){
        return boardRepository.findAll(pageable);
    }

    //자유 게시판 리스트 조회 : 페이징 작업 추가
    //카테고리 별 게시글 조회
    public Page<Board> listPaginatedBoardsByCateId(Long cateId, Pageable pageable) {
        return boardRepository.findAllByCateId(cateId, pageable);
    }

    // 검색어와 검색 카테고리에 따라 게시글을 검색
    public Page<Board> searchBoards(Long cateId, String sCate, String sText, Pageable pageable) {
        if ("title".equals(sCate)) {
            // 제목으로 검색
            if (cateId == 2){
                return boardRepository.findAllByBoardTitleContaining(sText, pageable);
            }else{
                return boardRepository.findAllByCateIdAndBoardTitleContaining(cateId, sText, pageable);
            }

        } else if ("content".equals(sCate)) {
            // 내용으로 검색
            if(cateId == 2){
                return boardRepository.findAllByBoardContentContaining(sText, pageable);
            }else{
                return boardRepository.findAllByCateIdAndBoardContentContaining(cateId, sText, pageable);
            }
        } else {
            // 기본적으로 전체 내용으로 검색 (카테고리에 상관없이)
            if (cateId == 2){
                return boardRepository.findAllByBoardTitleContainingOrBoardContentContaining(sText, sText, pageable);
            }else{
                return boardRepository.findAllByCateIdAndBoardTitleContainingOrCateIdAndBoardContentContaining(cateId, sText, cateId, sText, pageable);
            }

        }
    }





    //게시판 작성
    public Board postBoard(BoardDTO board) {
        Board newBoard = new Board();

        //newBoard.setUserId("임시 아이디");
        newBoard.setUserId(board.getUserId());

        //category 00 - 자유게시판 01 - 뉴스
        newBoard.setCateId(board.getCategoryId());

        newBoard.setBoardTitle(board.getTitle());
        newBoard.setBoardContent(board.getContent());
        newBoard.setBoardDate(LocalDate.now());
        newBoard.setViewCnt(0);
        newBoard.setLikeCnt(0);

        return boardRepository.save(newBoard);
    }

    //게시글 상세 조회
    public Board getBoardById(Long boardId) {

        Board board = boardRepository.findById(boardId)
                .orElseThrow(() -> new ResourceNotFoundException("Board not found with id: " + boardId));

        // 조회수 증가
        board.setViewCnt(board.getViewCnt() + 1);
        boardRepository.save(board);

        return board;
    }


    //게시글 삭제
    @Transactional
    public boolean deleteBoard(Long boardId) {
        Optional<Board> boardOptional = boardRepository.findById(boardId);
        if (boardOptional.isPresent()) {
            Board board = boardOptional.get();
            List<Comment> comments = board.getComments();

            for (Comment comment : comments) {
                // 관련된 대댓글 삭제
                recommentRepository.deleteByComment(comment);
            }
            // 관련된 댓글 삭제
            commentRepository.deleteAll(comments);
            boardLikeRepository.deleteByBoardBoardId(boardId);
            // 게시글 삭제
            boardRepository.delete(board);
            return true;
        }
        return false;
    }
    @Autowired
    private BoardLikeService boardLikeService;

    //게시글 수정
    public boolean updateBoard(Long boardId, String userId, BoardDTO updatedBoardDTO) {
        Optional<Board> boardOptional = boardRepository.findById(boardId);
        if (boardOptional.isPresent()) {
            Board existingBoard = boardOptional.get();
            existingBoard.setBoardTitle(updatedBoardDTO.getTitle());
            existingBoard.setBoardContent(updatedBoardDTO.getContent());

            final Logger logger = LoggerFactory.getLogger(BoardController.class);
            logger.info("receive_cateId {}", userId);

            if(boardLikeService.checkIfUserLikedBoard(userId, boardId)){
                existingBoard.setLikeCnt(updatedBoardDTO.getLikeCnt()+1);

            }else{
                existingBoard.setLikeCnt(updatedBoardDTO.getLikeCnt());

            }

            //existingBoard.setLikeCnt(updatedBoardDTO.getLikeCnt());
            existingBoard.setViewCnt(updatedBoardDTO.getViewCnt());
            boardRepository.save(existingBoard);
            return true;
        }
        return false;
    }



}

