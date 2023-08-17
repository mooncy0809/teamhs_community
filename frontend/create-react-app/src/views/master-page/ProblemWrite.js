import { Grid, Button, TextField } from '@mui/material';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

// project imports
import SubCard from 'ui-component/cards/SubCard';
import MainCard from 'ui-component/cards/MainCard';
import { gridSpacing } from 'store/constant';

import ReactQuill from 'react-quill';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-quill/dist/quill.snow.css';
import '../css/customQuill.css'; //Quill Custom 파일


// ==============================|| ProblemWrite ||============================== //

const ProblemWrite = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const navigate = useNavigate(); //페이지 이동
 
  const handleChange_title = (e)=>{
    e.preventDefault();
    setTitle(e.target.value);
  }
  
  const handleChange_content = (value)=>{
    setContent(value);
  }

  const handleCancleButtonClick = () => {
    navigate('/problem/list');
  };

  const insertProblem = () => {
      axios.post('http://localhost:8090/api/problems/write', {
        problemPoint : 20,
        problemType : 1,
        problemTitle : title,
        problemContent : content
      })
      .then(response => {
        console.log(response);
        navigate('/problem/list');
      })
      .catch(function (error) {
        console.log(error);
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
                  variant="outlined"
                  fullWidth
                  value={title}
                  onChange={handleChange_title}
                  label='제목'
                  sx = {{ '& fieldset' : { borderRadius: 2}}}

             />
            </Grid>
            <Grid item xs={12}>
              <div className="quill-container">
                    <ReactQuill
                      value={content}
                      onChange={handleChange_content}
                      theme="snow"
                      placeholder="내용을 입력하세요."
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

export default ProblemWrite;