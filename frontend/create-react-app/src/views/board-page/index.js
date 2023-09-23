import { Grid, Button, Pagination} from '@mui/material';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import { useEffect, useState } from 'react';

import SubCard from 'ui-component/cards/SubCard';
import MainCard from 'ui-component/cards/MainCard';
import { gridSpacing } from 'store/constant';
import Table from 'react-bootstrap/Table';

import {useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux'; // eslint-disable-line
//import { elementAcceptingRef } from '@mui/utils';


  
const BoardList = () => {

  const member = useSelector((state) => state.member); // eslint-disable-line no-unused-vars
  //리스트 조회 + 페이징 API 호출
  const [boardlist, setBoardList] = useState([]);
  const [currentPage, setCurrentPage] = useState(0); // Current page
  const [totalPages, setTotalPages] = useState(0); // Total pages

  useEffect(() => {
    const fetchBoardData = async () => {
      try {
        const response = await axios.get(`http://localhost:8090/board/list?page=${currentPage}&size=15&cateId=${2}`);
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
  const [activeTab, setActiveTab] = useState('all'); // 현재 선택된 탭의 상태
  const [pageTitle, setPageTitle] = useState('커뮤니티'); // 페이지 제목 상태

  const handleTabClick = (tabId) => {
    setActiveTab(tabId);
    
    let cateId = 2; // 기본값은 전체
    let newPageTitle = '커뮤니티'; // 기본 페이지 제목

    if (tabId === 'board') {
      cateId = 0; // 자유게시판
      newPageTitle = '자유게시판';
    } else if (tabId === 'news') {
      cateId = 1; // 뉴스
      newPageTitle = '뉴스';
    }

    // 서버에서 데이터 가져오기
    fetchBoardData(cateId);

    // 탭에 따라 페이지 제목 변경
    setPageTitle(newPageTitle);

  };

  const fetchBoardData = async (cateId) => {
    try {
      const response = await axios.get(`http://localhost:8090/board/list?page=${currentPage}&size=15&cateId=${cateId}`);
    
      setBoardList(response.data.content);
      setTotalPages(response.data.totalPages);
    } catch (error) {
      console.log(error);
    }
  };


 
  return (
    <MainCard title={<span style={{ fontSize: '24px', fontWeight: 'bold' }}>{pageTitle}</span>}style={{ marginLeft: '8px' }}
    secondary={
      member?.member?.userId ? (
        <Button variant="contained" onClick={handleButtonClick} style={{ marginRight: '8px' }}>
          게시글 작성
        </Button>
      ) : null
    }
  ><Grid container spacing={gridSpacing}>
        <Grid item xs={12} sm={12}>
        <div>
        <div className="tab-container" style={{marginBottom:'20px', marginLeft:'20px'}}>

        <button
            className={`tab-button ${activeTab === 'all' ? 'active' : ''}`}
            style={{
              backgroundColor: activeTab === 'all' ? 'skyblue' : 'transparent',
              color: activeTab === 'all' ? 'white' : 'black',
              fontSize: '18px'
            }}
            onClick={() => handleTabClick('all')}
          >
            전체
          </button>

          <button
            className={`tab-button ${activeTab === 'board' ? 'active' : ''}`}
            style={{
              backgroundColor: activeTab === 'board' ? 'skyblue' : 'transparent',
              color: activeTab === 'board' ? 'white' : 'black',
              fontSize: '18px'
            }}
            onClick={() => handleTabClick('board')}
          >
            자유게시판
          </button>

          <button
            className={`tab-button ${activeTab === 'news' ? 'active' : ''}`}
            style={{
              backgroundColor: activeTab === 'news' ? 'skyblue' : 'transparent',
              color: activeTab === 'news' ? 'white' : 'black',
              fontSize: '18px'
            }}
            onClick={() => handleTabClick('news')}
          >
            뉴스
          </button>
        </div>
        <div className="tab-content" id="all" style={{ display: activeTab === 'all' ? 'block' : 'none' }}>
        <SubCard>
            <Table bordered hover size="sm" style = {{minHeight : '100%'}} >
              <thead>
                <tr >
                  <th style={{ width: '10%', textAlign: 'center' , backgroundColor: '#f5f5f5' }}>카테고리</th>
                  <th style={{ width: '60%', textAlign: 'center' , backgroundColor: '#f5f5f5' }}>제목</th>
                  <th style={{ width: '15%', textAlign: 'center', backgroundColor: '#f5f5f5' }}>등록날짜</th>
                  <th style={{ width: '10%', textAlign: 'center', backgroundColor: '#f5f5f5'}}>아이디</th>
                  <th style={{ width: '5%', textAlign: 'center', backgroundColor: '#f5f5f5'}}>조회수</th>
                </tr>
              </thead>
              <tbody>
                {boardlist.map((item) => (
                  <tr key={item.boardId} onClick={() => handleWatchClick(item.boardId)}>
                    <td style={{ textAlign: 'center' }}>{item.cateId === 1 ? '뉴스' : '자유게시판'}</td>
                    <td style={titleCellStyle}>{item.boardTitle}</td>
                    <td style={{ textAlign: 'center' }}>{item.boardDate}</td>
                    <td style={{ textAlign: 'center' }}>{item.userId.slice(0, -2) + '**'}</td>
                    <td style={{ textAlign: 'center' }}>{item.viewCnt}</td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </SubCard>
        </div>
        <div className="tab-content" id="board" style={{ display: activeTab === 'board' ? 'block' : 'none' }}>
        <SubCard>
            <Table bordered hover size="sm" style = {{minHeight : '100%'}} >
              <thead>
                <tr >
                  <th style={{ width: '10%', textAlign: 'center' , backgroundColor: '#f5f5f5' }}>번호</th>
                  <th style={{ width: '60%', textAlign: 'center' , backgroundColor: '#f5f5f5' }}>제목</th>
                  <th style={{ width: '15%', textAlign: 'center', backgroundColor: '#f5f5f5' }}>등록날짜</th>
                  <th style={{ width: '10%', textAlign: 'center', backgroundColor: '#f5f5f5'}}>아이디</th>
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
                    <td style={{ textAlign: 'center' }}>{item.viewCnt}</td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </SubCard>
        </div>

        <div className="tab-content" id="news" style={{ display: activeTab === 'news' ? 'block' : 'none' }}>
        <SubCard>
            <Table bordered hover size="sm" style = {{minHeight : '100%'}} >
              <thead>
                <tr >
                  <th style={{ width: '10%', textAlign: 'center' , backgroundColor: '#f5f5f5' }}>번호</th>
                  <th style={{ width: '60%', textAlign: 'center' , backgroundColor: '#f5f5f5' }}>제목</th>
                  <th style={{ width: '15%', textAlign: 'center', backgroundColor: '#f5f5f5' }}>등록날짜</th>
                  <th style={{ width: '10%', textAlign: 'center', backgroundColor: '#f5f5f5'}}>아이디</th>
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
                    <td style={{ textAlign: 'center' }}>{item.viewCnt}</td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </SubCard>
        </div>
      </div>
         
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