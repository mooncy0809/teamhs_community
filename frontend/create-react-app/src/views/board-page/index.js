import { Grid, Button, Pagination} from '@mui/material';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import { useEffect, useState } from 'react';

import SubCard from 'ui-component/cards/SubCard';
import MainCard from 'ui-component/cards/MainCard';
import { gridSpacing } from 'store/constant';
import Table from 'react-bootstrap/Table';

import {useNavigate } from 'react-router-dom';

const BoardList = () => {

  //리스트 조회 + 페이징 API 호출
  const [boardlist, setBoardList] = useState([]);
  const [currentPage, setCurrentPage] = useState(0); // Current page
  const [totalPages, setTotalPages] = useState(0); // Total pages

  useEffect(() => {
    const fetchBoardData = async () => {
      try {
        const response = await axios.get(`http://localhost:8090/board/list?page=${currentPage}&size=15`);
        setBoardList(response.data.content);
        setTotalPages(response.data.totalPages);
      } catch (error) {
        console.log(error);
      }
    };

    fetchBoardData();
  }, [currentPage]);

  const handlePageChange = (event, page) => {
    setCurrentPage(page - 1);
  };

  const titleCellStyle = {
    maxWidth: '40px', // 최대 길이 (70자)
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
  };

  //페이지 이동 파트
  const navigate = useNavigate();

  const handleButtonClick = () => {
  navigate('/board/write'); // 게시글 작성(boardwrite) 페이지 이동
  };

  const handleWatchClick = (boardId) => {
    navigate(`/board/detail/${boardId}`); // 게시글 상세 조회(boardwatch) 페이지 이동
  };


  //Tab
  const [activeTab, setActiveTab] = useState('tab1'); // 현재 선택된 탭의 상태

  const handleTabClick = (tabId) => {
    setActiveTab(tabId);
  };





  /*태그 제거
  function removeTags(input) {
    const doc = new DOMParser().parseFromString(input, 'text/html');
    return doc.body.textContent || '';
  }*/

 
  return (
    <MainCard title={<span style={{ fontSize: '24px', fontWeight: 'bold' }}>커뮤니티</span>} style={{ marginLeft: '8px' }} secondary={<Button variant="contained" onClick={handleButtonClick} style={{ marginRight: '8px' }}>게시글 작성</Button>}>
      <Grid container spacing={gridSpacing}>
        <Grid item xs={12} sm={12}>
        <div>
          <div className="tab-container">
            <button
              className={`tab-button ${activeTab === 'tab1' ? 'active' : ''}`}
              onClick={() => handleTabClick('tab1')}
            >
              자유게시판
            </button>
          <button
            className={`tab-button ${activeTab === 'tab2' ? 'active' : ''}`}
            onClick={() => handleTabClick('tab2')}
          >
            뉴스
          </button>
        </div>
        <div className="tab-content" id="tab1" style={{ display: activeTab === 'tab1' ? 'block' : 'none' }}>
          {/* 카테고리 1 내용 */}
        </div>
        <div className="tab-content" id="tab2" style={{ display: activeTab === 'tab2' ? 'block' : 'none' }}>
          {/* 카테고리 2 내용 */}
        </div>
      </div>
          <SubCard>
            <Table bordered hover size="sm" style = {{minHeight : '100%'}} >
              <thead>
                <tr >
                  <th style={{ width: '5%', textAlign: 'center' , backgroundColor: '#f5f5f5' }}>번호</th>
                  <th style={{ width: '60%', textAlign: 'center' , backgroundColor: '#f5f5f5' }}>제목</th>
                  <th style={{ width: '15%', textAlign: 'center', backgroundColor: '#f5f5f5' }}>등록날짜</th>
                  <th style={{ width: '15%', textAlign: 'center', backgroundColor: '#f5f5f5'}}>아이디</th>
                  <th style={{ width: '5%', textAlign: 'center', backgroundColor: '#f5f5f5'}}>조회수</th>
                </tr>
              </thead>
              <tbody>
                {boardlist.map((item) => (
                  <tr key={item.boardId} onClick={() => handleWatchClick(item.boardId)}>
                    <td style={{ textAlign: 'center' }} >{item.boardId}</td>
                    <td style={titleCellStyle}>{item.boardTitle}</td>
                    <td style={{ textAlign: 'center' }}>{item.boardDate}</td>
                    <td style={{ textAlign: 'center' }}>{item.userId.slice(0, -2) + '**'}</td>
                    <td style={{ textAlign: 'center' }}>{item.boardCnt}</td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </SubCard>
          <Grid
              container
              justifyContent="center"
              style={{ marginTop: '20px' }}
              >
              <Pagination
                count={totalPages}
                page={currentPage + 1}
                onChange={handlePageChange}
              />
              </Grid>
        </Grid>
      </Grid>
    </MainCard>
  );
};

export default BoardList;