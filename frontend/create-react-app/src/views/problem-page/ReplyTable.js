import { Grid, Pagination } from '@mui/material';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom'; // React Router import

// project imports
import Table from 'react-bootstrap/Table';
import { gridSpacing } from 'store/constant';

// ==============================|| ReplyList ||============================== //

const ReplyList = () => {
  const [list , setList] = useState([]);
  const [page, setPage] = useState(0); // 현재 페이지 번호
  const [totalPages, setTotalPages] = useState(0); // 총 페이지 수
 
  useEffect(() => {
    axios.get(`http://localhost:8090/api/replies?page=${page}&size=3`)
        .then(response => {
          setList(response.data.content);
          setTotalPages(response.data.totalPages);
          console.log(response.data);
        })
        .catch(error => console.log(error))
}, [page]);



  return(
    <Grid spacing={gridSpacing}>
          <Table bordered hover size="sm" style = {{minHeight : '100%'}} >
                        <thead>
                            <tr>
                                <th style={{ width: '5%', textAlign: 'center' , backgroundColor: '#f5f5f5' }}>답변</th>
                                <th style={{ width: '10%', textAlign: 'center' , backgroundColor: '#f5f5f5' }}>작성자 </th>
                                <th style={{ width: '10%', textAlign: 'center' , backgroundColor: '#f5f5f5' }}>결과</th>
                                <th style={{ width: '10%', textAlign: 'center' , backgroundColor: '#f5f5f5' }}>날짜</th>
                            </tr>
                        </thead>
                        <tbody>
                        {list.map((item) => {
                          return (
                            // eslint-disable-next-line react/jsx-key
                            <tr key={item.replyId}>
                                    <td style={{ textAlign: 'center' }}>{item.replyId}</td>
                                    <td style={{ textAlign: 'center' }}>
                                    <Link
                                      to={`/reply/detail/${item.replyId}`}
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
                                    >{item.userId} </Link> 
                                    </td>
                                    <td style={{ textAlign: 'center' }}>{item.replyState}</td>
                                    <td style={{ textAlign: 'center' }}>{item.replyDate}</td>   
                                </tr>
                                );
                              })}
                        </tbody>
            </Table>
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
  );
};

export default ReplyList;