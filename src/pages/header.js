import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './header.css';

const Header = () => {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token');
    setIsLoggedIn(!!token);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    setIsLoggedIn(false);
    alert('로그아웃 되었습니다.');
    navigate('/');
  };

  return (
<header className="header">
  <div className="mainnav">
    {/* 왼쪽: 로고 + 메뉴 */}
    <div className="left">
      <Link className="logoimg" to="/">logo</Link>

      <nav className="hover">
        <ul className="hover-list">
          <li className="hover-item"><Link to="/">홈</Link></li>
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

    {/* 오른쪽: 로그인/회원가입 */}
    <div className="right">
      <ul className="nav-list">
        {isLoggedIn ? (
          <li className="nav-item">
            <button onClick={handleLogout} className="logout-btn">로그아웃</button>
          </li>
        ) : (
          <>
            <li className="nav-item"><Link to="/login">로그인</Link></li>
            <li className="nav-item"><Link to="/signup">회원가입</Link></li>
          </>
        )}
      </ul>
    </div>
  </div>
</header>

  );
};

export default Header;
