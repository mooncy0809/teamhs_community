import { Grid, Button, TextField } from '@mui/material';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

// project imports
import SubCard from 'ui-component/cards/SubCard';
import MainCard from 'ui-component/cards/MainCard';
import { gridSpacing } from 'store/constant';

import ReactQuill from 'react-quill';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-quill/dist/quill.snow.css';
import '../css/customQuill.css'; //Quill Custom 파일


// ==============================|| ProblemEdit ||============================== //

const ProblemEdit = () => {
  const { problemId } = useParams();
  const navigate = useNavigate(); //페이지 이동

  const [problem, setProblem] = useState({
    problemTitle: '',
    problemContent: '',
  });

  const handleCancleButtonClick = () => {
    navigate(`/problem/detail/${problemId}`);
  };

  useEffect(() => {
    axios.get(`http://localhost:8090/api/problems/${problemId}`)
      .then(response => {
        console.log(response.data)
        setProblem(response.data);
      })
      .catch(error => {
        console.log('Error fetching problem details:', error);
      });
  }, [problemId]);

  const handleInputChange = (event) => {// 폼 입력값이 변경될 때 호출
    const { name, value } = event.target; // event.target 이벤트가 발생한 요소(즉, 입력 필드)
    setProblem((prevProblem) => ({
      ...prevProblem,
      [name]: value,
    }));
  };

  const insertProblem = (event) => {
    event.preventDefault();
    axios.put(`http://localhost:8090/api/problems/${problemId}`, problem)
      .then(response => {
        console.log('updated successfully:', response.data);
        navigate(`/problem/detail/${problemId}`);
      })
      .catch(error => {
        console.log('Error updating problem:', error);
      });
  };

  return(
  <MainCard  title={<span style={{ fontSize: '24px', fontWeight: 'bold' }}>문제 작성</span>} style={{ marginLeft: '8px' }}>
    <Grid container spacing={gridSpacing}>
      <Grid item xs={12}>
        <SubCard>
          <Grid container spacing={2}>
          <Grid item xs={12} >
            <TextField
              label='제목'
              variant="outlined"
              fullWidth
              name="problemTitle"
              value={problem.problemTitle}
              onChange={handleInputChange}
              sx = {{ '& fieldset' : { borderRadius: 2}}}
             />
            </Grid>
            <Grid item xs={12}>
              <div className="quill-container">
                    <ReactQuill
                      name="problemContent"
                      value={problem.problemContent} 
                      onChange={(content) => handleInputChange({ target: { name: 'problemContent', value: content } })}
                      theme="snow"
                    />
                  </div>
              </Grid>
              <Grid item xs={12} align="center">
              <Button variant="contained" style={{ marginRight: '0.5rem' }} onClick={insertProblem}>
                  저장
                </Button>
                <Button variant="outlined" onClick={handleCancleButtonClick}>
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

export default ProblemEdit;