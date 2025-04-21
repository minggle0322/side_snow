import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Pagination from './Pagination';
import './Board.css';

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

const BoardList = () => {
  const [posts, setPosts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(10);
  const [totalPosts, setTotalPosts] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await axios.get(`https://whitebalance.site/article/free?page=${currentPage}`);
        setPosts(Array.isArray(res.data.content) ? res.data.content : []);
        setTotalPosts(res.data.totalElements || 0);
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
    return <div className="community-loading">Loading...</div>;
  }

  return (
    <div className="community-container">
      <div className="community-header">
        <h1 className="community-title">커뮤니티 게시판</h1>
        <Link to="write" className="community-write-btn">글쓰기</Link>
      </div>

      <div className="community-table-wrapper">
        <table className="community-table">
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
                <td>
                  <Link to={`/board/${post.id}`} className="community-post-link">
                    {post.title}
                  </Link>
                </td>
                <td>{post.author?.nickname || 'Unknown'}</td>
                <td>{formatDate(post.createTime)}</td>
                <td>{post.viewCount || 0}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

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