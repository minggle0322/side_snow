import React from 'react';
import { Routes, Route, Outlet } from 'react-router-dom';
import BoardList from '../components/board/BoardList';
import BoardDetail from '../components/board/BoardDetail';
import BoardWrite from '../components/board/BoardWrite';
import BoardEdit from '../components/board/BoardEdit';

const BoardPage = () => {
  return (
    <div className="board-page">
      <Routes>
        {/* /board 경로일 때는 BoardList 표시 */}
        <Route index element={
          <>
            <h1>게시판</h1>
            <BoardList />
          </>
        } />
        
        {/* /board/:id - 게시글 상세 보기 */}
        <Route path=":id" element={<BoardDetail />} />
        
        {/* /board/write - 글 작성 페이지 */}
        <Route path="write" element={<BoardWrite />} />
        
        {/* /board/edit/:id - 글 수정 페이지 */}
        <Route path="edit/:id" element={<BoardEdit />} />
      </Routes>
      <Outlet />
    </div>
  );
};

export default BoardPage;