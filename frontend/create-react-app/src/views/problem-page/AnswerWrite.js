import { Grid, Button, Select, MenuItem, InputLabel, FormControl, TextField } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

// project imports
import SubCard from 'ui-component/cards/SubCard';
import MainCard from 'ui-component/cards/MainCard';
import { gridSpacing } from 'store/constant';

import 'bootstrap/dist/css/bootstrap.min.css';


// ==============================|| AnswerWrite ||============================== //

const AnswerWrite = () => {
  const { problemId } = useParams();
  const [problem, setProblem] = useState(null);
  const [answerContent, setAnswerContent] = useState("");
  const [answers , setAnswers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate(); //페이지 이동
 
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

  useEffect(() => {
    if (problemId) { 
      setIsLoading(true);
      axios
        .get(`http://localhost:8090/api/answers/problem/${problemId}`)
        .then((response) => {
          console.log(problemId);
          console.log(response.data.content);
          setAnswers(response.data.content);
          setIsLoading(false);
        })
        .catch((error) => {
          console.log(error);
          setIsLoading(false);
        });
    }
  }, [problemId]);

  const columns = [
    { field: 'id', headerName: 'ID', width: 70 },
    { field: 'answer', headerName: '정답', width: 130 },
  ];

  const rows = answers.map((answer, index) => ({
    id: index + 1, 
    answer: answer.answer, 
  }));

  const handleChange_content = (event)=>{
    setAnswerContent(event.target.value);
  }

  const handleChange_List = (event) => {
    setAnswerContent(event.target.value);
  };

  const handleListButtonClick = () => {
    navigate(`/problem/list`);
  };

  const insertAnswer = () => {
      axios.post(`http://localhost:8090/api/answers/write/${problemId}`, {
        answer: answerContent
      })
      .then(response => {
        console.log(response);
        window.location.reload();
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  return(
    <MainCard title={<span style={{ fontSize: '24px', fontWeight: 'bold' }}>정답 작성</span>} style={{ marginLeft: '8px' }}>
    <Grid container spacing={gridSpacing}>
      <Grid item xs={12}>
        <SubCard>
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <h4><strong>[{problemId}번 문제]</strong></h4>
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
            </Grid>
            <Grid item xs={6}>
            <div className="quill-container">
                {problem && problem.problemType === 1 ? (
                  <FormControl sx={{ mb: 1, width:'100%' }}>
                    <InputLabel id="demo-simple-select-label">정답</InputLabel>
                    <Select
                      variant="outlined"
                      fullWidth
                      value={answerContent}
                      onChange={handleChange_List}
                      label="정답"
                      sx={{ '& fieldset': { borderRadius: 1} }}
                    >
                      <MenuItem value={"1"}>1번</MenuItem>
                      <MenuItem value={"2"}>2번</MenuItem>
                      <MenuItem value={"3"}>3번</MenuItem>
                      <MenuItem value={"4"}>4번</MenuItem>
                      <MenuItem value={"5"}>5번</MenuItem>
                    </Select>
                  </FormControl>
                ) : (
                  <FormControl sx={{ mb: 1, width:'100%'  }}>
                  <TextField
                    variant="outlined"
                    fullWidth
                    value={answerContent}
                    onChange={handleChange_content}
                    label="정답"
                    sx={{ '& fieldset': { borderRadius: 1 } }}
                  />
                  </FormControl>
                )}
            </div>
            <Grid>
              {/* 데이터 테이블 */}
              <DataGrid
                rows={rows}
                columns={columns}
                loading={isLoading} // 로딩 중일 때 true로 설정
                initialState={{
                  pagination: {
                    paginationModel: { page: 0, pageSize: 5 },
                  },
                }}
                pageSizeOptions={[1, 2, 3, 4, 5]}
                checkboxSelection
              />
            </Grid>
            </Grid>
            
            <Grid item xs={12} align="center">
              <Button variant="contained" style={{ marginRight: '0.5rem' }} onClick={insertAnswer}>
                등록
              </Button>
              <Button variant="outlined" onClick={handleListButtonClick}>
                목록
              </Button>
            </Grid>
          </Grid>
        </SubCard>
      </Grid>
    </Grid>
  </MainCard>
  );
};

export default AnswerWrite;