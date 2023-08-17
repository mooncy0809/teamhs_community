import { Grid, Button, Pagination } from '@mui/material';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import { useEffect, useState } from 'react';

// project imports
import SubCard from 'ui-component/cards/SubCard';
import MainCard from 'ui-component/cards/MainCard';
import { gridSpacing } from 'store/constant';
import Table from 'react-bootstrap/Table';


// ==============================|| TYPOGRAPHY ||============================== //

const ProblemList = () => {
  const [list , setList] = useState([]);
 
  useEffect(() => {
    axios.get('http://localhost:8090/api/problems')
        .then(response => setList(response.data))
        .catch(error => console.log(error))
}, []);

const handleButtonClick = () => {
  navigate('/problems/write');
  };

  return(
    <MainCard title={<span style={{ fontSize: '24px', fontWeight: 'bold' }}>문제</span>} style={{ marginLeft: '8px' }} secondary={<Button variant="contained" onClick={handleButtonClick} style={{ marginRight: '8px' }}>문제 작성</Button>}>
    <Grid container spacing={gridSpacing}>
      <Grid item xs={12} sm={12}>
        <SubCard title="문제 목록">
          <Table bordered hover size="sm" style = {{minHeight : '100%'}} >
                        <thead>
                            <tr>
                                <th style={{ width: '5%', textAlign: 'center' , backgroundColor: '#f5f5f5' }}>번호</th>
                                <th style={{ width: '30%', textAlign: 'center' , backgroundColor: '#f5f5f5' }}>제목 </th>
                                <th style={{ width: '45%', textAlign: 'center' , backgroundColor: '#f5f5f5' }}>내용 </th>
                                <th style={{ width: '10%', textAlign: 'center' , backgroundColor: '#f5f5f5' }}>작성자 </th>
                                <th style={{ width: '5%', textAlign: 'center' , backgroundColor: '#f5f5f5' }}>제출</th>
                                <th style={{ width: '5%', textAlign: 'center' , backgroundColor: '#f5f5f5' }}>맞힌 사람</th>
                            </tr>
                        </thead>
                        <tbody>
                        {list.map((item) => {
                          return (
                            // eslint-disable-next-line react/jsx-key
                            <tr key={item.problemId} onClick={() => handleWatchClick(item.problemId)}>
                                    <td style={{ textAlign: 'center' }}>{item.problemId}</td>
                                    <td>{item.problemTitle} </td>
                                    <td>{item.probelmContent} </td>
                                    <td style={{ textAlign: 'center' }}>{item.userId} </td>
                                    <td style={{ textAlign: 'center' }}>{item.submitCnt}</td>
                                    <td style={{ textAlign: 'center' }}>{item.answerCnt}</td>
                                </tr>
                                );
                              })}
                        </tbody>
            </Table>
        </SubCard>
        <Grid
            container
            justifyContent="center"
            style={{ marginTop: '20px' }}
            >
            <Pagination
            />
            </Grid>
      </Grid>
    </Grid>
  </MainCard>
  );
};

export default ProblemList;