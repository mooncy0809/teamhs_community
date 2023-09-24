package com.teamhs.community.dto.Request;

import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class BoardLikeDTO {

    private String userId;
    private Long boardId;

    public BoardLikeDTO( String userId, Long boardId) {
        this.userId = userId;
        this.boardId = boardId;
    }
}