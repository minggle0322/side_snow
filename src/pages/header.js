import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './header.css';

const Header = () => {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [activeDropdown, setActiveDropdown] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('token');
    setIsLoggedIn(!!token);

    const handleResize = () => {
      setWindowWidth(window.innerWidth);
      if (window.innerWidth > 768) {
        setIsMenuOpen(false);
        setActiveDropdown(null);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    setIsLoggedIn(false);
    setIsMenuOpen(false);
    alert('로그아웃 되었습니다.');
    navigate('/');
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
    if (isMenuOpen) {
      setActiveDropdown(null);
    }
  };

  const toggleDropdown = (item) => {
    setActiveDropdown(activeDropdown === item ? null : item);
  };

  return (
    <header className="header">
      <div className="mainnav">
        {/* 왼쪽: 로고 + 메뉴 */}
        <div className="left">
          <Link className="logoimg" to="/">logo</Link>

          {windowWidth > 768 && (
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
          )}
        </div>

        {/* 오른쪽: 로그인/회원가입 */}
        {windowWidth > 768 ? (
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
        ) : (
          <div className="hamburger" onClick={toggleMenu}>
            <div className={`hamburger-line ${isMenuOpen ? 'open' : ''}`}></div>
            <div className={`hamburger-line ${isMenuOpen ? 'open' : ''}`}></div>
            <div className={`hamburger-line ${isMenuOpen ? 'open' : ''}`}></div>
          </div>
        )}
      </div>

      {/* 모바일 메뉴 */}
      <div className={`mobile-menu ${isMenuOpen ? 'open' : ''}`}>
        <nav className="mobile-nav">
          <ul className="mobile-nav-list">
            <li className="mobile-nav-item"><Link to="/" onClick={() => setIsMenuOpen(false)}>홈</Link></li>
            
            <li 
              className={`mobile-nav-item ${activeDropdown === 'ski' ? 'active' : ''}`}
              onClick={() => toggleDropdown('ski')}
            >
              스키장 이용정보
              <ul className="mobile-dropdown">
                <li onClick={() => setIsMenuOpen(false)}>스키장별</li>
                <li onClick={() => setIsMenuOpen(false)}>정보별</li>
              </ul>
            </li>
            
            <li 
              className={`mobile-nav-item ${activeDropdown === 'market' ? 'active' : ''}`}
              onClick={() => toggleDropdown('market')}
            >
              장터
              <ul className="mobile-dropdown">
                <li onClick={() => setIsMenuOpen(false)}>최저가비교</li>
                <li onClick={() => setIsMenuOpen(false)}>중고장터</li>
              </ul>
            </li>
            
            <li 
              className={`mobile-nav-item ${activeDropdown === 'community' ? 'active' : ''}`}
              onClick={() => toggleDropdown('community')}
            >
              커뮤니티
              <ul className="mobile-dropdown">
                <li><Link to="/board" onClick={() => setIsMenuOpen(false)}>자유게시판</Link></li>
                <li onClick={() => setIsMenuOpen(false)}>같이탈사람</li>
              </ul>
            </li>
            
            {isLoggedIn ? (
              <li className="mobile-nav-item">
                <button onClick={handleLogout} className="mobile-logout-btn">로그아웃</button>
              </li>
            ) : (
              <>
                <li className="mobile-nav-item"><Link to="/login" onClick={() => setIsMenuOpen(false)}>로그인</Link></li>
                <li className="mobile-nav-item"><Link to="/signup" onClick={() => setIsMenuOpen(false)}>회원가입</Link></li>
              </>
            )}
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;