import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './signup.css';
import axios from 'axios';

// API 요청 함수 분리
const checkUsername = async (nickname) => {
  try {
    const { data } = await axios.post(
      '/member/checkUsername',
      { nickname },
      { headers: { 'Content-Type': 'application/json' } }
    );

    // 모든 응답 케이스를 한 줄로 처리
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
      '/member/checkNickname',
      JSON.stringify({ nickname }), // 명시적 JSON 변환
      {
        headers: {
          'Content-Type': 'application/json; charset=UTF-8' // 인코딩 명시
        }
      }
    );
    
    return data === "checkNickname" ? false : 
           typeof data === 'object' ? data.isNicknameExists :
           data === "true";
  } catch (error) {
    console.error('닉네임 검사 오류:', {
      request: error.config,
      response: error.response?.data
    });
    return true;
  }
};

const registerUser = async (userData) => {
  try {
    const response = await fetch('/member/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userData),
    });
    if (!response.ok) throw new Error('회원가입에 실패했습니다.');
    return true;
  } catch (error) {
    console.error('회원가입 요청 실패:', error);
    throw error;
  }
};

// 비밀번호 유효성 검사 함수
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
    position: '',
  });
  const [errors, setErrors] = useState({}); // 에러 상태 통합
  const navigate = useNavigate();

  // 입력 필드 값 변경 시 호출
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
    setErrors({ ...errors, [name]: '' }); // 해당 필드의 에러 초기화
  };

  // 아이디 중복 검사 (onBlur)
  const handleUsernameBlur = async () => {
    if (formData.username) {
      const isUsernameExists = await checkUsername(formData.username);
      if (isUsernameExists) {
        setErrors({ ...errors, username: '이미 사용 중인 아이디입니다.' });
      } else {
        setErrors({ ...errors, username: '' });
      }
    }
  };

  // 닉네임 중복 검사 (onBlur)
  const handleNicknameBlur = async () => {
    if (formData.nickname) {
      const isNicknameExists = await checkNickname(formData.nickname);
      if (isNicknameExists) {
        setErrors({ ...errors, nickname: '이미 사용 중인 닉네임입니다.' });
      } else {
        setErrors({ ...errors, nickname: '' });
      }
    }
  };

  // 비밀번호 유효성 검사 (onBlur)
  const handlePasswordBlur = () => {
    if (formData.password && !validatePassword(formData.password)) {
      setErrors({ ...errors, password: '비밀번호는 8자 이상, 소문자 1개, 숫자 1개를 포함해야 하며 공백은 허용되지 않습니다.' });
    } else {
      setErrors({ ...errors, password: '' });
    }
  };

  // 비밀번호 확인 검사 (onBlur)
  const handlePasswordCheckBlur = () => {
    if (formData.passwordCheck && formData.password !== formData.passwordCheck) {
      setErrors({ ...errors, passwordCheck: '비밀번호가 일치하지 않습니다.' });
    } else {
      setErrors({ ...errors, passwordCheck: '' });
    }
  };

  // 폼 제출 시 호출
  const handleSubmit = async (e) => {
    e.preventDefault();

    // 모든 필드의 에러를 확인
    if (Object.values(errors).some((error) => error)) {
      setErrors({ ...errors, global: '입력값을 다시 확인해주세요.' });
      return;
    }

    const { passwordCheck, ...requestData } = formData;

    // 회원가입 요청
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
    <div>
      <h2 className="signup">회원가입</h2>
      {errors.global && <p style={{ color: 'red' }}>{errors.global}</p>}
      <form onSubmit={handleSubmit}>
        <div>
          <label>닉네임:</label>
          <input
            type="text"
            name="nickname"
            value={formData.nickname}
            onChange={handleChange}
            onBlur={handleNicknameBlur} // 닉네임 중복 검사
            required
          />
          {errors.nickname && <p style={{ color: 'red' }}>{errors.nickname}</p>}
        </div>
        <div>
          <label>아이디:</label>
          <input
            type="text"
            name="username"
            value={formData.username}
            onChange={handleChange}
            onBlur={handleUsernameBlur} // 아이디 중복 검사
            required
          />
          {errors.username && <p style={{ color: 'red' }}>{errors.username}</p>}
        </div>
        <div>
          <label>비밀번호:</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            onBlur={handlePasswordBlur} // 비밀번호 유효성 검사
            required
          />
          {errors.password && <p style={{ color: 'red' }}>{errors.password}</p>}
        </div>
        <div>
          <label>비밀번호 확인:</label>
          <input
            type="password"
            name="passwordCheck"
            value={formData.passwordCheck}
            onChange={handleChange}
            onBlur={handlePasswordCheckBlur} // 비밀번호 확인 검사
            required
          />
          {errors.passwordCheck && <p style={{ color: 'red' }}>{errors.passwordCheck}</p>}
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
            <option value="SNOWBOARDER">스노우보더</option>
            <option value="SKIER">스키어</option>
            <option value="ALLROUNDER">올라운더</option>
          </select>
        </div>
        <button type="submit">가입하기</button>
      </form>
    </div>
  );
};

export default Signup;