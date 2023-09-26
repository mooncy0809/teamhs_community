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

//Dialog
import Swal from "sweetalert2";

const BoardEdit = () => {

  // URL에서 board_id 파라미터를 가져옴
  const { boardId } = useParams();


  //게시글 수정
  const [board, setBoard] = useState(null);
  const [title, setTitle] = useState(''); //기존 제목
  const [content, setContent] = useState(''); //기존 내용

  useEffect(() => {
    axios.get(`http://localhost:8090/board/${boardId}`)
      .then(response => {
        setBoard(response.data);
        setTitle(response.data.boardTitle); // 기존 제목으로 초기화
        setContent(response.data.boardContent); // 기존 내용으로 초기화
      })
      .catch(error => console.log(error))
  }, [boardId]);

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

    Swal.fire({
      title: "게시글 수정 확인",
      text: "게시글을 수정하시겠습니까?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "네",
      cancelButtonText: "아니요",
      confirmButtonColor: "#d33",
    })
    .then((result) => {
      if (result.isConfirmed) {


        const putData = {
          title: title,
          content: content,
        };
        axios.put(`http://localhost:8090/board/update/${boardId}`, putData) 
          .then(response => {
            console.log('Edit saved:', response.data);
            navigate('/board/list'); // 수정 저장 버튼 클릭 시 게시글 리스트(index.js)로 이동
            // 저장이 성공한 경우 처리
          
          Swal.fire("게시글 수정 완료", "게시글이 수정되었습니다.", "success");
          })
          .catch(error => {
            Swal.fire("게시글 수정 실패", "게시글 수정 중 오류가 발생했습니다." + error, "success");
          });


      }
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
              <Grid item xs={12} style={{ textAlign: 'center' }}>
                <Button variant="contained" onClick = {handleEditClick} color="primary" style={{ marginRight: '0.5rem' }}>
                  수정
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