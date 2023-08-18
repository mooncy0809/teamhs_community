import React, {useEffect, useState } from 'react';
import axios from 'axios';
import { useParams,  useNavigate } from 'react-router-dom';

import { Grid, Button, TextField} from '@mui/material';
import SubCard from 'ui-component/cards/SubCard';
import MainCard from 'ui-component/cards/MainCard';
import { gridSpacing } from 'store/constant';
import ReactQuill from 'react-quill';

import 'react-quill/dist/quill.snow.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import './customQuill.css'; // 새로운 CSS 파일 생성

const BoardEdit = () => {

  // URL에서 board_id 파라미터를 가져옴
  const { board_id } = useParams();


  //게시글 수정
  const [board, setBoard] = useState(null);
  const [title, setTitle] = useState(''); //기존 제목
  const [content, setContent] = useState(''); //기존 내용

  useEffect(() => {
    axios.get(`http://localhost:8090/board/${board_id}`)
      .then(response => {
        setBoard(response.data);
        setTitle(response.data.board_title); // 기존 제목으로 초기화
        setContent(response.data.board_content); // 기존 내용으로 초기화
      })
      .catch(error => console.log(error))
  }, [board_id]);

  //내용 변경 시 이벤트
  const handleTitleChange = (event) => {
    setTitle(event.target.value);
  };

  const handleContentChange = (value) => {
    setContent(value);
  };

  //페이지 이동 로직
  const navigate = useNavigate();

  const handleEditClick = () => {
    const cleanedContent = content.replace(/<\/?p>/g, ''); 
    const putData = {
      title: title,
      content: cleanedContent,
    };
    axios.put(`http://localhost:8090/board/update/${board_id}`, putData) 
      .then(response => {
        console.log('Edit saved:', response.data);
        navigate('/board/list'); // 수정 저장 버튼 클릭 시 게시글 리스트(index.js)로 이동
        // 저장이 성공한 경우 처리
      })
      .catch(error => {
        console.error('Error edit:', error);
        // 에러 처리
      });
  };
  
  //취소 버튼
  const handleCancleButtonClick = () => {
    navigate('/board/list'); //취소 버튼 : 게시글 리스트(index.js)로 이동
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