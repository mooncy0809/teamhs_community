import React, {useEffect, useState, useRef, useMemo  } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

import { Grid, Button, TextField, InputLabel } from '@mui/material';
import SubCard from 'ui-component/cards/SubCard';
import MainCard from 'ui-component/cards/MainCard';
import { gridSpacing } from 'store/constant';
import ReactQuill from 'react-quill';

import { Select, MenuItem } from '@mui/material';

import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-quill/dist/quill.snow.css';
import './customQuill.css'; //Quill Custom 파일

import { useSelector } from 'react-redux'; // eslint-disable-line


//Dialog
import Swal from "sweetalert2";


const BoardWrite = () => {
  const member = useSelector((state) => state.member); // eslint-disable-line no-unused-vars

  //게시글 작성
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('00');

  //카테고리 기능 추가
  const categories = [
    { value: "00", label: '자유게시판' },
    { value: "01", label: '뉴스' },
  ];

  const handleCategoryChange = (event) => {
    setSelectedCategory(event.target.value);
  };


  //내용 변경 시 setTitle 값 변경
  const handleTitleChange = (event) => {
    setTitle(event.target.value);
  };

  const handleContentChange = (value) => {
    setContent(value);
  };

  //페이지 이동 파트
  const navigate = useNavigate();
  
  const handleCancleButtonClick = () => {
    navigate('/board/list'); // 취소 클릭 시 게시글 리스트(list 부분) 페이지 이동
  };


    //저장 버튼 클릭 시
    const handleSaveButtonClick = () => {

      console.log("contentssss", content)

      const postData = {
      userId : member.member.userId, 
      title: title,
      content: content,
      categoryId: selectedCategory
      };
    
      axios.post('http://localhost:8090/board/write', postData)
        .then(response => {
          console.log('Post saved:', response.data);
          navigate('/board/list'); // API 호출 후 게시글 리스트(list) 페이지 이동
          Swal.fire("게시글 작성 완료", "게시글이 작성되었습니다.", "success");
          // 저장이 성공한 경우 처리
        })
        .catch(error => {
          console.error('Error saving post:', error);
          Swal.fire("게시글 작성 실패", "게시글 작성에 실패하였습니다.", "error");
          // 에러 처리
        });
    };

    const contentRef = useRef(null);
    //제목에서 Tab키 누를 시 내용으로 이동
    const handleTitleTabPress = (event) => {
      if (event.key === 'Tab') {
        event.preventDefault();
        contentRef.current.focus(); // 내용 작성 부분으로 포커스 이동
      }
    };

    const [isSaveButtonDisabled, setSaveButtonDisabled] = useState(true);

    // 내용 또는 제목이 변경될 때마다 상태 업데이트
    useEffect(() => {
      const isTitleValid = title.trim().length > 0;
      const isContentValid = content.replace(/<\/?[^>]+(>|$)/g, "").trim().length > 0; // HTML 태그 제거 후 내용 검사
  
      // 제목과 내용 모두 유효하면 저장 버튼 활성화
      setSaveButtonDisabled(!(isTitleValid && isContentValid));

      //console.log("내용", content)
    }, [title, content]);

    const imageHandler = async () => {
      const input = document.createElement('input');
      input.setAttribute('type', 'file');
      input.setAttribute('accept', 'image/*');
      input.click();
    
      input.addEventListener('change', async () => {
        const file = input.files[0];
        try {
          const formData = new FormData();
          formData.append('image', file);
    
          console.log("file", file)
          // 서버로 이미지 업로드 요청을 보내고 이미지 URL을 받아옵니다.
          const response = await axios.post('http://localhost:8090/images/upload', formData);
          const imageUrl = response.data;

    
          // 에디터에 이미지를 삽입합니다. 이미지 URL을 절대 경로로 설정합니다.
          const editor = contentRef.current.getEditor();
          const range = editor.getSelection();
          editor.insertEmbed(range.index, 'image', `http://localhost:8090${imageUrl}`);
          editor.setSelection(range.index + 1);

          //const updatedContent = contentRef.current.getEditor().root.innerHTML;
         // console.log("contentssss", updatedContent);

        } catch (error) {
          console.error('Error uploading image:', error);
        }
      });
    };

    

  const formats = [
    'header',
    'font',
    'size',
    'bold',
    'italic',
    'underline',
    'strike',
    'align',
    'blockquote',
    'list',
    'bullet',
    'indent',
    'background',
    'color',
    'link',
    'image',
    'video',
    'width',
  ];


  const modules = useMemo(() => {
    return {
      toolbar: {
        container: [
          [{ header: [1, 2, 3, false] }],
          ['bold', 'italic', 'underline', 'strike'],
          ['blockquote'],
          [{ list: 'ordered' }, { list: 'bullet' }],
          [{ color: [] }, { background: [] }],
          [{ align: [] }],
          ['image', 'link' , 'video']
        ],
        handlers: {
          image: imageHandler,
        },
      },
    };
  }, []);
  

  return (
    
    <MainCard title={<span style={{ fontSize: '24px', fontWeight: 'bold' }}>게시글 작성</span>} style={{ marginLeft: '8px' }}>
    <Grid container spacing={gridSpacing}>
      <Grid item xs={12}>
        <SubCard>
        <Grid container spacing={2}>

              <Grid item xs={12}>
                <InputLabel htmlFor="category-select">카테고리</InputLabel>
                <Select 
                  label="카테고리" style = {{marginBottom:'10px'}}value={selectedCategory} onChange={handleCategoryChange}>
                  {categories.map((category) => (
                    <MenuItem key={category.value} value={category.value}>
                      {category.label}
                    </MenuItem>
                  ))}
                </Select>

                <TextField
                  label="제목"
                  variant="outlined"
                  fullWidth
                  value={title}
                  onChange={handleTitleChange}
                  onKeyDown={handleTitleTabPress} // 탭 키 이벤트 핸들러 추가
                />
              </Grid>
              <Grid item xs={12}>
              <div className="quill-container">
                    <ReactQuill
                      ref = {contentRef}
                      value={content}
                      onChange={handleContentChange}
                      modules={modules}
                      formats={formats}
                      placeholder={'게시글을 작성해주세요!'}
                      theme="snow"
                    />
                  </div>
              </Grid>
              <Grid item xs={12} style={{ textAlign: 'center' }}>
              <Button variant="contained" style={{ marginRight: '0.5rem' }} onClick={handleSaveButtonClick} disabled={isSaveButtonDisabled} >
                  저장
                </Button>
                <Button variant="outlined" onClick={handleCancleButtonClick}>
                  취소
                </Button>
              </Grid>
            </Grid>
        </SubCard>
      </Grid>
    </Grid>
  </MainCard>
  );
};




export default BoardWrite;