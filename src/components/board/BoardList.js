import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Pagination from './Pagination';
import './Board.css';

const formatDate = (dateString) => {
  if (!dateString) return "-";

  try {
    // 1. 유효한 ISO 문자열로 변환
    const isoString = dateString.endsWith('Z') 
      ? dateString 
      : `${dateString.split('.')[0]}Z`;
    
    const date = new Date(isoString);
    if (isNaN(date.getTime())) return "-";

    // 2. 날짜 부분 분해
    const year = date.getUTCFullYear();
    const month = (date.getUTCMonth() + 1).toString().padStart(2, '0');
    const day = date.getUTCDate().toString().padStart(2, '0');
    const hours = date.getUTCHours().toString().padStart(2, '0');
    const minutes = date.getUTCMinutes().toString().padStart(2, '0');

    // 3. 직접 조립 (100% 정확한 포맷 보장)
    return `${year}년 ${month}월 ${day}일 ${hours}:${minutes}`;
  } catch {
    return "-";
  }
};

const BoardList = () => {
  const [posts, setPosts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(10);
  const [totalPosts, setTotalPosts] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await axios.get(`/article/free?page=${currentPage - 1}&size=${postsPerPage}`);
        
        setPosts(Array.isArray(res.data) ? res.data : []);
        setTotalPosts(Array.isArray(res.data) ? res.data.length : 0);
        
      } catch (err) {
        console.error('게시글 불러오기 실패:', err);
        setPosts([]);
        setTotalPosts(0);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, [currentPage, postsPerPage]);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  if (loading) {
    return <div className="loading">Loading...</div>;
  }

  return (
    <div className="board-container">
      <div className="board-header">
        <h1 className="board-title">게시판</h1>
        <Link to="write" className="btn btn-primary">글쓰기</Link>
      </div>
      
      <table className="board-table">
        <thead>
          <tr>
            <th>번호</th>
            <th>제목</th>
            <th>작성자</th>
            <th>작성일</th>
            <th>조회수</th>
          </tr>
        </thead>
        <tbody>
          {posts.map(post => (
            <tr key={post.id}>
              <td>{post.id}</td>
              <td><Link to={`/board/${post.id}`} className="post-link">{post.title}</Link></td>
              <td>{post.author?.nickname || 'Unknown'}</td>
              <td>{formatDate(post.createTime)}</td>
              <td>{post.viewCount || 0}</td>
            </tr>
          ))}
</tbody>
      </table>
      
      <Pagination
        postsPerPage={postsPerPage}
        totalPosts={totalPosts}
        paginate={paginate}
        currentPage={currentPage}
      />
    </div>
  );
};

export default BoardList;
