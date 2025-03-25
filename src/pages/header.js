import React from 'react';
import { Link } from 'react-router-dom'; // react-router-dom을 사용한 라우팅 예시
import './header.css'; // 헤더 스타일을 위한 CSS 파일

const Header = () => {
  return (
    <header className="header">
        <div className="mainnav">
            <div className="logo">
                <Link to ="/">logo</Link>
            </div>
            <nav className="nav">
                <ul className="nav-list">
                    <li className="nav-item">
                        <Link to ="/login">로그인</Link>
                    </li>
                    <li className="nav-item">
                        <Link to="/signup">회원가입</Link>
                    </li>
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
                            <Link to="/board">자유게시판</Link>
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