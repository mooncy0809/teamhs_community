import { Grid, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Button } from '@mui/material';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { DataGrid } from '@mui/x-data-grid';

// ==============================|| AnswerList ||============================== //

const AnswerList = ({ problemId }) => { // problemId를 props로 받음
  const [answers , setAnswers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedAnswerId, setSelectedAnswerId] = useState(null); 
  const navigate = useNavigate();

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


  const handleEdit = (answerId) => {
    setOpenDialog(true);
    navigate(`/answer/edit/${answerId}`)
    console.log(`수정 작업 수행: ${answerId}`);
  };

  const handleDelete = (answerId) => {
    setOpenDialog(true);
    setSelectedAnswerId(answerId);
    console.log(`삭제 작업 수행: ${answerId}`);
  };

  const handleConfirmDelete = () => {
    axios.delete(`http://localhost:8090/api/answers/${selectedAnswerId}`)
      .then(response => {
        console.log('deleted successfully:', response.data);
        setAnswers(prevAnswers => prevAnswers.filter(answer => answer.answerId !== selectedAnswerId));
      })
      .catch(error => {
        console.log('Error deleting problem:', error);
      });
    setOpenDialog(false);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  const columns = [
    { field: 'id', headerName: 'ID', width: 70 },
    { field: 'answer', headerName: '정답', width: 180 },
    {
      field: 'actions', 
      headerName: '작업',
      width: 110,
      renderCell: (params) => (
        <div>
          <button onClick={() => handleEdit(params.row.answerId)} 
            style={{
            border: '1px solid #000',
            borderRadius: '2px',
            background: 'transparent', 
            cursor: 'pointer', 
          }}
          >수정</button> &nbsp;
          <button onClick={() => handleDelete(params.row.answerId)}
            style={{
            border: '1px solid #000', 
            borderRadius: '2px', 
            background: 'transparent', 
            cursor: 'pointer', 
          }}>삭제</button>
        </div>
      ),
    },
  ];

  const rows = answers.map((answer, index) => ({
    id: index + 1, 
    answer: answer.answer, 
    answerId: answer.answerId, 
  }));

  return (
        <Grid>
          {/* 데이터 테이블 */}
          <DataGrid
            rows={rows}
            columns={columns}
            disableRowSelectionOnClick
            loading={isLoading} // 로딩 중일 때 true로 설정
            initialState={{
              pagination: {
                paginationModel: { page: 0, pageSize: 5 },
              },
            }}
            pageSizeOptions={[1, 2, 3, 4, 5]}
            // checkboxSelection
          />
        <Dialog open={openDialog} onClose={handleCloseDialog}>
        <DialogTitle>정답 삭제</DialogTitle>
        <DialogContent>
          <DialogContentText>
            삭제하시겠습니까?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog} color="primary">
            취소
          </Button>
          <Button onClick={handleConfirmDelete} color="primary" autoFocus>
            삭제
          </Button>
        </DialogActions>
        </Dialog>
        </Grid>   
  );
};

export default AnswerList;