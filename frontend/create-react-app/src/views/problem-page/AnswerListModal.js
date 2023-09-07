import { Grid } from '@mui/material';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { DataGrid } from '@mui/x-data-grid';

// project imports
import { gridSpacing } from 'store/constant';

// ==============================|| AnswerList ||============================== //

const AnswerList = ({ problemId }) => { // problemId를 props로 받음
  const [answers , setAnswers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
 
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

  return (
    <div>
        <Grid spacing={gridSpacing}>
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
    </div>
  );
};

export default AnswerList;