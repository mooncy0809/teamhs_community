import React, {useEffect, useState } from 'react';
import axios from 'axios';

import { Grid, Button, Typography } from '@mui/material';
import { useParams, useNavigate } from 'react-router-dom';
import SubCard from 'ui-component/cards/SubCard';
import MainCard from 'ui-component/cards/MainCard';
import { gridSpacing } from 'store/constant';

import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-quill/dist/quill.snow.css';
import './customQuill.css';

//Dialog
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

const BoardDetail = () => {

  // URL에서 board_id 파라미터를 가져옴
  const { board_id } = useParams(); 

  //게시글 상세 조회
  const [board, setBoard] = useState(null);
  
  useEffect(() => {
    axios.get(`http://localhost:8090/board/${board_id}`)
      .then(response => setBoard(response.data))
      .catch(error => console.log(error))
  }, [board_id]);


  //페이지 이동 로직
  const navigate = useNavigate();
  const [openDialog, setOpenDialog] = useState(false);

  //게시글 삭제 : Dialog 예/아니오
  const handleDeleteButtonClick = () => {
    setOpenDialog(true);
  }

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  //Dialog 예 클릭 시 삭제 API 호출
  const handleConfirmDelete = () => {
    axios.delete(`http://localhost:8090/board/delete/${board_id}`)
    .then(response => {
      console.log('Delete saved:', response.data);
      navigate('/sample-page'); // '/sample-page list' 경로로 페이지 이동
      // 삭제 성공한 경우 처리
    })
    .catch(error => {
      console.error('Error delete:', error);
      // 에러 처리
    });
    handleCloseDialog();
  };

  const handleEditMoveClick = () => {
    navigate(`/sample-page/boardEdit/${board_id}`); // 게시글 수정(boardEdit) 페이지 이동
  };
  
  const handleCancleButtonClick = () => {
    navigate('/sample-page'); // 취소 버튼 : 게시글 리스트(list) 페이지 이동
  };

  //게시글 내용이 없거나 로딩이 되지 않을 경우
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
                <Button variant="contained" onClick={handleEditMoveClick} color="primary" style={{ marginRight: '0.5rem' }}>
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

export default BoardDetail;