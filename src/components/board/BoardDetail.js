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
        const res = await axios.get(`http://3.39.173.116:8080/api/boards/${id}`);
        setPost(res.data);
        setLoading(false);
      } catch (err) {
        console.error(err);
        navigate('/');
      }
    };

    fetchPost();
  }, [id, navigate]);

  const handleDelete = async () => {
    try {
      await axios.delete(`http://localhost:8080/api/boards/${id}`);
      alert('게시글이 삭제되었습니다.');
      navigate('/');
    } catch (err) {
      console.error(err);
      alert('삭제에 실패했습니다.');
    }
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div className="board-container">
      <div className="post-detail">
        <h2 className="post-title">{post.title}</h2>
        <div className="post-meta">
          <span>작성자: {post.author}</span>
          <span> | 작성일: {new Date(post.createdAt).toLocaleString()}</span>
        </div>
        <div className="post-content">
          {post.content}
        </div>
        <div className="button-group">
          <Link to={`/edit/${id}`} className="btn btn-primary">수정</Link>
          <button onClick={handleDelete} className="btn btn-danger">삭제</button>
        </div>
      </div>
    </div>
  );
};

export default BoardDetail;