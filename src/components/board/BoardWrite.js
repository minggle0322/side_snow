import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Board.css';

const BoardWrite = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: '',
    content: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    console.log(localStorage.getItem('token')); // 정상적인 토큰 값 출력 확인
    e.preventDefault();
    try {
      // 1. 토큰 필수 확인
      const token = localStorage.getItem('token');
      if (!token) {
        alert('로그인이 필요합니다.');
        return navigate('/login');
      }
  
      // 2. 요청 데이터 + 헤더에 토큰 포함
      const response = await axios.post(
        'http://3.39.173.116:8080/article/free',
        formData, // JSON 데이터 { title, content }
        {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        }
      );
  
      // 3. 성공 시 처리
      console.log('서버 응답:', response.data);
      alert('게시글이 등록되었습니다.');
      navigate('/');
  
    } catch (err) {
      // 4. 상세 에러 처리
      console.error('에러 상세:', {
        status: err.response?.status,
        data: err.response?.data,
        message: err.message
      });
      alert(err.response?.data?.message || '게시글 등록 실패');
    }
  };

  return (
    <div className="board-container">
      <div className="board-form">
        <h2>글쓰기</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label className="form-label">제목</label>
            <input
              type="text"
              className="form-control"
              name="title"
              value={formData.title}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label className="form-label">내용</label>
            <textarea
              className="form-control"
              name="content"
              rows="10"
              value={formData.content}
              onChange={handleChange}
              required
            ></textarea>
          </div>
          <div className="button-group">
            <button type="submit" className="btn btn-primary">저장</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default BoardWrite;