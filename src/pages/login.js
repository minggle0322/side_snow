import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios'; // axios import
import './login.css'; // CSS 파일 (선택 사항)

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
      // 백엔드로 데이터 전송
      const response = await axios.post('http://3.39.173.116:8080/member/login', {
        username: formData.username,
        password: formData.password,
      });

      console.log('서버 응답:', response.data);
      setError('');
      alert('로그인 성공!');
      navigate('/'); // 로그인 성공 시 홈 화면으로 이동
    } catch (error) {
      console.error('로그인 실패:', error);
      setError('아이디 또는 비밀번호가 잘못되었습니다.');
    }
  };

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