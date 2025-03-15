import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './signup.css';

const Signup = () => {
  const [formData, setFormData] = useState({
    nickname: '',
    loginId: '',
    password: '',
    passwordCheck: '',
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

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.password !== formData.passwordCheck) {
      setError('비밀번호가 일치하지 않습니다.');
      return;
    }

    try {
      const response = await fetch('http://3.39.173.116:8080/member/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          nickname: formData.nickname,
          loginId: formData.loginId,
          password: formData.password,
          position: formData.position,
        }),
      });

      if (!response.ok) {
        throw new Error('회원가입에 실패했습니다.');
      }

      alert('회원가입이 완료되었습니다!');
      navigate('/');
    } catch (error) {
      setError(error.message);
    }
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
            name="loginId"
            value={formData.loginId}
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
            name="passwordCheck"
            value={formData.passwordCheck}
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
