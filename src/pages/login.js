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
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // 1. 백엔드로 로그인 요청
      const response = await axios.post('/member/login', {
        username: formData.username,
        password: formData.password,
      });

      // 2. 토큰 추출 (Bearer 접두사 제거)
      const rawToken = response.data.accessToken || 
                      response.data.token ||
                      response.headers['authorization'] ||
                      response.headers['Authorization'];

      if (!rawToken) {
        throw new Error('토큰이 응답에 없습니다');
      }

      // 3. 순수 토큰 값만 추출 (Bearer 제거)
      const pureToken = rawToken.replace(/^Bearer\s+/i, '');
      localStorage.setItem('token', pureToken); // Bearer 없이 저장
      console.log('저장된 토큰:', pureToken);

      // 4. 로그인 성공 처리 후 페이지 새로고침
      window.location.reload(); // 물리적 새로고침

    } catch (error) {
      console.error('로그인 실패:', {
        status: error.response?.status,
        data: error.response?.data,
        message: error.message
      });
      setError(error.response?.data?.message || '아이디 또는 비밀번호가 잘못되었습니다.');
    }
  };

  useEffect(() => {
    // 페이지가 새로고침 된 후 token이 있으면 홈으로 리디렉션
    const token = localStorage.getItem('token');
    if (token) {
      navigate('/'); // 홈 페이지로 이동
    }
  }, [navigate]);

  return (
    <div>
      <h2 className="login">로그인</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <form onSubmit={handleSubmit}>
        <div>
          <label>아이디:</label>
          <input
            type="text"
            name="username"
            value={formData.username}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>비밀번호:</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit">로그인</button>
      </form>
    </div>
  );
};

export default Login;
