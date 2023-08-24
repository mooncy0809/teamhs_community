package com.teamhs.community.service;


import com.teamhs.community.domain.Board;
import com.teamhs.community.dto.Request.BoardDTO;
import com.teamhs.community.exception.ResourceNotFoundException;
import com.teamhs.community.repository.BoardRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.Optional;

@Service
public class BoardService {

    @Autowired
    private BoardRepository boardRepository;

    //자유 게시판 리스트 조회 : 페이징 작업 추가
    public Page<Board> listPaginatedBoards(Pageable pageable) {
        return boardRepository.findAll(pageable);
    }

    //게시판 작성
    public Board postBoard(BoardDTO board) {
        Board newBoard = new Board();
        newBoard.setUserId("임시 아이디");
        newBoard.setBoardTitle(board.getTitle());
        newBoard.setBoardContent(board.getContent());
        newBoard.setBoardDate(LocalDate.now());
        newBoard.setBoardRecom(0);
        newBoard.setBoardCnt(0);
        newBoard.setCommentCnt(0);

        return boardRepository.save(newBoard);
    }

    //게시판 상세 조회
    public Board getBoardById(Long board_id) {
        return boardRepository.findById(board_id)
                .orElseThrow(() -> new ResourceNotFoundException("Board not found with id: " + board_id));
    }

    //게시글 삭제
    public boolean deleteBoard(Long board_id) {
        Optional<Board> boardOptional = boardRepository.findById(board_id);
        if (boardOptional.isPresent()) {
            Board board = boardOptional.get();
            boardRepository.delete(board);
            return true;
        }
        return false;
    }

    //게시글 수정
    public boolean updateBoard(Long board_id, BoardDTO updatedBoardDTO) {
        Optional<Board> boardOptional = boardRepository.findById(board_id);
        if (boardOptional.isPresent()) {
            Board existingBoard = boardOptional.get();
            existingBoard.setBoardTitle(updatedBoardDTO.getTitle());
            existingBoard.setBoardContent(updatedBoardDTO.getContent());
            existingBoard.setBoardRecom(updatedBoardDTO.getRecommend());
            existingBoard.setBoardCnt(updatedBoardDTO.getCount());
            existingBoard.setCommentCnt(updatedBoardDTO.getCommentCount());
            boardRepository.save(existingBoard);
            return true;
        }
        return false;
    }

}

