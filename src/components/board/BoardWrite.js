import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Board.css';

const BoardWrite = () => {
  const navigate = useNavigate();
  
  // 상태 초기화 간소화
  const [formData, setFormData] = useState({ title: '', content: '' });
  const [loading, setLoading] = useState(false); // 로딩 상태 추가
  const [error, setError] = useState(null); // 에러 상태 추가

  // 입력 변경 처리 함수
  const handleChange = ({ target: { name, value } }) => {
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  // 폼 제출 처리 함수
  const handleSubmit = async (e) => {
    e.preventDefault();
  
    const token = localStorage.getItem('token');
    if (!token) {
      alert('로그인이 필요합니다.');
      return navigate('/login');
    }
  
    const payload = {
      title: formData.title,
      content: formData.content,
    };
  
    try {
      setLoading(true);
      setError(null);
  
      // 서버에 POST 요청 보내기
      await axios.post('https://whitebalance.site/article/free', payload, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        }
      });
  
      alert('게시글이 등록되었습니다.');
      navigate('/board');
    } catch (err) {
      console.error('에러 상세:', err);
      setError(err.response?.data?.message || '게시글 등록 실패');
    } finally {
      setLoading(false);
    }
  };  

  return (
    <div className="board-container">
      <div className="board-form">
        <h2>글쓰기</h2>
        
        {/* 에러 메시지 표시 */}
        {error && <div className="error-message">{error}</div>}

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
            <button 
              type="submit" 
              className="btn btn-primary" 
              disabled={loading} // 로딩 중 버튼 비활성화
            >
              {loading ? '저장 중...' : '저장'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default BoardWrite;
