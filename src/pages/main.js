import React from 'react';
import { SnowEffect } from "../components/snow/snoweffect";
import "./main.css"

function Home() {


   return (
    <div>
      <SnowEffect />
    <div className="home-container">
      <main className="home-main">
        <section className="hero-section">
          <div className="hero-bg" />
          <div className="hero-overlay" />
          <div className="hero-content">
            <h1 className="hero-title">화이트밸런스</h1>
            <p className="hero-sub">스키와 스노우보드 애호가들을 위한 최고의 커뮤니티에 오신 것을 환영합니다.</p>
            <div className="hero-buttons">
              <button className="btn-primary">
                커뮤니티 가입하기
                <svg className="icon" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </button>
              <button className="btn-outline">더 알아보기</button>
            </div>
          </div>
        </section>

        <section className="tab-section">
          <div className="tabs">
            <div className="tab-buttons">
              <button className="tab-btn active">리조트 정보</button>
              <button className="tab-btn">토론</button>
              <button className="tab-btn">이벤트</button>
            </div>
            <div className="tab-content">
              <div className="tab-panel active">리조트 카드들</div>
              <div className="tab-panel">토론 카드들</div>
              <div className="tab-panel">이벤트 카드들</div>
            </div>
          </div>
        </section>

        <section className="join-section">
          <div className="join-overlay" />
          <div className="join-content">
            <h2 className="join-title">커뮤니티에 가입하세요</h2>
            <p className="join-sub">화이트밸런스 커뮤니티에 가입하여 다른 스키어와 스노우보더들과 경험을 공유하세요.</p>
            <div className="stats">
              <div className="stat-box">
                <svg className="icon" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                  <circle cx="8.5" cy="7" r="4" />
                  <path d="M20 8v6M23 11h-6" />
                </svg>
                <span>5,000+ 회원</span>
              </div>
              <div className="stat-box">
                <svg className="icon" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
                </svg>
                <span>10,000+ 게시글</span>
              </div>
              <div className="stat-box">
                <svg className="icon" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <circle cx="12" cy="10" r="3" />
                  <path d="M12 2a8 8 0 0 1 8 8c0 4-8 12-8 12S4 14 4 10a8 8 0 0 1 8-8z" />
                </svg>
                <span>50+ 리조트</span>
              </div>
            </div>
            <button className="btn-primary full">지금 가입하기</button>
          </div>
        </section>
      </main>
      <footer className="home-footer">
        <div className="footer-inner">
          <p>&copy; 2025 화이트밸런스. 모든 권리 보유.</p>
          <div className="footer-links">
            <a href="/terms">이용약관</a>
            <a href="/policy">개인정보처리방침</a>
            <a href="/inquire">문의하기</a>
          </div>
        </div>
      </footer>
    </div>
  </div>
  );
};

export default Home;