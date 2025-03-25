import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Board.css';


const BoardEdit = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    author: ''
  });

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const res = await axios.get(`http://3.39.173.116:8080/api/boards/${id}`);
        setFormData({
          title: res.data.title,
          content: res.data.content,
          author: res.data.author
        });
      } catch (err) {
        console.error(err);
        navigate('/');
      }
    };

    fetchPost();
  }, [id, navigate]);

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
      await axios.put(`http://localhost:8080/api/boards/${id}`, formData);
      alert('게시글이 수정되었습니다.');
      navigate(`/board/${id}`);
    } catch (err) {
      console.error(err);
      alert('게시글 수정에 실패했습니다.');
    }
  };

  return (
    <div>
      <h2>글수정</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
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
        <div className="mb-3">
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
        <div className="mb-3">
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
        <button type="submit" className="btn btn-primary">저장</button>
      </form>
    </div>
  );
};

export default BoardEdit;