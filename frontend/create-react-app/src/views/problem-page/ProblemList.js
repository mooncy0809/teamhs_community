import { Grid, Pagination, Select, MenuItem, InputLabel, FormControl, Button, Dialog, DialogTitle, DialogContent, DialogActions } from '@mui/material';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom'; // React Router import
import Table from 'react-bootstrap/Table';


// project imports
import SubCard from 'ui-component/cards/SubCard';
import MainCard from 'ui-component/cards/MainCard';
import { gridSpacing } from 'store/constant';
import AnswerList from './AnswerListModal';

// ==============================|| ProblemList ||============================== //

const ProblemList = () => {
  const [list , setList] = useState([]);
  const [page, setPage] = useState(0); // 현재 페이지 번호
  const [totalPages, setTotalPages] = useState(0); // 총 페이지 수
  const [selectedCategory, setSelectedCategory] = useState(0); 
  const [selectedType, setSelectedType] = useState(0);
  const [openAnswerModal, setOpenAnswerModal] = useState(false);
  const [selectedProblemId, setSelectedProblemId] = useState(0);


  useEffect(() => {
    axios.get(`http://localhost:8090/api/problems?page=${page}&size=10`)
        .then(response => {
          setList(response.data.content);
          setTotalPages(response.data.totalPages);
          console.log(response.data);
        })
        .catch(error => console.log(error))
}, [page]);


const handleChangeCategory = (event) => {
  setSelectedCategory(event.target.value);
};

const handleChangeType = (event) => {
  setSelectedType(event.target.value);
};

const handleClickOpen = (problemId) => {
  setSelectedProblemId(problemId);
  setOpenAnswerModal(true);
};

const handleClose = () => {
  setOpenAnswerModal(false);
};

// list 배열을 problemId의 내림차순으로 정렬
list.sort((a, b) => b.problemId - a.problemId);

// 문제 리스트를 필터링한 결과를 저장할 새로운 변수
const filteredList = list.filter((item) => {
  // 만약 선택한 카테고리와 유형이 모두 0이면 모든 항목을 표시
    if (selectedCategory === 0 && selectedType === 0) {
      return true;
    }

    // 만약 선택한 카테고리가 0이면 유형에 따라 필터링
    if (selectedCategory === 0) {
      return item.problemType === selectedType;
    }

    // 만약 선택한 유형이 0이면 카테고리에 따라 필터링
    if (selectedType === 0) {
      return item.cateId === selectedCategory;
    }

  // 카테고리와 유형 모두 선택한 경우 두 가지 모두 일치해야 함
  return item.cateId === selectedCategory && item.problemType === selectedType;
  });

  return(
    <MainCard title={<span style={{ fontSize: '24px', fontWeight: 'bold' }}>문제</span>} style={{ marginLeft: '8px' }}>
    <Grid container spacing={gridSpacing}>
      <Grid item xs={12} sm={12}>
        <SubCard>
          {/* 카테고리 선택 드롭다운 */}
          <FormControl sx={{ mb: 1, mr: 1, minWidth: 150 }} size="small">
          <InputLabel id="demo-simple-select-label">카테고리</InputLabel>
          <Select
              variant="outlined"
              fullWidth
              value={selectedCategory}
              onChange={handleChangeCategory}
              label="카테고리"
              sx={{ '& fieldset': { borderRadius: 1 } }}
            >
              <MenuItem value={0}>전체</MenuItem>
              <MenuItem value={1}>IT 기술</MenuItem>
              <MenuItem value={2}>정보처리기사</MenuItem>
            </Select>
          </FormControl>

          <FormControl sx={{ mb: 1, minWidth: 150 }} size="small">
          <InputLabel id="demo-simple-select-label">유형</InputLabel>
          <Select
              variant="outlined"
              fullWidth
              value={selectedType}
              onChange={handleChangeType}
              label="유형"
              sx={{ '& fieldset': { borderRadius: 1 } }}
            >
              <MenuItem value={0}>전체</MenuItem>
              <MenuItem value={1}>객관식</MenuItem>
              <MenuItem value={2}>단답식</MenuItem>
              <MenuItem value={3}>주관식</MenuItem>
          </Select>
        </FormControl>
          <Table bordered hover size="sm" style = {{minHeight : '100%'}} >
                        <thead>
                            <tr>
                                <th style={{ width: '40%', textAlign: 'center' , backgroundColor: '#f5f5f5' }}>제목 </th>
                                <th style={{ width: '5%', textAlign: 'center' , backgroundColor: '#f5f5f5' }}>점수 </th>
                                <th style={{ width: '5%', textAlign: 'center' , backgroundColor: '#f5f5f5' }}>유형 </th>
                                <th style={{ width: '5%', textAlign: 'center' , backgroundColor: '#f5f5f5' }}>제출</th>
                                <th style={{ width: '5%', textAlign: 'center' , backgroundColor: '#f5f5f5' }}>정답률</th>
                                <th style={{ width: '5%', textAlign: 'center' , backgroundColor: '#f5f5f5' }}>추천수</th>
                                <th style={{ width: '5%', textAlign: 'center' , backgroundColor: '#f5f5f5' }}>조회수</th>
                                <th style={{ width: '10%', textAlign: 'center' , backgroundColor: '#f5f5f5' }}>작성자 </th>
                                <th style={{ width: '5%', textAlign: 'center' , backgroundColor: '#f5f5f5' }}>정답 </th>
                            </tr>
                        </thead>
                        <tbody>
                        {filteredList.map((item) => {
                          return (
                            // eslint-disable-next-line react/jsx-key
                            <tr key={item.problemId}>
                                    <td>
                                    <Link
                                      to={`/problem/detail/${item.problemId}`}
                                      style={{
                                        color: 'black',
                                        textDecoration: 'none',
                                        transition: 'color 0.3s', // 색 변화 시 부드럽게 전환되도록 추가
                                      }}
                                      onMouseEnter={(e) => {
                                        e.target.style.color = 'rgb(0, 0, 190)';
                                      }}
                                      onMouseLeave={(e) => {
                                        e.target.style.color = 'black';
                                      }}
                                    >{item.problemTitle}</Link> 
                                    </td>
                                    <td style={{ textAlign: 'center' }}>{item.problemPoint} </td>
                                    <td style={{ textAlign: 'center' }}>
                                      {item.problemType === 1 ? '객관식' : item.problemType === 2 ? '단답식' : '주관식'}
                                    </td>
                                    <td style={{ textAlign: 'center' }}>{item.submitCnt}</td>
                                    <td style={{ textAlign: 'center' }}>{item.answerCnt}</td>
                                    <td style={{ textAlign: 'center' }}>{item.problemRecom}</td>
                                    <td style={{ textAlign: 'center' }}>{item.problemCnt}</td>
                                    <td style={{ textAlign: 'center' }}>{item.userId} </td>
                                    <td style={{ textAlign: 'center' }}>
                                      <Button size="small" variant="contained" onClick={() => handleClickOpen(item.problemId)} >정답</Button>
                                      <Dialog
                                        open={openAnswerModal && selectedProblemId === item.problemId}
                                        onClose={handleClose}
                                        aria-labelledby="alert-dialog-title"
                                        aria-describedby="alert-dialog-description"
                                      >
                                        <DialogTitle id="alert-dialog-title">
                                          {"정답목록"}
                                        </DialogTitle>
                                        <DialogContent>
                                          {selectedProblemId !== 0 && <AnswerList problemId={selectedProblemId} onClose={handleClose} />}
                                        </DialogContent>
                                        <DialogActions>
                                          <Button autoFocus onClick={handleClose}>취소</Button>
                                          <Link to={`/answer/write/${item.problemId}`}><Button autoFocus>정답추가</Button></Link>
                                        </DialogActions>
                                      </Dialog>
                                    </td>
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
              count = {totalPages}
              page = {page + 1}
              onChange = {(event, value) => setPage(value - 1)}
            />
            </Grid>
      </Grid>
    </Grid>
  </MainCard>
  );
};

export default ProblemList;