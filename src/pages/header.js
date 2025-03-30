import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './header.css';

const Header = () => {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // 초기 로드 시 로그인 상태 확인
  useEffect(() => {
    const token = localStorage.getItem('token');
    setIsLoggedIn(!!token); // 토큰이 있으면 true, 없으면 false
  }, []);

  // 로그아웃 처리 함수
  const handleLogout = () => {
    localStorage.removeItem('token'); // localStorage에서 토큰 삭제
    setIsLoggedIn(false); // 로그인 상태 false로 변경
    alert('로그아웃 되었습니다.');
    navigate('/'); // 홈으로 이동
  };

  return (
    <header className="header">
      <div className="mainnav">
        <div className="logo">
          <Link to="/">logo</Link>
        </div>
        <nav className="nav">
          <ul className="nav-list">
            {isLoggedIn ? (
              <li className="nav-item">
                <button onClick={handleLogout} className="logout-btn">로그아웃</button>
              </li>
            ) : (
              <>
                <li className="nav-item">
                  <Link to="/login">로그인</Link>
                </li>
                <li className="nav-item">
                  <Link to="/signup">회원가입</Link>
                </li>
              </>
            )}
          </ul>
        </nav>
      </div>

      <div className="subnav">
        <nav className="hover">
          <ul className="hover-list">
            <li className="hover-item">
              스키장 이용정보
              <ul className="dropdown-menu">
                <li>스키장별</li>
                <li>정보별</li>
              </ul>
            </li>

            <li className="hover-item">
              장터
              <ul className="dropdown-menu">
                <li>최저가비교</li>
                <li>중고장터</li>
              </ul>
            </li>
            <li className="hover-item">
              커뮤니티    
              <ul className="dropdown-menu">
                <li><Link to="/board">자유게시판</Link></li>
                <li>같이탈사람</li>
              </ul>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
