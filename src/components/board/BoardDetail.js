import React, { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Board.css';

const BoardDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const res = await axios.get(`http://3.39.173.116:8080/article/free/${id}`);
        setPost(res.data.article); 
        setLoading(false);
      } catch (err) {
        console.error(err);
        navigate('/');
      }
    };
    fetchPost();
  }, [id, navigate]);

  const formatDate = (dateString) => {
    if (!dateString) return "-";
    try {
      const isoString = dateString.endsWith('Z') 
        ? dateString 
        : `${dateString.split('.')[0]}Z`;
      const date = new Date(isoString);
      if (isNaN(date.getTime())) return "-";
      
      const year = date.getUTCFullYear();
      const month = (date.getUTCMonth() + 1).toString().padStart(2, '0');
      const day = date.getUTCDate().toString().padStart(2, '0');
      const hours = date.getUTCHours().toString().padStart(2, '0');
      const minutes = date.getUTCMinutes().toString().padStart(2, '0');
      
      return `${year}년 ${month}월 ${day}일 ${hours}:${minutes}`;
    } catch {
      return "-";
    }
  };

const handleDelete = async () => {
  try {
    const token = localStorage.getItem('token');
    if (!token) throw new Error('No token found');

    await axios.delete(`http://3.39.173.116:8080/article/free/${id}`, {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    });

    alert('게시글이 삭제되었습니다.');
    navigate('/');
  } catch (err) {
    if (err.response?.status === 401) {
      localStorage.removeItem('token');
      navigate('/login');
    }
    alert(err.response?.data?.message || '삭제에 실패했습니다.');
  }
};

  if (loading) return <div>Loading...</div>;
  if (!post) return <div>데이터를 불러올 수 없습니다.</div>;

  return (
    <div className="board-container">
      <div className="post-detail">
        <h2 className="post-title">{post.title || '제목 없음'}</h2>
        <div className="post-meta">
          <span>작성자: {post.author?.nickname || 'Unknown'}</span>
          <span> | 작성일: {formatDate(post.createTime)}</span>
        </div>
        <div className="post-content">
          {post.content || '내용 없음'}
        </div>
        <div className="button-group">
          <Link to={`/board/edit/${post.id}`} className="btn btn-primary">수정</Link>
          <button onClick={handleDelete} className="btn btn-danger">삭제</button>
        </div>
      </div>
    </div>
  );
};

export default BoardDetail;