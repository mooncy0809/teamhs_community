import { Grid, Button } from '@mui/material';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

// project imports
import SubCard from 'ui-component/cards/SubCard';
import MainCard from 'ui-component/cards/MainCard';
import { gridSpacing } from 'store/constant';

import ReactQuill from 'react-quill';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-quill/dist/quill.snow.css';
import '../css/customQuill.css'; //Quill Custom 파일


// ==============================|| ReplyWrite ||============================== //

const ReplyWrite = () => {
  const { problemId } = useParams();
  const [problem, setProblem] = useState(null);
  const [replyContent, setReplyContent] = useState("");
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

  const handleChange_content = (value)=>{
    setReplyContent(value);
  }

  const handleCancleButtonClick = () => {
    navigate(`/problem/detail/${problemId}`);
  };

  const insertReply = () => {
      axios.post(`http://localhost:8090/api/replies/write/${problemId}`, {
        replyContent: replyContent
      })
      .then(response => {
        console.log(response);
        navigate(`/problem/detail/${problemId}`);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  return(
    <MainCard title={<span style={{ fontSize: '24px', fontWeight: 'bold' }}>답변 작성</span>} style={{ marginLeft: '8px' }}>
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
                <ReactQuill
                  value={replyContent}
                  onChange={handleChange_content}
                  theme="snow"
                  placeholder="내용을 입력하세요."
                />
              </div>
            </Grid>
            <Grid item xs={12} align="center">
              <Button variant="contained" style={{ marginRight: '0.5rem' }} onClick={insertReply}>
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

export default ReplyWrite;