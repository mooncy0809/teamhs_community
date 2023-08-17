import { Grid, Button, Typography, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { useParams ,Link, useNavigate } from 'react-router-dom';
import { BeatLoader } from "react-spinners"; //스피너 import

// project imports
import SubCard from 'ui-component/cards/SubCard';
import MainCard from 'ui-component/cards/MainCard';
import { gridSpacing } from 'store/constant';


// ==============================|| ProblemDetail ||============================== //

const ProblemDetail = () => {
  const {problemId} = useParams();
  const [problem, setProblem] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (problemId) { 
      axios.get(`http://localhost:8090/api/problems/${problemId}`)
        .then(response => setProblem(response.data))
        .catch(error => console.log('Error fetching problem details:',error))
    }
}, [problemId]);

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

if (!problem) {
  return <div><BeatLoader color="#0048ff" /></div>;
}

  return(
    <MainCard title={<span style={{ fontSize: '24px', fontWeight: 'bold' }}>문제</span>} style={{ marginLeft: '8px' }}>
    <Grid container spacing={gridSpacing}>
      <Grid item xs={12}>
        <SubCard>
        <Grid container spacing={2}>
              <Grid item xs={12}>
                <Typography variant="h6" style={{fontWeight: 'bold', fontSize: '18px', color: 'your_desired_color_here' }}>
                  {problem.problemTitle}
                </Typography>
                <hr style={{border: 'none', borderBottom: '1px solid #333', borderBottomColor: '#333333' }} />
                <Typography variant="body1" style={{  color: '#333333', marginBottom:"10px" }}>
                 {problem.userId.slice(0, -2) + '**' + " | " + problem.problemDate}
                </Typography>
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
              <Grid item xs={12} style={{ textAlign: 'center' }}>
                <Link to={`/problem/edit/${problemId}`} style={{ textDecoration: 'none' }}>
                  <Button variant="contained" color="primary" style={{ marginRight: '0.5rem' }}>수정</Button>
                </Link>
                <Button variant="contained" color="secondary" onClick={handleDelete}>삭제</Button>
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