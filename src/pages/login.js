import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './login.css';

const Login = () => {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
  });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('https://whitebalance.site/member/login', {
        username: formData.username,
        password: formData.password,
      });

      const rawToken = response.data.accessToken ||
                       response.data.token ||
                       response.headers['authorization'] ||
                       response.headers['Authorization'];

      if (!rawToken) throw new Error('토큰이 응답에 없습니다');

      const pureToken = rawToken.replace(/^Bearer\s+/i, '');
      localStorage.setItem('token', pureToken);
      console.log('저장된 토큰:', pureToken);

      window.location.reload();
    } catch (error) {
      console.error('로그인 실패:', error);
      setError(error.response?.data?.message || '아이디 또는 비밀번호가 잘못되었습니다.');
    }
  };

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) navigate('/');
  }, [navigate]);

  return (
    <div className="login-page">
      <a href="/" className="back-link">
        ← 홈으로 돌아가기
      </a>

      <div className="login-card">
        <div className="login-card-header">
          <h2 className="login-title">화이트밸런스 로그인</h2>
          <p className="login-sub">계정 정보를 입력하여 로그인하세요.</p>
        </div>

        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="username" className="login-label">아이디</label>
            <input
              id="username"
              name="username"
              type="text"
              placeholder="your_id"
              className="login-input"
              value={formData.username}
              onChange={handleChange}
              required
            />
          </div>

          <div style={{ marginTop: '1rem' }}>
            <label htmlFor="password" className="login-label">비밀번호</label>
            <input
              id="password"
              name="password"
              type="password"
              placeholder="••••••••"
              className="login-input"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>

          <div className="remember-me">
            <input type="checkbox" id="remember" />
            <label htmlFor="remember">로그인 상태 유지</label>
          </div>

          {error && (
            <p style={{ color: 'tomato', marginTop: '0.75rem', fontSize: '0.875rem' }}>{error}</p>
          )}

          <button type="submit" className="login-button">
            로그인
          </button>
        </form>

        <div className="signup-text">
          계정이 없으신가요?
          <a href="/signup">회원가입</a>
        </div>

        <div className="divider">
          <span>또는</span>
        </div>

        <button className="social-login">
          소셜 계정으로 로그인
        </button>
      </div>
    </div>
  );
};

export default Login;
