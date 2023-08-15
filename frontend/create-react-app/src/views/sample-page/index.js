import { Grid, Button} from '@mui/material';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import { useEffect, useState } from 'react';

import SubCard from 'ui-component/cards/SubCard';
import MainCard from 'ui-component/cards/MainCard';
import { gridSpacing } from 'store/constant';
import Table from 'react-bootstrap/Table';

import { Link, useNavigate } from 'react-router-dom';

const BoardList = () => {
  const [boardlist , setBoardList] = useState([]); 

  useEffect(() => {
    axios.get('http://localhost:8090/board/list')
      .then(response => setBoardList(response.data)) 
      .catch(error => console.log(error))
  }, []);

  const navigate = useNavigate(); // useNavigate 함수 가져오기

  // 버튼 클릭 시 페이지 이동 처리
  const handleButtonClick = () => {
  navigate('/sample-page/boardwrite'); // '/sample-page/boardwrite' 경로로 페이지 이동
  };


  
  return (
    <MainCard title={<span style={{ fontSize: '24px', fontWeight: 'bold' }}>커뮤니티</span>} style={{ marginLeft: '8px' }} secondary={<Button variant="contained" onClick={handleButtonClick} style={{ marginRight: '8px' }}>게시글 작성</Button>}>
      <Grid container spacing={gridSpacing}>
        <Grid item xs={12} sm={12}>
          <SubCard>
            <Table bordered hover size="sm" style = {{minHeight : '500px'}} >
              <thead>
                <tr >
                  <th style={{ width: '5%', textAlign: 'center' , backgroundColor: '#f5f5f5' }}>번호</th>
                  <th style={{ width: '30%', textAlign: 'center' , backgroundColor: '#f5f5f5' }}>제목</th>
                  <th style={{ width: '45%', textAlign: 'center', backgroundColor: '#f5f5f5' }}>내용</th>
                  <th style={{ width: '10%', textAlign: 'center', backgroundColor: '#f5f5f5' }}>등록날짜</th>
                  <th style={{ width: '10%', textAlign: 'center', backgroundColor: '#f5f5f5'}}>아이디</th>
                </tr>
              </thead>
              <tbody >
                {boardlist.map((item) => ( 
                  <tr key={item.c_id}>
                  <td style={{ textAlign: 'center' }}>{item.c_id}</td>
                  <td>
                    <Link to={`/sample-page/boardwatch/${item.c_id}`}>{item.c_title}</Link>
                  </td>
                    <td >{item.c_content}</td>
                    <td style={{ textAlign: 'center' }}>{item.c_date}</td>
                    <td style={{ textAlign: 'center' }}>{item.user_id.slice(0, -2) + '**'}</td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </SubCard>
        </Grid>
      </Grid>
    </MainCard>
  );
};

export default BoardList;