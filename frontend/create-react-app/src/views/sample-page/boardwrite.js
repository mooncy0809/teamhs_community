import React, { useState } from 'react';
import { Grid, Button, TextField } from '@mui/material';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios'; // axios 모듈 추가


import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { useNavigate } from 'react-router-dom';
import './customQuill.css'; // 새로운 CSS 파일 생성

import SubCard from 'ui-component/cards/SubCard';
import MainCard from 'ui-component/cards/MainCard';
import { gridSpacing } from 'store/constant';

const BoardWrite = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');


  const navigate = useNavigate(); // useNavigate 함수 가져오기


  const handleSaveButtonClick = () => {
    const cleanedContent = content.replace(/<\/?p>/g, ''); // Remove <p> tags
    const postData = {
    title: title,
    content: cleanedContent,
    };
  
    axios.post('http://localhost:8090/board/write', postData)
      .then(response => {
        console.log('Post saved:', response.data);
        navigate('/sample-page'); // '/sample-page list' 경로로 페이지 이동
        // 저장이 성공한 경우 처리
      })
      .catch(error => {
        console.error('Error saving post:', error);
        // 에러 처리
      });
  };


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
              <div className="quill-container">
                    <ReactQuill
                      value={content}
                      onChange={handleContentChange}
                      theme="snow"
                    />
                  </div>
              </Grid>
              <Grid item xs={12} style={{ textAlign: 'right' }}>
              <Button variant="contained" style={{ marginRight: '0.5rem' }} onClick={handleSaveButtonClick}>
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