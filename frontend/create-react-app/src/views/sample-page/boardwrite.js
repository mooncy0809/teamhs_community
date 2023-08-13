import React, { useState } from 'react';
import { Grid, Button, TextField } from '@mui/material';
import 'bootstrap/dist/css/bootstrap.min.css';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { useNavigate } from 'react-router-dom';

import SubCard from 'ui-component/cards/SubCard';
import MainCard from 'ui-component/cards/MainCard';
import { gridSpacing } from 'store/constant';

const BoardWrite = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');


  const navigate = useNavigate(); // useNavigate 함수 가져오기

  // 버튼 클릭 시 페이지 이동 처리
  const handleCancleButtonClick = () => {
    navigate('/sample-page'); // '/sample-page list' 경로로 페이지 이동
  };


  const handleTitleChange = (event) => {
    setTitle(event.target.value);
  };

  const handleContentChange = (value) => {
    setContent(value);
  };

  return (
    <MainCard title={<span style={{ fontSize: '24px', fontWeight: 'bold' }}>게시글 작성</span>} style={{ marginLeft: '8px' }}>
    <Grid container spacing={gridSpacing}>
      <Grid item xs={12}>
        <SubCard>
        <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  label="제목"
                  variant="outlined"
                  fullWidth
                  value={title}
                  onChange={handleTitleChange}
                />
              </Grid>
              <Grid item xs={12}>
                  <ReactQuill
                    value={content}
                    onChange={handleContentChange}
                    style={{ Height: '500px', border: '1px solid #ccc' }}
                  />
              </Grid>
              <Grid item xs={12} style={{ textAlign: 'right' }}>
              <Button variant="contained" style={{ marginRight: '0.5rem' }}>
                  저장
                </Button>
                <Button variant="outlined" onClick={handleCancleButtonClick}>
                  취소
                </Button>
              </Grid>
            </Grid>
        </SubCard>
      </Grid>
    </Grid>
  </MainCard>
  );
};

export default BoardWrite;