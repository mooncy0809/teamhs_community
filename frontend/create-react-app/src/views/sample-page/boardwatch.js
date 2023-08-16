import React, {useEffect, useState } from 'react';
import { Grid, Button, Typography } from '@mui/material';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useParams } from 'react-router-dom';
import axios from 'axios';

import 'react-quill/dist/quill.snow.css';
import { useNavigate } from 'react-router-dom';
import './customQuill.css'; // 새로운 CSS 파일 생성

import SubCard from 'ui-component/cards/SubCard';
import MainCard from 'ui-component/cards/MainCard';
import { gridSpacing } from 'store/constant';

import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

const BoardWatch = () => {

  const { board_id } = useParams(); // URL에서 board_id 파라미터를 가져옴
  const [board, setBoard] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);

  useEffect(() => {
    axios.get(`http://localhost:8090/board/${board_id}`)
      .then(response => setBoard(response.data))
      .catch(error => console.log(error))
  }, [board_id]);

  const navigate = useNavigate(); // useNavigate 함수 가져오기


  const handleDeleteButtonClick = () => {
    setOpenDialog(true);
  }

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  const handleConfirmDelete = () => {
    axios.delete(`http://localhost:8090/board/delete/${board_id}`)
    .then(response => {
      console.log('Delete saved:', response.data);
      navigate('/sample-page'); // '/sample-page list' 경로로 페이지 이동
      // 저장이 성공한 경우 처리
    })
    .catch(error => {
      console.error('Error delete:', error);
      // 에러 처리
    });
    handleCloseDialog();
  };
  

  //취소 버튼 클릭 시 페이지 이동 처리
  const handleCancleButtonClick = () => {
    navigate('/sample-page'); // '/sample-page list' 경로로 페이지 이동
  };

  if (!board) {
    return <div>Loading...</div>; // 로딩 중일 때 표시할 내용
  }

  return (
    <MainCard title={<span style={{ fontSize: '24px', fontWeight: 'bold'}}>자유게시판</span>} style={{ marginLeft: '8px' }}>
      <Grid container spacing={gridSpacing}>
        <Grid item xs={12}>
          <SubCard>
          <Grid container spacing={2}>
              <Grid item xs={12}>
                <Typography variant="h6" style={{fontWeight: 'bold', fontSize: '18px', color: 'your_desired_color_here' }}>
                  {board.board_title}
                </Typography>
                <hr style={{border: 'none', borderBottom: '1px solid #333', borderBottomColor: '#333333' }} />
                <Typography variant="body1" style={{  color: '#333333', marginBottom:"10px" }}>
                 {board.user_id.slice(0, -2) + '**' + " | " + board.board_date}
                </Typography>
              </Grid>
                
              <Grid item xs={12}>
              <div
                  style={{
                    fontSize: '16px',
                    color: '',
                    minHeight : "400px",
                    height: "100%",
                    width: "100%"}}
                >{board.board_content}</div>
              </Grid>
              <Grid item xs={12} style={{ textAlign: 'center' }}>
                <Button variant="contained" color="primary" style={{ marginRight: '0.5rem' }}>
                  수정
                </Button>
                <Button variant="text" onClick = {handleDeleteButtonClick} style={{ marginRight: '0.5rem', backgroundColor: '#f05650' , color: 'white'}}>
                  삭제
                </Button>
                <Dialog open={openDialog} onClose={handleCloseDialog}>
                  <DialogTitle>게시글 삭제</DialogTitle>
                  <DialogContent>
                    <DialogContentText>정말로 이 게시글을 삭제하시겠습니까?</DialogContentText>
                  </DialogContent>
                  <DialogActions>
                    <Button onClick={handleConfirmDelete} color="primary">네</Button>
                    <Button onClick={handleCloseDialog} color="primary">취소</Button>
                  </DialogActions>
                </Dialog>
                <Button variant="outlined" onClick={handleCancleButtonClick}>
                  뒤로가기
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