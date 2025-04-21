import React from 'react';
import { Routes, Route, Outlet } from 'react-router-dom';
import ResortMain from './resorts'
import Highone from './detailpage/highone'

const ResortPage = () => {
  return (
    <div className="board-page">
      <Routes>
        <Route index element={
          <>
            <ResortMain />
          </>
        } />
        
        <Route path="highone" element={<Highone />} />
      </Routes>
      <Outlet />
    </div>
  );
};

export default ResortPage;