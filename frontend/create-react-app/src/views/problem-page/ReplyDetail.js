import { Grid, Button, Typography, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Link } from '@mui/material';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { useParams , useNavigate } from 'react-router-dom';
import { BeatLoader } from "react-spinners"; //스피너 import

// project imports
import SubCard from 'ui-component/cards/SubCard';
import MainCard from 'ui-component/cards/MainCard';
import { gridSpacing } from 'store/constant';


// ==============================|| ReplyDetail ||============================== //

const ReplyDetail = () => {
  const {replyId} = useParams();
  const [reply, setReply] = useState(null);
  const [problemId, setProblemId] = useState(null);
  const [problem, setProblem] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);
  const navigate = useNavigate();


  useEffect(() => {
    if (replyId) { 
      axios.get(`http://localhost:8090/api/replies/${replyId}`)
        .then(response => {
          setReply(response.data);
          setProblemId(response.data.problemId);
          console.log(response.data.problemId);
          console.log(problemId);
        })
        .catch(error => console.log('Error fetching reply details:',error))
    }
}, [replyId,problemId]);

useEffect(() => {
  if (problemId) { 
    axios.get(`http://localhost:8090/api/problems/${problemId}`)
      .then(response => {
        setProblem(response.data);
        console.log(response.data);
      })
      .catch(error => console.log('Error fetching problem details:',error))
      
  }
}, [problemId]);

const handleDelete = () => {
  setOpenDialog(true);
};

const handleConfirmDelete = () => {
  axios.delete(`http://localhost:8090/api/replies/${replyId}`)
    .then(response => {
      console.log('deleted successfully:', response.data);
      navigate(`/problem/detail/${problemId}`);
    })
    .catch(error => {
      console.log('Error deleting reply:', error);
    });
  setOpenDialog(false);
};

const handleCloseDialog = () => {
  setOpenDialog(false);
};

const handleCancleButtonClick = () => {
  navigate(`/problem/detail/${problemId}`);
};

if (!reply) {
  return <div><BeatLoader color="#0048ff" /></div>;
}

  return(
    <MainCard title={<span style={{ fontSize: '24px', fontWeight: 'bold' }}>제출답변</span>} style={{ marginLeft: '8px' }}>
    <Grid container spacing={gridSpacing}>
      <Grid item xs={12}>
        <SubCard>
        <Grid container spacing={2}>
              {/* 문제 출력 */}
              <Grid item xs={12}>
                <Typography variant="h6" style={{fontWeight: 'bold', fontSize: '18px', color: 'your_desired_color_here' }}>
              <strong>[{problemId}번 문제]</strong>
              {problem && problem.problemContent ? (
                <div
                  dangerouslySetInnerHTML={{ __html: problem.problemContent }}
                  style={{
                    fontSize: '16px',
                    minHeight: '10px',
                    height: '100%',
                    width: '100%'
                  }}
                ></div>
              ) : null}
                </Typography>

                <hr style={{border: 'none', borderBottom: '1px solid #333', borderBottomColor: '#333333' }} />

                {/* 답변내용 출력 */}
                <Grid container justifyContent="space-between"  marginTop={"10px"}>
                <Typography variant="body1" align="left" style={{  color: '#333333', marginBottom:"10px"}}>
                  {reply.userId.slice(0, -2) + '**' + " | " + reply.replyDate} 
                </Typography>
                <Grid item>
                  <Typography variant="body1" align="right" style={{  color: '#333333', marginBottom:"10px"}}>
                  <Link href={`/reply/edit/${replyId}`} underline="hover" color={"black"}>
                    {"수정"}
                  </Link>&nbsp;|&nbsp;
                  <Link underline="hover" component="button" onClick={handleDelete} color={"black"}>
                    {"삭제"}
                  </Link> 
                  </Typography>
                </Grid>
               </Grid>
               </Grid>
                
              <Grid item xs={12}>
              <div
                  dangerouslySetInnerHTML={{__html: reply.replyContent}}
                  style={{
                    fontSize: '16px',
                    color: '',
                    minHeight : "400px",
                    height: "100%",
                    width: "100%"}}
                ></div>
              </Grid>
              <Grid item xs={12} style={{ textAlign: 'center' }}>
                <Button variant="outlined" onClick={handleCancleButtonClick}>뒤로가기</Button>
              </Grid>
            </Grid>
        </SubCard>
      </Grid>
    </Grid>
    <Dialog open={openDialog} onClose={handleCloseDialog}>
        <DialogTitle>답변 삭제</DialogTitle>
        <DialogContent>
          <DialogContentText>
            정말로 이 답변을 삭제하시겠습니까?
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

export default ReplyDetail;