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
import { useSelector } from 'react-redux'; // eslint-disable-line
import { ReactComponent as Reservation } from "assets/images/users/default.svg";


const BoardDetail = () => {

  const member = useSelector((state) => state.member); // eslint-disable-line no-unused-vars


  const { boardId } = useParams(); // URL에서 board_id 파라미터를 가져옴
  
  const [board, setBoard] = useState(null);
  const [commentList, setCommentList] = useState([]); 
  const [recommentList, setReCommentList] = useState([]);

 
  //조회

  //게시글 조회
  useEffect(() => {
    axios.get(`http://localhost:8090/board/${boardId}`) //게시글 목록 조회
      .then(response => setBoard(response.data))
      .catch(error => console.log(error))
  }, [boardId]);
  
  //전체 댓글 갯수 조회
  const totalComments = commentList.length;

  //댓글 조회
  useEffect(() => {
    axios.get(`http://localhost:8090/comment/list/${boardId}`)
      .then(response => setCommentList(response.data))
      .catch(error => console.log(error))
  }, [boardId]);

//답글 갯수 조회
const [commentRecommentCounts, setCommentRecommentCounts] = useState({});

useEffect(() => {
  axios.get(`http://localhost:8090/comment/list/${boardId}`)
    .then(response => {
      setCommentList(response.data);

      // 답글 갯수 업데이트
      const newCounts = {};
      response.data.forEach(comment => {
        axios.get(`http://localhost:8090/recomment/list/${comment.commentId}`)
          .then(response => {
            newCounts[comment.commentId] = response.data.length;
            setCommentRecommentCounts(prevCounts => ({ ...prevCounts, ...newCounts }));
          })
          .catch(error => console.error("Error get recomment:", error));
      });
    })
    .catch(error => console.log(error))
}, [boardId]);


//게시글 수정/삭제

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




//댓글 작성-삭제-수정

const [commentContent, setCommentContent] = useState(""); 
 
//댓글 작성
const handleCommentWrite = () => { 
const newComment = {
  userId: member.member.userId,
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

//댓글 삭제
const handleCommentDelete = (commentId) => {
  axios.delete(`http://localhost:8090/comment/delete/${commentId}`)
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

//댓글 수정 로직
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



 
  //답글 클릭 시 답글 리스트 조회
  const [openReplies, setOpenReplies] = useState({});
  
  const handleWatchRecomments = (commentId) => {
    setOpenReplies((prevOpenReplies) => ({
      ...prevOpenReplies,
      [commentId]: !prevOpenReplies[commentId],
    }));
  
    // 기존 열려있던 댓글 닫기
    Object.keys(openReplies).forEach((key) => {
      if (key !== commentId && openReplies[key]) {
        setOpenReplies((prevOpenReplies) => ({
          ...prevOpenReplies,
          [key]: false,
        }));
      }
    });
  
    axios.get(`http://localhost:8090/recomment/list/${commentId}`)
      .then(response => setReCommentList(response.data))
      .catch((error) => {
        console.error("Error get recomment:", error);
      });
  };


    //답글 작성 - 삭제

    const [ReCommentId, setReCommentId] = useState(null); // 답글 작성 상태 관리
    const [reCommentContent, setReCommentContent] = useState(""); // 답글 내용 상태 관리
    
    //답글 작성
    const handleReCommentWrite = (commentId) => {
      const newReComment = {
        userId: member.member.userId,
        boardId: parseInt(boardId), // boardId를 숫자로 변환하여 넣어줌
        commentId: commentId,
        reCommentContent: reCommentContent,
      };
    
      axios
        .post("http://localhost:8090/recomment/write", newReComment)
        .then((response) => {
          console.log("Recomment posted:", response.data);

          const updatedCommentRecommentCounts = {
            ...commentRecommentCounts,
            [commentId]: (commentRecommentCounts[commentId] || 0) + 1,
          };
    
          setCommentRecommentCounts(updatedCommentRecommentCounts);

          
          setOpenReplies(prevOpenReplies => ({ ...prevOpenReplies, [commentId]: false }));    
          setReCommentContent("");
          setReCommentId(null);
        })
        .catch((error) => {
          console.error("Error posting recomment:", error);
          // 에러 처리
        });
    };
 
    //답글 삭제
    const handleReCommentDelete = (recommentId, commentId) => {
      axios.delete(`http://localhost:8090/recomment/delete/${recommentId}`) //댓글 삭제 버튼 클릭
      .then(response => {
        console.log('Delete saved:', response.data);
        // 삭제 성공한 경우 처리
        
        const updatedCommentRecommentCounts = {
          ...commentRecommentCounts,
          [commentId]: (commentRecommentCounts[commentId] || 0) - 1,
        };
  
        setCommentRecommentCounts(updatedCommentRecommentCounts);

        setReCommentList(prevReComments => prevReComments.filter(recomment => recomment.reCommentId !== recommentId));
        handleWatchRecomments(commentId)
      })
      .catch(error => {
        console.error('Error delete:', error);
        // 에러 처리
      });
    };


  //게시글 내용이 없거나 로딩이 되지 않을 경우
  if (!board) {
    return <div style={{fontWeight :"24px"}}>Loading...</div>; // 로딩 중일 때 표시할 내용
  }


  return (
    <MainCard title={<Button onClick = {handleCancleButtonClick} style={{ fontSize: '24px', fontWeight: 'bold' , color:"#333333"}}>{board.cateId === 1 ? '뉴스' : '자유게시판'}</Button>}>
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
                    {board.userId.slice(0, -2) + '**' + " | " + board.boardDate + "| 조회수 : " + board.boardCnt}
                  </Typography>
                  <Grid item>
                    {/* 게시글 수정/삭제 */}
                    {board.userId === member?.member?.userId ? (
                      <>
                       <Typography variant="contained" onClick={handleEditMoveClick}>수정</Typography> | <Typography variant="text" onClick={handleDeleteButtonClick}>삭제</Typography>
                       </>
                    ) : ( null
                      )}
                  
                    <Dialog open={openDialog} onClose={handleCloseDialog}>
                      <DialogTitle style={{fontSize:'20px', fontWeight: 'bold'}}>게시글 삭제</DialogTitle>
                      <DialogContent>
                        <DialogContentText style={{fontSize:'16px'}}>정말 게시글을 삭제하시겠습니까?</DialogContentText>
                      </DialogContent>
                      <DialogActions>
                        <Button style={{fontSize:'16px'}} onClick={handleConfirmDelete}>네</Button>
                        <Button style={{fontSize:'16px'}} onClick={handleCloseDialog} >취소</Button>
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
                <Button variant="outlined" onClick={handleCancleButtonClick} style={{textAlign:'center'}}>목록으로</Button>
                <hr style={{ border: 'none', borderBottom: '1px solid #333', borderBottomColor: '#333333' }} />
              </Grid>
              {/* 댓글 리스트 폼 */}
              <Grid item xs={12}>
                  <Typography variant="h6" style={{fontWeight: 'bold', fontSize: '18px',  color: 'your_desired_color_here', marginBottom: '30px' }}>
                  댓글 {totalComments}개
                  </Typography>
                  {commentList.map(comment => (
                    <div key={comment.commentId} style={{ marginBottom: '1rem', marginLeft:"10px"}}>
                      <Typography variant="body1" style={{ fontWeight: "bold", color: '#333333', marginBottom: '10px' }}>
                        {comment.commentContent}
                      </Typography>

                      <Typography variant="body2" style={{ color: 'grey' }}>
                          {comment.userId.slice(0, -2) + '**' + " | " + comment.commentDate}
                          {/* 댓글 수정 폼 */}
                          {/* 댓글이 수정 중 일 경우*/}
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
                                style={{ marginTop: '10px', marginBottom: '10px' }}
                              />
                              <div style={{ textAlign: 'right' }}>
                                <Button variant="contained" color="primary" onClick={() => handleSaveEdit(comment.commentId, editedCommentContent)}>수정</Button>
                                <Button variant="outlined" onClick={handleCancelEdit}>취소</Button>
                              </div>
                            </div>
                          ) : (
                            <>
                            {/*댓글 수정/삭제 버튼*/}
                            {comment.userId === member?.member?.userId ? (
                              <>
                              <a href="#"style={{ marginLeft: '10px', textDecoration: 'none', color: '#333333' }}onClick={(e) => {e.preventDefault(); handleEditCommentClick(comment); }}>수정</a>
                              {' | '}
                              <a href="#"style={{ textDecoration: 'none', color: '#333333' }}onClick={(e) => {e.preventDefault(); handleCommentDelete(comment.commentId);}}>삭제</a>
                              </>
                              ) : ( null
                             )}

                              {/* 답글 달기 버튼 클릭 */}
                              <div style={{textAlign:'right'}}><a href="#" style={{ textDecoration: 'none', color: 'grey' }} 
                              onClick={(e) => {
                                      e.preventDefault(); 
                                      handleWatchRecomments(comment.commentId); 
                                      setReCommentId(comment.commentId); 
                                      }}>
     
                                {openReplies[comment.commentId] ? "닫기" : `답글 ${commentRecommentCounts[comment.commentId] || 0}개`}</a>
                              </div>
                                    
                              {openReplies[comment.commentId] && ReCommentId === comment.commentId && (
                                 <div>
                                   {/* 답글 리스트 폼 */}
                                  {recommentList.map(recomment => (
                                        <div key={recomment.reCommentId} style={{ marginBottom: '1rem', marginLeft:"20px", color:"grey"}}>
                                          <Typography variant="body1" style={{ fontWeight: "bold", color: '#333333', marginBottom: '10px' }}>
                                            {recomment.reCommentContent}
                                          </Typography>

                                          <Typography variant="body2" style={{ color: 'grey' }}>
                                              {recomment.userId.slice(0, -2) + '**' + " | " + recomment.recommentDate}
                                              {/* 답글 수정 폼 */}
                                              {editingCommentId === recomment.reCommentId ? (
                                                <div>
                                                  <TextField
                                                    label="답글 수정"
                                                    multiline
                                                    rows={4}
                                                    variant="outlined"
                                                    fullWidth
                                                    value={editedCommentContent}
                                                    onChange={(e) => setEditedCommentContent(e.target.value)}
                                                    style={{ marginTop: '10px', marginBottom: '10px' }}
                                                  />
                                                  <div style={{ textAlign: 'right' }}>
                                                    <Button variant="contained" color="primary" onClick={() => handleSaveEdit(comment.commentId, editedCommentContent)}>수정</Button>
                                                    <Button variant="outlined" onClick={handleCancelEdit}>취소</Button>
                                                  </div>
                                                </div>
                                              ) : (
                                                <>
                                                {/*답글 삭제 버튼*/}
                                                {recomment.userId === member?.member?.userId ? (
                                                  <a href="#"style={{ textDecoration: 'none', color: '#333333', marginLeft: '10px',}}onClick={(e) => {e.preventDefault(); handleReCommentDelete(recomment.recommentId, comment.commentId);}}>삭제</a>
                                                  ) : (null
                                                  )}
                                                  </>
                                                )}
                                            </Typography>
                                          <hr style={{ border: 'none', borderBottom: '1px solid #ccc', marginTop: '1rem' }} />
                                        </div>
                                      ))}    

                                    {member?.member?.userId ? (
                                                    <>               
                                      <TextField
                                        label="답글 작성"
                                        multiline
                                        rows={3}
                                        variant="outlined"
                                        fullWidth
                                        value={reCommentContent}
                                        onChange={(e) => setReCommentContent(e.target.value)}
                                        style={{ marginTop: '10px', marginBottom: '10px' }}
                                      />

                                      <div style={{ textAlign: 'right' }}>
                                        <Button variant="contained" color="primary" onClick={() => handleReCommentWrite(comment.commentId)} disabled={!reCommentContent}>작성</Button>
                                      </div>
                                      </>
                                      ) : (
                                        <Typography variant="body1" style={{margin:'20px', fontSize:'16px', fontWeight: 'bold', color: '#333333' }}>
                                          답글 작성을 위해 로그인 해주세요.
                                        </Typography>
                                      )}
                                    </div>
                                    )}
                                  </>
                                )}
                        </Typography>
                      <hr style={{ border: 'none', borderBottom: '1px solid #ccc', marginTop: '1rem' }} />
                    </div>
                  ))}
              </Grid>

              

              {/* 사용자 이름 */}
              {member?.member?.userId ? (
                <>
                {/* 사용자 프로필 이미지 */}
                <div style={{ display: 'flex', alignItems: 'center', marginLeft:'15px' }}>
                <Reservation width="35px" height="35px" />
                <Typography variant="body1" style={{ marginLeft:'10px', fontSize:'16px', fontWeight: 'bold', color: '#333333' }}>
                  {member.member.userId}
                </Typography>
                </div>
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
                  <Button onClick={handleCommentWrite} variant="contained" color="primary"  disabled={!commentContent}>댓글 작성</Button>
                </Grid>
              </>
              ) : (
                <Typography variant="body1" style={{margin:'20px', fontSize:'16px', fontWeight: 'bold', color: '#333333' }}>
                  댓글 작성을 위해 로그인 해주세요.
                </Typography>
              )}
              
            </Grid>
          </SubCard>
        </Grid>
      </Grid>
    </MainCard>
  );
};

export default BoardDetail;