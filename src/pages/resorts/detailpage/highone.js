import React from 'react';
import './ResortDetail.css';

// SVG 아이콘 컴포넌트들
const ArrowLeft = () => (
  <svg className="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
    <path d="M19 12H5M12 19l-7-7 7-7" />
  </svg>
);

const MapPin = () => (
  <svg className="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
    <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
    <circle cx="12" cy="10" r="3" />
  </svg>
);

const Clock = () => (
  <svg className="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
    <circle cx="12" cy="12" r="10" />
    <path d="M12 6v6l4 2" />
  </svg>
);

const Calendar = () => (
  <svg className="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
    <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
    <path d="M16 2v4M8 2v4M3 10h18" />
  </svg>
);

const Snowflake = () => (
  <svg className="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
    <path d="M2 12h20" />
    <path d="M12 2v20" />
    <path d="m20 16-4-4 4-4" />
    <path d="m4 8 4 4-4 4" />
    <path d="m16 4-4 4-4-4" />
    <path d="m8 20 4-4 4 4" />
  </svg>
);

const Thermometer = () => (
  <svg className="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
    <path d="M14 4v10.54a4 4 0 1 1-4 0V4a2 2 0 0 1 4 0Z" />
  </svg>
);

// 날씨 배지 컴포넌트
const WeatherBadge = ({ condition, temperature, size = 'md' }) => {
  const getWeatherStyles = () => {
    switch(condition) {
      case 'sunny':
        return { bg: 'weather-badge-sunny', text: 'text-yellow-400', icon: '☀️' };
      case 'cloudy':
        return { bg: 'weather-badge-cloudy', text: 'text-gray-400', icon: '☁️' };
      case 'snowing':
        return { bg: 'weather-badge-snowing', text: 'text-blue-400', icon: '❄️' };
      case 'raining':
        return { bg: 'weather-badge-raining', text: 'text-blue-400', icon: '🌧️' };
      default:
        return { bg: 'weather-badge-default', text: 'text-gray-400', icon: '🌤️' };
    }
  };

  const styles = getWeatherStyles();
  const sizeClass = size === 'lg' ? 'weather-badge-lg' : 'weather-badge-md';
  
  return (
    <span className={`weather-badge ${styles.bg} ${styles.text} ${sizeClass}`}>
      {styles.icon} {temperature}°C
    </span>
  );
};

