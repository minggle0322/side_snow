import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Board.css';

const BoardEdit = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState(null);
  const [initialData, setInitialData] = useState(null); 
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const res = await axios.get(`https://whitebalance.site/article/free/${id}`);
        const article = res.data.article;
        const formattedData = {
          title: article.title || '',
          content: article.content || '',
          author: article.author.username || ''
        };

        setFormData(formattedData);
        setInitialData(formattedData); // 초기 데이터 저장
        setLoading(false);
      } catch (err) {
        console.error('게시글 불러오기 실패:', err);
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

    // 수정된 내용이 없을 경우
    if (JSON.stringify(initialData) === JSON.stringify(formData)) {
      alert('수정된 내용이 없습니다.');
      return;
    }

    try {
      await axios.put(`https://whitebalance.site/article/free/${id}`, formData);
      alert('게시글이 수정되었습니다.');
      navigate(`/board/${id}`);
    } catch (err) {
      console.error('게시글 수정 실패:', err);
      alert('게시글 수정에 실패했습니다.');
    }
  };

  if (loading) {
    return <div>로딩 중...</div>;
  }

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
          <p className="form-control-plaintext">{formData.author}</p>
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
