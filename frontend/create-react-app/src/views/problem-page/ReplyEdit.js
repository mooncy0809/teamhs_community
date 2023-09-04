import { Grid, Button } from '@mui/material';
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


// ==============================|| ReplyEdit ||============================== //

const ReplyEdit = () => {
  const { replyId } = useParams();
  const navigate = useNavigate(); //페이지 이동

  const [reply, setReply] = useState({
    replyContent: '',
  });

  const handleCancleButtonClick = () => {
    navigate(`/reply/detail/${replyId}`);
  };

  useEffect(() => {
    axios.get(`http://localhost:8090/api/replies/${replyId}`)
      .then(response => {
        console.log(response.data)
        setReply(response.data);
      })
      .catch(error => {
        console.log('Error fetching reply details:', error);
      });
  }, [replyId]);

  const handleInputChange = (event) => {// 폼 입력값이 변경될 때 호출
    const { name, value } = event.target; // event.target 이벤트가 발생한 요소(즉, 입력 필드)
    setReply((prevReply) => ({
      ...prevReply,
      [name]: value,
    }));
  };

  const insertReply = (event) => {
    event.preventDefault();
    axios.put(`http://localhost:8090/api/replies/${replyId}`, reply)
      .then(response => {
        console.log('updated successfully:', response.data);
        navigate(`/reply/detail/${replyId}`);
      })
      .catch(error => {
        console.log('Error updating reply:', error);
      });
  };

  return(
  <MainCard  title={<span style={{ fontSize: '24px', fontWeight: 'bold' }}>문제 작성</span>} style={{ marginLeft: '8px' }}>
    <Grid container spacing={gridSpacing}>
      <Grid item xs={12}>
        <SubCard>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <div className="quill-container">
                    <ReactQuill
                      name="replyContent"
                      value={reply.replyContent} 
                      onChange={(content) => handleInputChange({ target: { name: 'replyContent', value: content } })}
                      theme="snow"
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

export default ReplyEdit;