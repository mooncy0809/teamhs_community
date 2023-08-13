//글 작성 페이지(수정 전)

import { Grid, Button} from '@mui/material';
import 'bootstrap/dist/css/bootstrap.min.css';
import Editor from 'ui-component/teamhsComponents/EditorComponent';
/*
import axios from 'axios';
import { useEffect, useState } from 'react';
*/

import SubCard from 'ui-component/cards/SubCard';
import MainCard from 'ui-component/cards/MainCard';
import { gridSpacing } from 'store/constant';

const BoardWrite = () => {

  /*
  const [write , setBoardWrite] = useState([]); 

  useEffect(() => {
    axios.get('http://localhost:8090/board/list')
      .then(response => setBoardWrite(response.data)) 
      .catch(error => console.log(error))
  }, []);
*/



  return (
    <MainCard >
      <Grid container spacing={gridSpacing}>
        <Grid item xs={12} sm={6}>
          <SubCard title={<span style={{ fontSize: '24px', fontWeight: 'bold' }}>게시글 작성</span>} style={{ marginLeft: '8px' }}>
            <Button variant="outlined" style={{ width: '100%', marginTop: '1rem' }}>
              저장
            </Button>
          </SubCard>
        </Grid>
      </Grid>
    </MainCard>
  );
};

export default BoardWrite;