// 슬로프 테이블 컴포넌트
const SlopeTable = ({ slopes }) => {
  return (
    <div className="slope-table-container">
      <table className="slope-table">
        <thead>
          <tr>
            <th>슬로프 이름</th>
            <th>난이도</th>
            <th>길이</th>
            <th>상태</th>
          </tr>
        </thead>
        <tbody>
          {slopes.map((slope, index) => (
            <tr key={index}>
              <td>{slope.name}</td>
              <td>
                <span className={`slope-level ${slope.level}`}>
                  {slope.level === 'beginner' ? '초급' : 
                   slope.level === 'intermediate' ? '중급' : '상급'}
                </span>
              </td>
              <td>{slope.length}</td>
              <td>
                <span className={`slope-status ${slope.status}`}>
                  {slope.status === 'open' ? '운영중' : 
                   slope.status === 'closed' ? '폐쇄' : '부분개방'}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

// 날씨 예보 컴포넌트
const WeatherForecast = ({ forecast }) => {
  return (
    <div className="weather-forecast">
      {forecast.map((day, index) => (
        <div key={index} className="forecast-day">
          <div className="forecast-date">{day.date}</div>
          <div className="forecast-condition">
            {day.condition === 'sunny' ? '☀️' : 
             day.condition === 'cloudy' ? '☁️' : 
             day.condition === 'snowing' ? '❄️' : '🌧️'}
          </div>
          <div className="forecast-temp">
            {day.temperature.min}°C / {day.temperature.max}°C
          </div>
          <div className="forecast-snow">
            <Snowflake /> {day.snowfall}cm
          </div>
        </div>
      ))}
    </div>
  );
};

// 리조트 상세 페이지 메인 컴포넌트
const Highone = ({ resortId }) => {
  // 실제 앱에서는 resortId를 통해 API 호출
  const resort = resorts.find(r => r.id === resortId) || resorts[0];
  const [activeTab, setActiveTab] = React.useState('slopes');

  return (
    <div className="resort-detail-page">
      <header className="resort-header">
        <div className="header-container">
          <div className="logo-container">
            <a href="/" className="logo-link">
              <span className="logo-text">화이트밸런스</span>
            </a>
          </div>
          <div className="user-nav-container">
            {/* 사용자 네비게이션 구현 */}
          </div>
        </div>
      </header>
      
      <main className="resort-main">
        <div className="container">
          <a href="/resorts" className="back-link">
            <ArrowLeft />
            <span>리조트 목록으로 돌아가기</span>
          </a>

          <div className="resort-detail-grid">
            <div className="main-content">
              <div className="resort-hero">
                <img
                  src={resort.image || "/placeholder.svg"}
                  alt={resort.name}
                  className="resort-image"
                />
                <div className="resort-hero-overlay">
                  <h1>{resort.name}</h1>
                  <div className="resort-location">
                    <MapPin />
                    <span>{resort.location}</span>
                  </div>
                </div>
                <div className="weather-badge-top">
                  <WeatherBadge
                    condition={resort.weather.condition}
                    temperature={resort.weather.temperature}
                    size="lg"
                  />
                </div>
              </div>

              <div className="resort-tabs">
                <div className="tab-buttons">
                  <button
                    className={`tab-button ${activeTab === 'slopes' ? 'active' : ''}`}
                    onClick={() => setActiveTab('slopes')}
                  >
                    슬로프 현황
                  </button>
                  <button
                    className={`tab-button ${activeTab === 'facilities' ? 'active' : ''}`}
                    onClick={() => setActiveTab('facilities')}
                  >
                    시설 정보
                  </button>
                  <button
                    className={`tab-button ${activeTab === 'prices' ? 'active' : ''}`}
                    onClick={() => setActiveTab('prices')}
                  >
                    이용 요금
                  </button>
                </div>

                <div className="tab-content">
                  {activeTab === 'slopes' && (
                    <div className="slopes-tab">
                      <h3>슬로프 운영 현황</h3>
                      <div className={`slope-status ${resort.slopes.status}`}>
                        {resort.slopes.status === "good"
                          ? "슬로프 상태 좋음"
                          : resort.slopes.status === "fair"
                            ? "슬로프 상태 보통"
                            : "슬로프 상태 나쁨"}
                      </div>
                      <div className="slope-stats-grid">
                        <div className="stat-item">
                          <div className="stat-title">운영 슬로프</div>
                          <div className="stat-value">
                            {resort.slopes.open}/{resort.slopes.total}
                          </div>
                        </div>
                        <div className="stat-item">
                          <div className="stat-title">적설량</div>
                          <div className="stat-value">{resort.weather.snowDepth}cm</div>
                        </div>
                        <div className="stat-item">
                          <div className="stat-title">리프트 운영</div>
                          <div className="stat-value">
                            {resort.lifts.open}/{resort.lifts.total}
                          </div>
                        </div>
                        <div className="stat-item">
                          <div className="stat-title">최근 강설</div>
                          <div className="stat-value">{resort.lastSnowfall}</div>
                        </div>
                      </div>
                      <SlopeTable slopes={resort.slopeDetails} />
                    </div>
                  )}

                  {activeTab === 'facilities' && (
                    <div className="facilities-tab">
                      <h3>시설 정보</h3>
                      <div className="facilities-grid">
                        <div className="facility-card">
                          <h4>운영 시간</h4>
                          <div className="facility-details">
                            <div className="facility-row">
                              <span>주간 스키</span>
                              <span>09:00 - 16:30</span>
                            </div>
                            <div className="facility-row">
                              <span>야간 스키</span>
                              <span>18:30 - 22:00</span>
                            </div>
                            <div className="facility-row">
                              <span>심야 스키</span>
                              <span>22:30 - 02:00</span>
                            </div>
                          </div>
                        </div>
                        <div className="facility-card">
                          <h4>부대시설</h4>
                          <ul className="facility-list">
                            <li>레스토랑 (3개소)</li>
                            <li>카페 (2개소)</li>
                            <li>장비 렌탈샵</li>
                            <li>스키 스쿨</li>
                            <li>의무실</li>
                            <li>락커룸 & 샤워실</li>
                          </ul>
                        </div>
                      </div>
                      <div className="transport-card">
                        <h4>교통 정보</h4>
                        <p>서울에서 자동차로 약 2시간 소요 (영동고속도로 이용)</p>
                        <p>셔틀버스 운행: 서울 강남역, 잠실역, 동서울터미널에서 출발 (사전 예약 필요)</p>
                      </div>
                    </div>
                  )}

                  {activeTab === 'prices' && (
                    <div className="prices-tab">
                      <h3>이용 요금</h3>
                      <div className="price-table-container">
                        <table className="price-table">
                          <thead>
                            <tr>
                              <th>구분</th>
                              <th>주간</th>
                              <th>야간</th>
                              <th>심야</th>
                              <th>종일권</th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr>
                              <td>대인 (평일)</td>
                              <td>76,000원</td>
                              <td>68,000원</td>
                              <td>58,000원</td>
                              <td>99,000원</td>
                            </tr>
                            <tr>
                              <td>대인 (주말/공휴일)</td>
                              <td>89,000원</td>
                              <td>78,000원</td>
                              <td>68,000원</td>
                              <td>115,000원</td>
                            </tr>
                            <tr>
                              <td>소인 (평일)</td>
                              <td>58,000원</td>
                              <td>52,000원</td>
                              <td>45,000원</td>
                              <td>76,000원</td>
                            </tr>
                            <tr>
                              <td>소인 (주말/공휴일)</td>
                              <td>68,000원</td>
                              <td>62,000원</td>
                              <td>52,000원</td>
                              <td>89,000원</td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                      <div className="price-note">
                        * 장비 렌탈 및 의류 렌탈은 별도 요금이 부과됩니다.
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>

            <div className="sidebar">
              <div className="sidebar-card">
                <h3>리조트 정보</h3>
                <div className="resort-info">
                  <div className="info-item">
                    <MapPin />
                    <div>
                      <div className="info-label">주소</div>
                      <div className="info-value">{resort.address}</div>
                    </div>
                  </div>
                  <div className="info-item">
                    <Clock />
                    <div>
                      <div className="info-label">운영 시간</div>
                      <div className="info-value">09:00 - 02:00 (익일)</div>
                    </div>
                  </div>
                  <div className="info-item">
                    <Calendar />
                    <div>
                      <div className="info-label">시즌</div>
                      <div className="info-value">2024년 11월 ~ 2025년 3월</div>
                    </div>
                  </div>
                  <div className="info-item">
                    <Snowflake />
                    <div>
                      <div className="info-label">슬로프 정보</div>
                      <div className="info-value">
                        총 {resort.slopes.total}면 (초급: {resort.slopesByLevel.beginner}, 중급:{" "}
                        {resort.slopesByLevel.intermediate}, 상급: {resort.slopesByLevel.advanced})
                      </div>
                    </div>
                  </div>
                  <div className="info-item">
                    <Thermometer />
                    <div>
                      <div className="info-label">최대 표고</div>
                      <div className="info-value">{resort.elevation}m</div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="sidebar-card">
                <h3>날씨 예보</h3>
                <WeatherForecast forecast={resort.forecast} />
              </div>

              <div className="sidebar-card">
                <h3>공지사항</h3>
                <div className="notices-list">
                  {resort.notices.map((notice, index) => (
                    <div key={index} className="notice-item">
                      <div className="notice-title">{notice.title}</div>
                      <div className="notice-content">{notice.content}</div>
                      <div className="notice-date">{notice.date}</div>
                    </div>
                  ))}
                </div>
              </div>

              <button className="visit-website-btn">리조트 홈페이지 방문</button>
            </div>
          </div>

          <div className="resort-photos">
            <h3>슬로프 사진</h3>
            <div className="photos-grid">
              {resort.photos.map((photo, index) => (
                <div key={index} className="photo-item">
                  <img
                    src={photo || "/placeholder.svg"}
                    alt={`${resort.name} 슬로프 ${index + 1}`}
                    className="photo-image"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
      
      <footer className="resort-footer">
        <div className="footer-container">
          <p>&copy; 2025 화이트밸런스. 모든 권리 보유.</p>
          <div className="footer-links">
            <a href="/">이용약관</a>
            <a href="/">개인정보처리방침</a>
            <a href="/">문의하기</a>
          </div>
        </div>
      </footer>
    </div>
  );
};

// resorts.js

const resorts = [
    {
      id: "high1",
      name: "하이원 리조트",
      location: "강원도 정선군",
      address: "강원도 정선군 고한읍 하이원길 424",
      image: "/placeholder.svg?height=300&width=400",
      difficulty: "상급",
      elevation: 1376,
      weather: {
        temperature: -7,
        condition: "sunny",
        snowDepth: 140,
      },
      slopes: {
        open: 18,
        total: 20,
        status: "good",
      },
      slopesByLevel: {
        beginner: 5,
        intermediate: 8,
        advanced: 7,
      },
      lifts: {
        open: 10,
        total: 10,
      },
      lastSnowfall: "3일 전",
      slopeDetails: [
        {
          name: "마운틴 1",
          level: "beginner",
          length: "700m",
          status: "open",
        },
        {
          name: "마운틴 2",
          level: "beginner",
          length: "900m",
          status: "open",
        },
        {
          name: "밸리 1",
          level: "intermediate",
          length: "1,400m",
          status: "open",
        },
        {
          name: "밸리 2",
          level: "intermediate",
          length: "1,600m",
          status: "open",
        },
        {
          name: "챔피언",
          level: "advanced",
          length: "2,400m",
          status: "open",
        },
        {
          name: "익스트림",
          level: "advanced",
          length: "2,800m",
          status: "partial",
        },
      ],
      forecast: [
        {
          date: "오늘",
          condition: "sunny",
          temperature: {
            min: -9,
            max: -4,
          },
          snowfall: 0,
        },
        {
          date: "내일",
          condition: "cloudy",
          temperature: {
            min: -8,
            max: -3,
          },
          snowfall: 0,
        },
        {
          date: "모레",
          condition: "snowing",
          temperature: {
            min: -10,
            max: -5,
          },
          snowfall: 12,
        },
      ],
      notices: [
        {
          title: "스노우파크 오픈 안내",
          content: "1월 8일부터 챔피언 슬로프 옆 스노우파크가 오픈합니다. 다양한 점프대와 레일이 설치되었습니다.",
          date: "2025.01.05",
        },
        {
          title: "설 연휴 예약 안내",
          content: "설 연휴 기간(2월 9일~12일) 예약이 조기 마감될 수 있으니 서둘러 예약해 주세요.",
          date: "2025.01.03",
        },
      ],
      photos: [
        "/placeholder.svg?height=200&width=300",
        "/placeholder.svg?height=200&width=300",
        "/placeholder.svg?height=200&width=300",
        "/placeholder.svg?height=200&width=300",
      ],
    },
  ];
  
  export default Highone;
  