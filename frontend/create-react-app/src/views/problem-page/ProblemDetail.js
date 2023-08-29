import { Grid, Button, Typography, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Link, Pagination } from '@mui/material';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { useParams , useNavigate } from 'react-router-dom';
import { BeatLoader } from "react-spinners"; //스피너 import


// project imports
import SubCard from 'ui-component/cards/SubCard';
import MainCard from 'ui-component/cards/MainCard';
import { gridSpacing } from 'store/constant';
import Table from 'react-bootstrap/Table';



// ==============================|| ProblemDetail ||============================== //

const ProblemDetail = () => {
  const {problemId} = useParams();
  const [problem, setProblem] = useState(null);
  const [reply, setReply] = useState(null);
  const [page, setPage] = useState(0); // 현재 페이지 번호
  const [totalPages, setTotalPages] = useState(0); // 총 페이지 수
  const [openDialog, setOpenDialog] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (problemId) { 
      axios.get(`http://localhost:8090/api/problems/${problemId}`)
        .then(response => setProblem(response.data))
        .catch(error => console.log('Error fetching problem details:',error))
    }
}, [problemId]);

useEffect(() => {
  axios.get(`http://localhost:8090/api/replies/problem/${problemId}?page=${page}&size=3`)
      .then(response => {
        setReply(response.data.content);
        setTotalPages(response.data.totalPages);
        console.log(response.data);
      })
      .catch(error => console.log(error))
}, [page]);

const handleDelete = () => {
  setOpenDialog(true);
};

const handleConfirmDelete = () => {
  axios.delete(`http://localhost:8090/api/problems/${problemId}`)
    .then(response => {
      console.log('deleted successfully:', response.data);
      navigate('/problem/list');
    })
    .catch(error => {
      console.log('Error deleting problem:', error);
    });
  setOpenDialog(false);
};

const handleCloseDialog = () => {
  setOpenDialog(false);
};

const handleCancleButtonClick = () => {
  navigate('/problem/list'); 
};

const handleProblemSolving = () => {
  navigate(`/reply/write/${problemId}`); // 문제풀기 페이지로 이동
};

if (!problem) {
  return <div><BeatLoader color="#0048ff" /></div>;
}

  return(
    <MainCard title={<span style={{ fontSize: '24px', fontWeight: 'bold' }}>문제</span>} style={{ marginLeft: '8px' }}>
    <Grid container spacing={gridSpacing}>
      <Grid item xs={12}>
        <SubCard>
        <Grid container spacing={2} >
              <Grid item xs={12}>
                <Typography variant="h6" style={{fontWeight: 'bold', fontSize: '18px', color: 'your_desired_color_here' }}>
                  {problem.problemTitle}
                </Typography>
                <hr style={{border: 'none', borderBottom: '1px solid #333', borderBottomColor: '#333333' }} />
                <Grid container justifyContent="space-between"  marginTop={"10px"}>
                <Typography variant="body1" align="left" style={{  color: '#333333', marginBottom:"10px"}}>
                  {problem.userId.slice(0, -2) + '**' + " | " + problem.problemDate} 
                </Typography>
                <Grid item>
                  <Typography variant="body1" align="right" style={{  color: '#333333', marginBottom:"10px"}}>
                  <Link href={`/problem/edit/${problemId}`} underline="hover" color={"black"}>
                    {"수정"}
                  </Link>&nbsp;|&nbsp;
                  <Link href={`/problem/edit/${problemId}`} underline="hover" component="button" onClick={handleDelete} color={"black"}>
                    {"삭제"}
                  </Link> 
                  </Typography>
                </Grid>
               </Grid>
               </Grid>
                
              <Grid item xs={12}>
              <div
                  dangerouslySetInnerHTML={{__html: problem.problemContent}}
                  style={{
                    fontSize: '16px',
                    color: '',
                    minHeight : "400px",
                    height: "100%",
                    width: "100%"}}
                ></div>
              </Grid>
              <Grid item xs={12} style={{ textAlign: 'center', marginBottom:"30px" }}>
                <Button variant="contained" style={{ marginRight: '0.5rem'}} color="error">정답확인</Button>
                <Button variant="contained" style={{ marginRight: '0.5rem'}} onClick={handleProblemSolving}>문제풀기</Button>
                <Button variant="outlined" onClick={handleCancleButtonClick}>뒤로가기</Button>
              </Grid>
            </Grid>
          
            {/* 답변 목록 출력 */}
            <Grid spacing={gridSpacing}> 
          <Table bordered hover size="sm" style = {{minHeight : '100%'}} >
                        <thead>
                            <tr>
                                <th style={{ width: '5%', textAlign: 'center' , backgroundColor: '#f5f5f5' }}>답변</th>
                                <th style={{ width: '10%', textAlign: 'center' , backgroundColor: '#f5f5f5' }}>작성자 </th>
                                <th style={{ width: '10%', textAlign: 'center' , backgroundColor: '#f5f5f5' }}>내용 </th>
                                <th style={{ width: '10%', textAlign: 'center' , backgroundColor: '#f5f5f5' }}>결과</th>
                                <th style={{ width: '10%', textAlign: 'center' , backgroundColor: '#f5f5f5' }}>날짜</th>
                            </tr>
                        </thead>
                        <tbody>
                          {reply !== null ? (
                            reply.map((item) => (
                              <tr key={item.replyId}>
                                <td style={{ textAlign: 'center' }}>{item.replyId}</td>
                                <td style={{ textAlign: 'center' }}>
                                  <Link
                                    href={`/reply/detail/${item.replyId}`}
                                    style={{
                                      color: 'black',
                                      textDecoration: 'none',
                                      transition: 'color 0.3s',
                                    }}
                                    onMouseEnter={(e) => {
                                      e.target.style.color = 'rgb(0, 0, 190)';
                                    }}
                                    onMouseLeave={(e) => {
                                      e.target.style.color = 'black';
                                    }}
                                  >
                                    {item.userId}
                                  </Link>
                                </td>
                                <td style={{ textAlign: 'center' }}>{item.replyContent}</td>
                                <td style={{ textAlign: 'center' }}>{item.replyState}</td>
                                <td style={{ textAlign: 'center' }}>{item.replyDate}</td>
                              </tr>
                            ))
                          ) : (
                            <tr>
                              <td colSpan={4} style={{ textAlign: 'center' }}>
                                No replies available.
                              </td>
                            </tr>
                          )}
                        </tbody>
            </Table>
        <Grid
            container
            justifyContent="center"
            style={{ marginTop: '20px' }}
            >
            <Pagination
              count = {totalPages}
              page = {page + 1}
              onChange = {(event, value) => setPage(value - 1)}
            />
            </Grid>
    </Grid>
        </SubCard>
      </Grid>
    </Grid>
    
    <Dialog open={openDialog} onClose={handleCloseDialog}>
        <DialogTitle>문제 삭제</DialogTitle>
        <DialogContent>
          <DialogContentText>
            정말로 이 문제를 삭제하시겠습니까?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog} color="primary">
            취소
          </Button>
          <Button onClick={handleConfirmDelete} color="primary" autoFocus>
            삭제
          </Button>
        </DialogActions>
      </Dialog>
  </MainCard>
  );
};

export default ProblemDetail;