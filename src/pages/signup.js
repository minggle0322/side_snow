import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './signup.css';

const Signup = () => {
  const [formData, setFormData] = useState({
    nickname: '',
    username: '',
    password: '',
    confirmPassword: '',
    position: '',
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

  const handleSubmit = (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      setError('비밀번호가 일치하지 않습니다.');
      return;
    }

    // 회원가입 로직 구현 (예: API 호출)
    console.log('회원가입 데이터:', formData);
    setError('');
    alert('회원가입이 완료되었습니다!');
    navigate('/'); // 회원가입 성공 시 홈 화면으로 이동
  };

  return (
    <div>
        
      <h2 className="signup">회원가입</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <form onSubmit={handleSubmit}>
        <div>
          <label>닉네임:</label>
          <input
            type="text"
            name="nickname"
            value={formData.nickname}
            onChange={handleChange}
            required
          />
        </div>
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
        <div>
          <label>비밀번호 확인:</label>
          <input
            type="password"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label>포지션:</label>
          <select
            name="position"
            value={formData.position}
            onChange={handleChange}
            required
          >
            <option value="">-- 포지션 선택 --</option>
            <option value="스노우보더">스노우보더</option>
            <option value="스키어">스키어</option>
          </select>
        </div>

        <button type="submit">가입하기</button>
      </form>
    </div>
  );
};

export default Signup;