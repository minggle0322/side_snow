import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Board.css';

const BoardWrite = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    author: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://3.39.173.116:8080/article/free', formData);
      alert('게시글이 등록되었습니다.');
      navigate('/');
    } catch (err) {
      console.error(err);
      alert('게시글 등록에 실패했습니다.');
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
            <label className="form-label">작성자</label>
            <input
              type="text"
              className="form-control"
              name="author"
              value={formData.author}
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