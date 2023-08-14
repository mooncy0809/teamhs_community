import { Grid } from '@mui/material';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import { useEffect, useState } from 'react';

// project imports
import SubCard from 'ui-component/cards/SubCard';
import MainCard from 'ui-component/cards/MainCard';
import SecondaryAction from 'ui-component/cards/CardSecondaryAction';
import { gridSpacing } from 'store/constant';
import Button from '@mui/material/Button';
import SendIcon from '@mui/icons-material/Send';
import Table from 'react-bootstrap/Table';


// ==============================|| TYPOGRAPHY ||============================== //

const Typography = () => {
  const [list , SetList] = useState([]);
  const [title, SetTitle] = useState("");
  const [content, SetContent] = useState("");
 
  useEffect(() => {
    axios.get('/api/problems')
        .then(response => SetList(response.data))
        .catch(error => console.log(error))
}, []);

const handleChange_title = (e)=>{
  e.preventDefault();
  SetTitle(e.target.value);
}

const handleChange_content = (e)=>{
  e.preventDefault();
  SetContent(e.target.value);
}

function insertProblem() {
    axios.post('http://localhost:8090/api/problems/write', {
      title : title,
      content : content
    })
    .then(function (response) {
      console.log(response);
    })
    .catch(function (error) {
      console.log(error);
    });
}

  return(
  <MainCard title="문제" secondary={<SecondaryAction link="https://next.material-ui.com/system/typography/" />}>
    <Grid container spacing={gridSpacing}>
      <Grid item xs={12} sm={6}>
        <SubCard title="문제 작성">
          <Grid container direction="column" spacing={1} align="right">
            <form>
              <input type="text"  value = {title} onChange={handleChange_title} className='form-control' placeholder='제목을 입력하세요.' style={{marginBottom:10}}/>
              <textarea type="text" value = {content} onChange={handleChange_content} placeholder="내용을 입력하세요." className="form-control form-control-sm" style={{width:'100%',height:'500px' ,marginBottom:10}}></textarea>
              <Button onClick={insertProblem} variant="contained" endIcon={<SendIcon />} size="small">저장</Button>
            </form>
          </Grid>
        </SubCard>
      </Grid>
      <Grid item xs={12} sm={6}>
        <SubCard title="문제 목록">
          <Table bordered hover size="sm">
                        <thead>
                            <tr>
                                <th>번호</th>
                                <th>제목 </th>
                                <th>내용 </th>
                                <th>작성자 </th>
                                <th>조회수</th>
                            </tr>
                        </thead>
                        <tbody>
                        {list.map((item,index) => {
                          return (
                            // eslint-disable-next-line react/jsx-key
                            <tr key={index}>
                                    <td>{item.id}</td>
                                    <td>{item.title} </td>
                                    <td>{item.content} </td>
                                    <td>{item.writer} </td>
                                    <td>{item.viewCnt}</td>
                                </tr>
                                );
                              })}
                        </tbody>
            </Table>
        </SubCard>
      </Grid>
    </Grid>
  </MainCard>
  );
};

export default Typography;
