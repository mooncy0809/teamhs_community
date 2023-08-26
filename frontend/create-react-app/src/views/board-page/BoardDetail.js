import React, {useEffect, useState } from 'react';
import axios from 'axios';

import { Grid, Button, Typography, TextField } from '@mui/material';
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
  const { boardId } = useParams(); // URL에서 board_id 파라미터를 가져옴
  
  const [board, setBoard] = useState(null);
  const [commentList, setCommentList] = useState([]);

  //게시글 조회 기능 구현
  useEffect(() => {
    axios.get(`http://localhost:8090/board/${boardId}`) //게시글 목록 조회
      .then(response => setBoard(response.data))
      .catch(error => console.log(error))
  }, [boardId]);

  useEffect(() => {
    axios.get(`http://localhost:8090/comment/list/${boardId}`) //댓글 목록 조회
      .then(response => setCommentList(response.data))
      .catch(error => console.log(error))
  }, [boardId]);


  //수정, 삭제, 목록으로 : Dialog 예/아니오
  const navigate = useNavigate();
  const [openDialog, setOpenDialog] = useState(false);

  const handleDeleteButtonClick = () => {
    setOpenDialog(true);
  }

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  const handleConfirmDelete = () => {
    axios.delete(`http://localhost:8090/board/delete/${boardId}`) //Dialog 예 클릭 시 삭제 API 호출
    .then(response => {
      console.log('Delete saved:', response.data);
      navigate('/board/list'); // '/board list' 경로로 페이지 이동
      // 삭제 성공한 경우 처리
    })
    .catch(error => {
      console.error('Error delete:', error);
      // 에러 처리
    });
    handleCloseDialog();
  };

  const handleEditMoveClick = () => {
    navigate(`/board/edit/${boardId}`); // 수정 버튼 : 게시글 수정(boardEdit) 페이지 이동
  };
  
  const handleCancleButtonClick = () => {
    navigate('/board/list'); // 목록으로 버튼 : 게시글 리스트(list) 페이지 이동
  };



  //댓글 기능 구현
  const [commentContent, setCommentContent] = useState(""); 


  const handleCommentWrite = () => {  //댓글 작성 버튼 클릭
  const newComment = {
    userId: "임시 아이디",
    boardId: boardId,
    commentContent: commentContent,
  };
    axios
    .post("http://localhost:8090/comment/write", newComment)
    .then((response) => {
      console.log("Comment posted:", response.data);
    
      axios.get(`http://localhost:8090/comment/list/${boardId}`) //등록 후 댓글 리스트 업데이트
        .then(response => setCommentList(response.data))
        .catch(error => console.log(error))
    
      setCommentContent(""); // 댓글 내용 초기화
    })
    .catch((error) => {
      console.error("Error posting comment:", error);
      // 에러 처리
    });
  };


  const handleCommentDelete = (commentId) => {
    axios.delete(`http://localhost:8090/comment/delete/${commentId}`) //댓글 삭제 버튼 클릭
    .then(response => {
      console.log('Delete saved:', response.data);

      axios.get(`http://localhost:8090/comment/list/${boardId}`) //등록 후 댓글 리스트 업데이트
        .then(response => setCommentList(response.data))
        .catch(error => console.log(error))
      // 삭제 성공한 경우 처리
    })
    .catch(error => {
      console.error('Error delete:', error);
      // 에러 처리
    });
  };

  //댓글 수정
  const [editingCommentId, setEditingCommentId] = useState(null);
  const [editedCommentContent, setEditedCommentContent] = useState("");
  
  const handleEditCommentClick = (comment) => {
    setEditingCommentId(comment.commentId);
  };
  
  const handleCancelEdit = () => {
    setEditingCommentId(null);
    setEditedCommentContent('');
  };



  const handleSaveEdit = (commentId, editedContent) => {
    axios.put(`http://localhost:8090/comment/update/${commentId}`, { commentContent: editedContent }) 
      .then(response => {
        console.log('Edit saved:', response.data);

        axios.get(`http://localhost:8090/comment/list/${boardId}`) //등록 후 댓글 리스트 업데이트
        .then(response => setCommentList(response.data))
        .catch(error => console.log(error))
        // 저장이 성공한 경우 처리
        setEditedCommentContent('');
      })
      .catch(error => {
        console.error('Error edit:', error);
        // 에러 처리
      });
    setEditingCommentId(null); // 수정 완료 후 폼 닫기
  };

  //게시글 내용이 없거나 로딩이 되지 않을 경우
  if (!board) {
    return <div style={{fontWeight :"24px"}}>Loading...</div>; // 로딩 중일 때 표시할 내용
  }

  return (
    <MainCard title={<Button onClick = {handleCancleButtonClick} style={{ fontSize: '24px', fontWeight: 'bold' , color:"#333333"}}>자유게시판</Button>}>
      <Grid container spacing={gridSpacing}>
        <Grid item xs={12}>
          <SubCard>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                {/* 게시글 제목 */}
                <Typography variant="h6" style={{ fontWeight: 'bold', fontSize: '20px', color: 'your_desired_color_here' }}>
                  {board.boardTitle}
                </Typography>
                <Grid container justifyContent="space-between" alignItems="center" marginTop={"10px"}>
                  <Typography variant="body1" style={{ fontWeight: 'bold', color: '#333333' }}>
                    {board.userId.slice(0, -2) + '**' + " | " + board.boardDate}
                  </Typography>
                  <Grid item>
                    {/* 게시글 수정/삭제 */}
                    <Typography variant="contained" onClick={handleEditMoveClick}>수정</Typography> | <Typography variant="text" onClick={handleDeleteButtonClick}>삭제</Typography>
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
                  </Grid>
                </Grid>
                <hr style={{ border: 'none', borderBottom: '1px solid #333', borderBottomColor: '#333333' }} />
              </Grid>
              {/* 게시글 내용 */}
              <Grid item xs={12}>
                <div
                  dangerouslySetInnerHTML={{ __html: board.boardContent }}
                  style={{
                    fontSize: '16px',
                    color: '',
                    minHeight: "400px",
                    height: "100%",
                    width: "100%"
                  }}
                ></div>
              </Grid>
              {/* 목록으로 버튼 */}
              <Grid item xs={12} style={{ textAlign: 'center', marginTop: '1rem' }}>
                <Button variant="outlined" onClick={handleCancleButtonClick}>목록으로</Button>
              </Grid>
              {/* 댓글 작성 폼 */}
              <Grid item xs={12} style={{ textAlign: 'right' }}>
                <TextField
                  label="댓글 작성"
                  multiline
                  rows={4}
                  variant="outlined"
                  fullWidth
                  style={{ marginBottom: "1rem" }}
                  value={commentContent} // 상태 연결
                  onChange={(e) => setCommentContent(e.target.value)} // 입력 내용 업데이트
                />
                <Button onClick={handleCommentWrite} variant="contained" color="primary">댓글 작성</Button>
              </Grid>
              {/* 댓글 리스트 폼 */}
              <Grid item xs={12}>
                <SubCard>
                  <Typography variant="h6" style={{ fontWeight: 'bold', fontSize: '18px', color: 'your_desired_color_here', marginBottom: '1rem' }}>
                    댓글
                  </Typography>
                  {commentList.map(comment => (
                    <div key={comment.commentId} style={{ marginBottom: '1rem' }}>
                      <Typography variant="body1" style={{ fontWeight: "bold", color: '#333333', marginBottom: '10px' }}>
                        {comment.commentContent}
                      </Typography>
                      <Typography variant="body2" style={{ color: 'grey' }}>
                        {comment.userId.slice(0, -2) + '**' + " | " + comment.commentDate}
                        {/*댓글 수정 폼 */}
                        {editingCommentId === comment.commentId ? (
                              <div>
                                <TextField
                                  label="댓글 수정"
                                  multiline
                                  rows={4}
                                  variant="outlined"
                                  fullWidth
                                  value={editedCommentContent}
                                  onChange={(e) => setEditedCommentContent(e.target.value)}
                                  style={{marginTop : '10px', marginBottom : '10px'}}
                                />
                                <div style={{textAlign:'right'}}>
                                  <Button variant="contained"  color="primary" onClick={() => handleSaveEdit(comment.commentId, editedCommentContent)}>수정</Button>
                                  <Button variant="outlined"   onClick={handleCancelEdit}>취소</Button>
                                </div>
                              </div>
                            ) : (<a href='#' style={{ marginLeft: '10px', textDecoration: 'none', color:'#333333'}} onClick={(e) => {e.preventDefault(); // 기본 동작 차단
                            handleEditCommentClick(comment);}}>수정</a>)} | <a href='#' style={{textDecoration: 'none', color:'#333333'}} onClick={(e) => {e.preventDefault();  handleCommentDelete(comment.commentId)}}>삭제</a>
                        <Typography style={{textAlign:'right'}}>답글 달기</Typography>
                      </Typography>
                      <hr style={{ border: 'none', borderBottom: '1px solid #ccc', marginTop: '1rem' }} />
                    
                    </div>
                  ))}
                </SubCard>
              </Grid>
            </Grid>
          </SubCard>
        </Grid>
      </Grid>
    </MainCard>
  );
};

export default BoardDetail;