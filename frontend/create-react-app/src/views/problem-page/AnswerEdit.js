import { Grid, Button, Select, MenuItem, InputLabel, FormControl, TextField } from '@mui/material';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

// project imports
import SubCard from 'ui-component/cards/SubCard';
import MainCard from 'ui-component/cards/MainCard';
import { gridSpacing } from 'store/constant';


// ==============================|| AnswerEdit ||============================== //

const AnswerEdit = () => {
  const { answerId } = useParams();
  const [problemId, setProblemId] = useState(0);
  const [problem, setProblem] = useState(null);
  const navigate = useNavigate(); //페이지 이동

  const [answerList, setAnswerList] = useState({
    answer: '',
  });

  const handleCancleButtonClick = () => {
    navigate('/problem/list');
  };

  useEffect(() => {
    axios.get(`http://localhost:8090/api/answers/${answerId}`)
      .then(response => {
        console.log(response.data);
        setAnswerList(response.data);
        setProblemId(response.data.problemId);
      })
      .catch(error => {
        console.log('Error fetching answer details:', error);
      });
  }, [answerId]);

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

  const handleInputChange = (event) => {// 폼 입력값이 변경될 때 호출
    const { name, value } = event.target; // event.target 이벤트가 발생한 요소(즉, 입력 필드)
    setAnswerList((prevAnswer) => ({
      ...prevAnswer,
      [name]: value,
    }));
  };

  const insertAnswer = (event) => {
    event.preventDefault();
    axios.put(`http://localhost:8090/api/answers/${answerId}`, answerList)
      .then(response => {
        console.log('updated successfully:', response.data);
        navigate('/problem/list');
      })
      .catch(error => {
        console.log('Error updating answer:', error);
      });
  };

  return(
  <MainCard  title={<span style={{ fontSize: '24px', fontWeight: 'bold' }}>정답 수정</span>} style={{ marginLeft: '8px' }}>
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
            <Grid item xs={12}>
            <div className="quill-container">
                {problem && problem.problemType === 1 ? (
                  <FormControl sx={{ mb: 1, width:'100%' }}>
                    <InputLabel id="demo-simple-select-label">정답</InputLabel>
                    <Select
                      variant="outlined"
                      fullWidth
                      value={answerList.answer}
                      onChange={(event) => handleInputChange(event)}
                      label="정답"
                      sx={{ '& fieldset': { borderRadius: 1} }}
                      name="answer"
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
                    value={answerList.answer}
                    onChange={(event) => handleInputChange(event)}
                    label="정답"
                    sx={{ '& fieldset': { borderRadius: 1 } }}
                    name="answer"
                  />
                  </FormControl>
                )}
            </div>
              </Grid>
              <Grid item xs={12} align="center">
              <Button variant="contained" style={{ marginRight: '0.5rem' }} onClick={insertAnswer}>
                  수정
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

export default AnswerEdit;