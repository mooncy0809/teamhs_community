import { Grid, Button, TextField, Select, MenuItem, InputLabel, FormControl } from '@mui/material';
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
  const [category, setCategory] = useState("");
  const [problemtype, setProblemtype] = useState("");
  const [point, setPoint] = useState("");

  const navigate = useNavigate(); //페이지 이동
 
  const handleChange_title = (e)=>{
    e.preventDefault();
    setTitle(e.target.value);
  }
  
  const handleChange_content = (value)=>{
    setContent(value);
  }

  const handleChange_point = (e) => {
    setPoint(e.target.value); 
  };

  const handleChange_category = (e) => {
    setCategory(e.target.value); 
  };

  const handleChange_problemtype = (e) => {
    setProblemtype(e.target.value);
  };

  const handleCancleButtonClick = () => {
    navigate('/problem/list');
  };

  const insertProblem = () => {
      axios.post('http://localhost:8090/api/problems/write', {
        problemPoint : point,
        problemType : problemtype,
        cateId : category,
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
          <Grid item xs={7} >
            <TextField
                  variant="outlined"
                  fullWidth
                  value={title}
                  onChange={handleChange_title}
                  label='제목'
                  sx = {{ '& fieldset' : { borderRadius: 2}}}

             />
            </Grid>
            <Grid item xs={2}>
                <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">카테고리</InputLabel>
                {/* 카테고리 선택 드롭다운 */}
                <Select
                  variant="outlined"
                  labelId="demo-simple-select-label"
                  fullWidth
                  value={category}
                  onChange={handleChange_category} // 카테고리 선택 핸들러
                  label="카테고리"
                  sx={{ '& fieldset': { borderRadius: 2 } }}
                >
                  <MenuItem value={1}>IT 기술</MenuItem>
                  <MenuItem value={2}>정보처리기사</MenuItem>
                </Select>
              </FormControl>
              </Grid>
              <Grid item xs={2}>
                {/* 문제유형 선택 드롭다운 */}
                <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">유형</InputLabel>
                <Select
                  variant="outlined"
                  labelId="demo-simple-select-label"
                  fullWidth
                  value={problemtype}
                  onChange={handleChange_problemtype} 
                  label="유형"
                  sx={{ '& fieldset': { borderRadius: 2 } }}
                >
                  <MenuItem value={1}>객관식</MenuItem>
                  <MenuItem value={2}>단답식</MenuItem>
                  <MenuItem value={3}>주관식</MenuItem>
                </Select>
                </FormControl>
              </Grid>
              <Grid item xs={1}>
                {/* 점수 선택 드롭다운 */}
                <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">점수</InputLabel>
                <Select
                  variant="outlined"
                  labelId="demo-simple-select-label"
                  fullWidth
                  value={point}
                  onChange={handleChange_point} 
                  label="점수"
                  sx={{ '& fieldset': { borderRadius: 2 } }}
                >
                  <MenuItem value={10}>10</MenuItem>
                  <MenuItem value={20}>20</MenuItem>
                  <MenuItem value={30}>30</MenuItem>
                  <MenuItem value={40}>40</MenuItem>
                  <MenuItem value={50}>50</MenuItem>
                </Select>
              </FormControl>
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