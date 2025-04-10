import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './signup.css';
import axios from 'axios';

// API 요청 함수
const checkUsername = async (username) => {
  try {
    const { data } = await axios.post(
      'https://whitebalance.site/member/checkUsername',
      { username },
      {
        headers: {
          'Content-Type': 'application/json; charset=UTF-8'
        },
        transformRequest: [(data) => JSON.stringify(data)]
      }
    );
    return data === "checkUsername" ? false :
           typeof data === 'object' ? data.isUsernameExists :
           data === "true";
  } catch (error) {
    console.error('아이디 검사 오류:', error.response?.data || error.message);
    return true;
  }
};

const checkNickname = async (nickname) => {
  try {
    const { data } = await axios.post(
      'https://whitebalance.site/member/checkNickname',
      JSON.stringify({ nickname }),
      {
        headers: {
          'Content-Type': 'application/json; charset=UTF-8'
        }
      }
    );
    return data === "checkNickname" ? false :
           typeof data === 'object' ? data.isNicknameExists :
           data === "true";
  } catch (error) {
    console.error('닉네임 검사 오류:', error.response?.data || error.message);
    return true;
  }
};

const registerUser = async (userData) => {
  try {
    const response = await fetch('https://whitebalance.site/member/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(userData)
    });
    if (!response.ok) throw new Error('회원가입에 실패했습니다.');
    return true;
  } catch (error) {
    console.error('회원가입 요청 실패:', error);
    throw error;
  }
};

const validatePassword = (password) => {
  const regex = /^(?=.*[a-z])(?=.*\d)[^\s]{8,}$/;
  return regex.test(password);
};

const Signup = () => {
  const [formData, setFormData] = useState({
    nickname: '',
    username: '',
    password: '',
    passwordCheck: '',
    position: ''
  });
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    setErrors({ ...errors, [name]: '' });
  };

  const handleUsernameBlur = async () => {
    if (formData.username) {
      const isUsernameExists = await checkUsername(formData.username);
      if (isUsernameExists) {
        setErrors({ ...errors, username: '이미 사용 중인 아이디입니다.' });
      }
    }
  };

  const handleNicknameBlur = async () => {
    if (formData.nickname) {
      const isNicknameExists = await checkNickname(formData.nickname);
      if (isNicknameExists) {
        setErrors({ ...errors, nickname: '이미 사용 중인 닉네임입니다.' });
      }
    }
  };

  const handlePasswordBlur = () => {
    if (formData.password && !validatePassword(formData.password)) {
      setErrors({ ...errors, password: '비밀번호는 8자 이상, 소문자 1개, 숫자 1개를 포함해야 하며 공백은 허용되지 않습니다.' });
    }
  };

  const handlePasswordCheckBlur = () => {
    if (formData.passwordCheck && formData.password !== formData.passwordCheck) {
      setErrors({ ...errors, passwordCheck: '비밀번호가 일치하지 않습니다.' });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (Object.values(errors).some((error) => error)) {
      setErrors({ ...errors, global: '입력값을 다시 확인해주세요.' });
      return;
    }

    const { passwordCheck, ...requestData } = formData;

    try {
      const isSuccess = await registerUser(requestData);
      if (isSuccess) {
        alert('회원가입이 완료되었습니다!');
        navigate('/login');
      }
    } catch (error) {
      setErrors({ ...errors, global: error.message });
    }
  };

  return (
    <div className="signup-wrapper">
      <div className="signup-top-section">
        <a href="/" className="signup-home-link">← 홈으로 돌아가기</a>
      </div>

      <h1 className="signup-title">화이트밸런스 회원가입</h1>
      <p className="signup-subtitle">아래 정보를 입력하여 화이트밸런스 커뮤니티에 가입하세요.</p>

      <div className="signup-card">
        <form className="signup-form" onSubmit={handleSubmit}>
          {errors.global && <p className="signup-error">{errors.global}</p>}

          <div>
            <label>닉네임</label>
            <input name="nickname" value={formData.nickname} onChange={handleChange} onBlur={handleNicknameBlur} />
            {errors.nickname && <p className="signup-error">{errors.nickname}</p>}
          </div>

          <div>
            <label>아이디</label>
            <input name="username" value={formData.username} onChange={handleChange} onBlur={handleUsernameBlur} />
            {errors.username && <p className="signup-error">{errors.username}</p>}
          </div>

          <div>
            <label>비밀번호</label>
            <input type="password" name="password" value={formData.password} onChange={handleChange} onBlur={handlePasswordBlur} />
            {errors.password && <p className="signup-error">{errors.password}</p>}
          </div>

          <div>
            <label>비밀번호 확인</label>
            <input type="password" name="passwordCheck" value={formData.passwordCheck} onChange={handleChange} onBlur={handlePasswordCheckBlur} />
            {errors.passwordCheck && <p className="signup-error">{errors.passwordCheck}</p>}
          </div>

          <div>
            <label>포지션</label>
            <select name="position" value={formData.position} onChange={handleChange}>
              <option value="">-- 포지션 선택 --</option>
              <option value="SNOWBOARDER">스노우보더</option>
              <option value="SKIER">스키어</option>
              <option value="ALLROUNDER">올라운더</option>
            </select>
          </div>

          <button type="submit" className="signup-submit">계정 만들기</button>
        </form>

        <p className="signup-footer">이미 계정이 있으신가요? <a href="/login">로그인</a></p>
      </div>
    </div>
  );
};

export default Signup;
