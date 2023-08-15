import React, {useEffect, useState } from 'react';
import { Grid, Button, TextField } from '@mui/material';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useParams } from 'react-router-dom';
import axios from 'axios';

import 'react-quill/dist/quill.snow.css';
import { useNavigate } from 'react-router-dom';
import './customQuill.css'; // 새로운 CSS 파일 생성

import SubCard from 'ui-component/cards/SubCard';
import MainCard from 'ui-component/cards/MainCard';
import { gridSpacing } from 'store/constant';

const BoardWatch = () => {

  const { board_id } = useParams(); // URL에서 board_id 파라미터를 가져옴
  const [board, setBoard] = useState(null);

  useEffect(() => {
    axios.get(`http://localhost:8090/board/${board_id}`)
      .then(response => setBoard(response.data))
      .catch(error => console.log(error))
  }, [board_id]);

  const navigate = useNavigate(); // useNavigate 함수 가져오기

  //취소 버튼 클릭 시 페이지 이동 처리
  const handleCancleButtonClick = () => {
    navigate('/sample-page'); // '/sample-page list' 경로로 페이지 이동
  };

  if (!board) {
    return <div>Loading...</div>; // 로딩 중일 때 표시할 내용
  }

  return (
    <MainCard title={<span style={{ fontSize: '24px', fontWeight: 'bold' }}>게시글 상세 보기</span>} style={{ marginLeft: '8px' }}>
      <Grid container spacing={gridSpacing}>
        <Grid item xs={12}>
          <SubCard>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  label="제목"
                  variant="outlined"
                  fullWidth
                  value={board.board_title} // 게시글 제목 사용
                  disabled
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  label="내용"
                  variant="outlined"
                  fullWidth
                  multiline
                  rows={10}
                  value={board.board_content} // 게시글 내용 사용
                  disabled
                />
              </Grid>
              <Grid item xs={12} style={{ textAlign: 'center' }}>
                <Button variant="outlined" onClick={handleCancleButtonClick}>
                  뒤로가기
                </Button>
                <Button variant="outlined">
                  수정
                </Button>
                <Button variant="outlined">
                  삭제
                </Button>
              </Grid>
            </Grid>
          </SubCard>
        </Grid>
      </Grid>
    </MainCard>
  );
};

export default BoardWatch;