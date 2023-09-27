import React, {useEffect, useState } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux'; // eslint-disable-line

import { Grid, Button, Typography, TextField } from '@mui/material';
import { useParams, useNavigate } from 'react-router-dom';
import SubCard from 'ui-component/cards/SubCard';
import MainCard from 'ui-component/cards/MainCard';
import { gridSpacing } from 'store/constant';

import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-quill/dist/quill.snow.css';
import './customQuill.css';

//Dialog
import Swal from "sweetalert2";

//Icons
import { ReactComponent as Reservation } from "assets/images/users/default.svg";
import { ReactComponent as UnlikeIcon } from "assets/images/icons/unlike.svg";
import { ReactComponent as LikeIcon } from "assets/images/icons/like.svg";
import { IconEye} from '@tabler/icons';



const BoardDetail = () => {

  const member = useSelector((state) => state.member); // eslint-disable-line no-unused-vars
  const [user, setUserInfo] = useState([]); 
  useEffect(() => {
    const userId = member.member.userId; // 실제 사용자 아이디로 대체해야 합니다.
    
    axios.get(`http://localhost:8090/api/auth/getUserInfo?userId=${userId}`)
      .then(response =>
        setUserInfo(response.data)
      )
      .catch(error => 
        console.log(error)
      )
  }, []);


  
  const { boardId } = useParams(); // URL에서 board_id 파라미터를 가져옴
  const [board, setBoard] = useState(null);
  const [commentList, setCommentList] = useState([]); 
 

 
  //조회
  //게시글 조회
  useEffect(() => {
    axios.get(`http://localhost:8090/board/${boardId}`)
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
    const navigate = useNavigate();
  
    const handleConfirmDelete = () => {
        // Show a confirmation dialog
        Swal.fire({
          title: "게시글 삭제",
          text: "정말 게시글을 삭제하시겠습니까?",
          icon: "warning",
          showCancelButton: true,
          confirmButtonText: "네",
          cancelButtonText: "아니요",
          confirmButtonColor: "#d33",
        })
        .then((result) => {
          if (result.isConfirmed) {
            // User confirmed deletion, proceed with the deletion
            axios.delete(`http://localhost:8090/board/delete/${boardId}`)
            .then(response => {
              console.log('Delete saved:', response.data);
              navigate('/board/list'); // '/board list' 경로로 페이지 이동
              // 삭제 성공한 경우 처리
              // Show a success message
              Swal.fire("게시글 삭제 완료", "게시글이 삭제되었습니다.", "success");
            })
            .catch(error => {
              console.error('Error delete:', error);
              // 에러 처리
              // Show an error message
              Swal.fire("삭제 오류", "게시글 삭제 중 오류가 발생했습니다.", "error");
            });
          }
        });
      };



      const handleEditMoveClick = () => {
        Swal.fire({
          title: "게시글 수정",
          text: "게시글을 수정하시겠습니까?",
          icon: "warning",
          showCancelButton: true,
          confirmButtonText: "네",
          cancelButtonText: "아니요",
          confirmButtonColor: "#d33",
        }).then((result) => {
          if (result.isConfirmed) {
            navigate(`/board/edit/${boardId}`); // 수정 버튼 : 게시글 수정(boardEdit) 페이지 이동
          }
        });
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
const deleteCommentDialog = (commentId) => {
  Swal.fire({
    title: "댓글 삭제",
    text: "정말 댓글을 삭제하시겠습니까?",
    icon: "warning",
    showCancelButton: true,
    confirmButtonText: "네",
    cancelButtonText: "아니요",
    confirmButtonColor: "#d33",
  }).then((result) => {
    if (result.isConfirmed) {
      axios
        .delete(`http://localhost:8090/comment/delete/${commentId}`)
        .then((response) => {
          console.log("Delete saved:", response.data);
          Swal.fire("댓글 삭제 완료", "댓글이 삭제되었습니다.", "success");
        })
        .catch((error) => {
          console.error("Error delete:", error);
          Swal.fire("댓글 삭제 실패", "댓글 삭제가 되지 않았습니다.", "error");
          // 에러 처리
        })
        .finally(() => {
          axios
            .get(`http://localhost:8090/comment/list/${boardId}`)
            .then((response) => setCommentList(response.data))
            .catch((error) => console.log(error));
          // 다이얼로그를 닫는 작업은 여기서 처리하지 않습니다.
        });
    }
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
  const [recommentList, setReCommentList] = useState([]);
  const [visibleReplies, setVisibleReplies] = useState([]);

  const handleWatchRecomments = (commentId) => {
    setOpenReplies((prevOpenReplies) => ({
      ...prevOpenReplies,
      [commentId]: !prevOpenReplies[commentId],
    }));
  
    // Close other open replies
    Object.keys(openReplies).forEach((key) => {
      if (key !== commentId && openReplies[key]) {
        setOpenReplies((prevOpenReplies) => ({
          ...prevOpenReplies,
          [key]: false,
        }));
      }
    });
  
    // Fetch and set the replies for the clicked comment
    if (!openReplies[commentId]) {
      axios.get(`http://localhost:8090/recomment/list/${commentId}`)
        .then(response => {
          setReCommentList(response.data);
          setVisibleReplies(response.data.slice(0, 5));
        })
        .catch((error) => {
          console.error("Error get recomment:", error);
        });
    }
  };


  const [btnText, setBtnText] = useState('답글 더보기')

  const toggleShowAllReplies = () => {

      if (visibleReplies.length !== recommentList.length) {
        setVisibleReplies(recommentList.slice(0, recommentList.length));
        setBtnText('숨기기')
      } else {
        setVisibleReplies(recommentList.slice(0, 5));
        setBtnText('더보기')
      }

      console.log("전체길이", recommentList.length)
      console.log("보여지는 길이", visibleReplies.length)
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

          axios.get(`http://localhost:8090/recomment/list/${commentId}`)
          .then(response => {
            setVisibleReplies(response.data);
          })
          .catch((error) => {
            console.error("Error get recomment:", error);
          });
        })
        .catch((error) => {
          console.error("Error posting recomment:", error);
          // 에러 처리
        });
    };
 
    //답글 삭제
    const handleReCommentDelete = (recommentId, commentId) => {

      Swal.fire({
        title: "답글 삭제",
        text: "정말 답글을 삭제하시겠습니까?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "네",
        cancelButtonText: "아니요",
        confirmButtonColor: "#d33",
      })
      .then((result) => {
        if (result.isConfirmed) {
          
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

            axios.get(`http://localhost:8090/recomment/list/${commentId}`)
            .then(response => {
              setVisibleReplies(response.data);
            })
            .catch((error) => {
              console.error("Error get recomment:", error);
            });
            Swal.fire("답글 삭제 완료", "해당 답글이 삭제되었습니다.", "success");
          })
          .catch(error => {
            console.error('Error delete:', error);
            // 에러 처리
            Swal.fire("삭제 오류", "답글 삭제 중 오류가 발생했습니다.", "error");
          });

        }
      });

    };


    //좋아요 기능
    const [liked, setLiked] = useState(""); // 좋아요 상태를 관리하는 상태 변수
    
    //like가 눌려져 있는지 설정하기
    useEffect(() => {
      axios.get(`http://localhost:8090/like/check/${boardId}/${member.member.userId}`)
        .then(response => 
          setLiked(response.data)
          )
        .catch(error => console.log(error))
    });


    const handleLikeClick = () => {
      // 서버에 좋아요 요청 보내기
      axios.post(`http://localhost:8090/like/${boardId}/${member.member.userId}`)
        .then(response => {
          // 성공적으로 좋아요를 눌렀을 때 클라이언트에서 UI 업데이트
          if (response.data.success) {
            setLiked(true);
            axios.get(`http://localhost:8090/like/check/${boardId}/${member.member.userId}`)
            .then(response => 
              setLiked(response.data)
              )
            .catch(error => console.log(error))

            if (liked === false){
              board.likeCnt = board.likeCnt + 1
            }
            else{
              board.likeCnt = board.likeCnt - 1
            }
            
          }
        })
        .catch(error => {
          console.error('Error liking post:', error);
        });
    };

    

    // 좋아요 상태에 따라 아이콘 표시(true = 좋아요 한 상태, false = 좋아요 안 한 상태)
    const likeIcon = liked ? <LikeIcon/> : <UnlikeIcon/>;

  
    const BoardPost = ({board, onLikeClick}) =>{
      return (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginBottom: '8px' }}>
                <div
                      role="button" // 클릭 가능한 요소로 역할을 설정합니다.
                      tabIndex={0} 
                      onClick={onLikeClick}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter') {
                          handleLikeClick();
                        }
                      }}
                      style={{
                        width: '40px',
                        height: '40px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        cursor: 'pointer' // Add cursor pointer for better user experience
                      }} 
                    >
                    {likeIcon}
                  </div>
                  <Typography variant="body1" style={{marginBottom : '15px', fontWeight:'bold', fontSize:'14px', color: '#333333' }}>
                          {board.likeCnt}
                          
                        </Typography>
                          
                <Button variant="outlined" onClick={handleCancleButtonClick}>
                  목록으로
                </Button>
              </div>
             
              
      );
    }

    const BoardTitle = ({board}) =>{
      return(
        <Grid container justifyContent="space-between" alignItems="center" marginTop={"10px"}>
          <Typography variant="body1" style={{ fontSize:'14px', color: '#333333' }}>
            {board.userId.slice(0, -2) + '**' + " | " + board.boardDate + " | "}
            <IconEye fontSize="inherit" style={{ height : '24px', verticalAlign: 'middle'}} /> {/* 아이콘을 추가합니다. */}
              {board.viewCnt}
          </Typography>

          <Grid item>
            {/* 게시글 수정/삭제 */}
            {board.userId === member?.member?.userId ? (
              <>
              <Typography style={{ fontWeight: 'bold', fontSize: '16px'}} variant="contained" onClick={handleEditMoveClick}>수정</Typography>
              {' | '}
              <Typography style={{ fontWeight: 'bold', fontSize: '16px'}} variant="text" onClick={handleConfirmDelete}>삭제</Typography>
              </>
            ) : ( 
              null
              )}
          </Grid>
        </Grid>
      );
    }


    const BoardContent = ({board}) =>{
      return(
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
        );
    }

    




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
              {/* 게시글 타이틀 */}
              <Grid item xs={12}>
                <Typography variant="h6" style={{ fontWeight: 'bold', fontSize: '20px'}}>
                  {board.boardTitle}
                </Typography>
                <BoardTitle board={board} />
                <hr style={{ border: 'none', borderBottom: '1px solid #333', borderBottomColor: '#333333' }} />
              </Grid>

              {/* 게시글 내용 */}
              <Grid item xs={12}>
                <BoardContent board = {board} />         
              </Grid>

              {/*좋아요, 목록으로 버튼 */}    
              <Grid item xs={12} style={{ textAlign: 'center', marginTop: '1rem' }}>
                   <BoardPost board = {board} liked = {liked} onLikeClick={handleLikeClick}/>
                   <hr style={{ border: 'none', borderBottom: '1px solid #333', borderBottomColor: '#333333' }} />
              </Grid>


              {/* 댓글*/}
              <Grid item xs={12}>

                  {/* 전체 댓글 갯수 */}
                  <Typography variant="h6" style={{fontWeight: 'bold', fontSize: '18px',  color: 'your_desired_color_here', marginBottom: '30px' }}>
                  댓글 {totalComments}개
                  </Typography>

                  {/* 댓글 리스트 폼 */}
                  {commentList.map(comment => (
                    <div key={comment.commentId} style={{ marginBottom: '1rem', marginLeft:"10px"}}>

                      {/*댓글 내용*/}
                      <Typography variant="body1" style={{ fontWeight: "bold", color: '#333333', marginBottom: '10px' }}>
                        {comment.commentContent}
                      </Typography>

                      {/*댓글 작성자*/}
                      <Typography variant="body2" style={{ color: 'grey' }}>
                          {comment.userId.slice(0, -2) + '**' + " | " + comment.commentDate}
                          
                          {/* 댓글 수정 폼 */}
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
                              {/*댓글 수정 */}
                              <a href="#"style={{ marginLeft: '10px', textDecoration: 'none', color: '#333333' }}onClick={(e) => {e.preventDefault(); handleEditCommentClick(comment); }}>수정</a>
                              {' | '}
                              {/*댓글 삭제 */}
                              <a href="#" style={{ textDecoration: 'none', color: '#333333' }}onClick={(e) => { e.preventDefault(); deleteCommentDialog(comment.commentId);}} >삭제</a>
                                          </>
                              ) : ( 
                                null
                             )}

                              {/* 답글*/}
                              {/* 답글 갯수 표시 */}
                            <div 
                                style={{textAlign:'right'}}><a href="#" style={{ textDecoration: 'none', color: 'grey' }} 
                                onClick={(e) => {
                                        e.preventDefault(); 
                                        handleWatchRecomments(comment.commentId); 
                                        setReCommentId(comment.commentId); 
                                        }}
                            >
                              {openReplies[comment.commentId] ? "닫기" : `답글 ${commentRecommentCounts[comment.commentId] || 0}개`}</a>
                                </div>
                                    
                                {/* 답글 리스트 폼 */}     
                                {openReplies[comment.commentId] && ReCommentId === comment.commentId && (
                                  <div>
                                    {visibleReplies.map(recomment => (
                                          <div key={recomment.reCommentId} style={{ marginBottom: '1rem', marginLeft:"20px", color:"grey"}}>
                                            <Typography variant="body1" style={{ fontWeight: "bold", color: '#333333', marginBottom: '10px' }}>
                                              {recomment.recommentContent}
                                            </Typography>
                                            <Typography variant="body2" style={{ color: 'grey' }}>
                                                {recomment.userId.slice(0, -2) + '**' + " | " + recomment.recommentDate}
                                                  {/*답글 삭제 버튼*/}
                                                  {recomment.userId === member?.member?.userId ? (
                                                      <a href="#"style={{ textDecoration: 'none', color: '#333333', marginLeft: '10px',}}
                                                      onClick={(e) => {e.preventDefault(); handleReCommentDelete(recomment.recommentId, comment.commentId);}}>
                                                        삭제
                                                      </a>
                                                    ) : (
                                                      null
                                                    )}
                                              </Typography>
                                            <hr style={{ border: 'none', borderBottom: '1px solid #ccc', marginTop: '1rem' }} />
                                          </div>
                                        ))}
     
                                        {(visibleReplies.length > 5 || visibleReplies.length !== recommentList.length) && (
                                          <Typography
                                            style={{ textAlign: 'right', fontSize: '16px', color: 'grey', fontWeight: 'bold', marginBottom: '10px' }}
                                            onClick={() => toggleShowAllReplies()}
                                          >
                                            {btnText}
                                          </Typography>
                                        )}

                                      {/* 답글 작성 폼 */}                    
                                      {member?.member?.userId ? (
                                        <>               
                                            <TextField
                                              label={`${user.userName}님 답글 작성`}
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

              

              {/* 현재 접속중인 사용자 */}
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
                    label={`${user.userName}님 댓글을 작성해보세요!`}
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