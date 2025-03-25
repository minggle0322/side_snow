import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Pagination from './Pagination';
import './Board.css';


const BoardList = () => {
  const [posts, setPosts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(10);
  const [totalPosts, setTotalPosts] = useState(0);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await axios.get(`http://3.39.173.116:8080/api/boards?page=${currentPage - 1}&size=${postsPerPage}`);
        setPosts(res.data.content);
        setTotalPosts(res.data.totalElements);
      } catch (err) {
        console.error(err);
      }
    };

    fetchPosts();
  }, [currentPage, postsPerPage]);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

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
              <td>
                <Link to={`/board/${post.id}`} className="post-link">
                  {post.title}
                </Link>
              </td>
              <td>{post.author}</td>
              <td>{new Date(post.createdAt).toLocaleDateString()}</td>
              <td>{post.viewCount}</td>
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