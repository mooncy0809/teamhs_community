import React, {useEffect, useState } from 'react';
import { Grid, Button, TextField} from '@mui/material';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useParams } from 'react-router-dom';
import axios from 'axios';

import ReactQuill from 'react-quill';

import 'react-quill/dist/quill.snow.css';
import { useNavigate } from 'react-router-dom';
import './customQuill.css'; // 새로운 CSS 파일 생성

import SubCard from 'ui-component/cards/SubCard';
import MainCard from 'ui-component/cards/MainCard';
import { gridSpacing } from 'store/constant';

const BoardEdit = () => {

  const { board_id } = useParams(); // URL에서 board_id 파라미터를 가져옴
  const [board, setBoard] = useState(null);

  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  useEffect(() => {
    axios.get(`http://localhost:8090/board/${board_id}`)
      .then(response => {
        setBoard(response.data);
        setTitle(response.data.board_title); // 기존 제목으로 초기화
        setContent(response.data.board_content); // 기존 내용으로 초기화
      })
      .catch(error => console.log(error))
  }, [board_id]);



  const handleTitleChange = (event) => {
    setTitle(event.target.value);
  };

  const handleContentChange = (value) => {
    setContent(value);
  };


  const navigate = useNavigate(); // useNavigate 함수 가져오기

  const handleEditClick = () => {
    const cleanedContent = content.replace(/<\/?p>/g, ''); // Remove <p> tags
    const putData = {
      title: title,
      content: cleanedContent,
    };
  
    axios.put(`http://localhost:8090/board/update/${board_id}`, putData)
      .then(response => {
        console.log('Edit saved:', response.data);
        navigate('/sample-page'); // '/sample-page list' 경로로 페이지 이동
        // 저장이 성공한 경우 처리
      })
      .catch(error => {
        console.error('Error edit:', error);
        // 에러 처리
      });
  };
  
  

  //취소 버튼 클릭 시 페이지 이동 처리
  const handleCancleButtonClick = () => {
    navigate('/sample-page'); // '/sample-page list' 경로로 페이지 이동
  };

  if (!board) {
    return <div>Loading...</div>; // 로딩 중일 때 표시할 내용
  }



  return (
    <MainCard title={<span style={{ fontSize: '24px', fontWeight: 'bold'}}>게시글 수정</span>} style={{ marginLeft: '8px' }}>
      <Grid container spacing={gridSpacing}>
        <Grid item xs={12}>
          <SubCard>
          <Grid container spacing={2}>
              <Grid item xs={12}>
                  <TextField
                    label="제목"
                    variant="outlined"
                    fullWidth
                    value={title} // 변경
                    onChange={handleTitleChange}
                  />
              </Grid>
              <Grid item xs={12}>
              <div className="quill-container">
              <ReactQuill
                      value={content} // 변경
                      onChange={handleContentChange}
                      theme="snow"
                    />
                  </div>
              </Grid>
              <Grid item xs={12} style={{ textAlign: 'center' }}>
                <Button variant="contained" onClick = {handleEditClick} color="primary" style={{ marginRight: '0.5rem' }}>
                  저장
                </Button>
                <Button variant="outlined" onClick = {handleCancleButtonClick} style={{ marginRight: '0.5rem' }}>
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

export default BoardEdit;