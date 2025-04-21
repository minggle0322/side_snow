import React, { useState } from 'react';
import './resorts.css';
import { SnowEffect } from '../../components/snow/snoweffect';

// SVG 아이콘 컴포넌트들
const SearchIcon = () => (
  <svg className="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
    <circle cx="11" cy="11" r="8" />
    <path d="m21 21-4.3-4.3" />
  </svg>
);

const FilterIcon = () => (
  <svg className="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
    <path d="M4 21V14" />
    <path d="M4 10V3" />
    <path d="M12 21V12" />
    <path d="M12 8V3" />
    <path d="M20 21V16" />
    <path d="M20 12V3" />
    <path d="M1 14h6" />
    <path d="M9 8h6" />
    <path d="M17 16h6" />
  </svg>
);

const MapPinIcon = () => (
  <svg className="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
    <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
    <circle cx="12" cy="10" r="3" />
  </svg>
);

const SnowflakeIcon = () => (
  <svg className="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
    <path d="M2 12h20" />
    <path d="M12 2v20" />
    <path d="m20 16-4-4 4-4" />
    <path d="m4 8 4 4-4 4" />
    <path d="m16 4-4 4-4-4" />
    <path d="m8 20 4-4 4 4" />
  </svg>
);

const ThermometerIcon = () => (
  <svg className="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
    <path d="M14 4v10.54a4 4 0 1 1-4 0V4a2 2 0 0 1 4 0Z" />
  </svg>
);

const ChevronLeft = () => (
  <svg className="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
    <path d="m15 18-6-6 6-6" />
  </svg>
);

const ChevronRight = () => (
  <svg className="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
    <path d="m9 18 6-6-6-6" />
  </svg>
);

const WeatherBadge = ({ condition, temperature }) => {
  const getWeatherStyles = () => {
    switch(condition) {
      case 'sunny':
        return { bg: 'bg-yellow-500/20', text: 'text-yellow-400', icon: '☀️' };
      case 'cloudy':
        return { bg: 'bg-gray-500/20', text: 'text-gray-400', icon: '☁️' };
      case 'snowing':
        return { bg: 'bg-blue-500/20', text: 'text-blue-400', icon: '❄️' };
      case 'raining':
        return { bg: 'bg-blue-500/20', text: 'text-blue-400', icon: '🌧️' };
      default:
        return { bg: 'bg-gray-500/20', text: 'text-gray-400', icon: '🌤️' };
    }
  };

  const styles = getWeatherStyles();
  
  return (
    <span className={`weather-badge ${styles.bg} ${styles.text}`}>
      {styles.icon} {temperature}°C
    </span>
  );
};

const ResortCardExtended = ({ resort }) => {
  return (
    <div className="resort-card">
      <div className="card-image-container">
        <img
          src={resort.image || "/placeholder.svg"}
          alt={resort.name}
          className="card-image"
        />
        <div className="weather-badge-container">
          <WeatherBadge condition={resort.weather.condition} temperature={resort.weather.temperature} />
        </div>
      </div>
      <div className="card-content">
        <div className="card-header">
          <div>
            <h3 className="resort-name">{resort.name}</h3>
            <div className="location">
              <MapPinIcon />
              {resort.location}
            </div>
          </div>
          <span className={`difficulty-badge ${resort.difficulty.toLowerCase()}`}>
            {resort.difficulty}
          </span>
        </div>

        <div className="stats-grid">
          <div className="stat-item">
            <div className="stat-title">
              <SnowflakeIcon />
              <span>적설량</span>
            </div>
            <span className="stat-value">{resort.weather.snowDepth}cm</span>
          </div>
          <div className="stat-item">
            <div className="stat-title">
              <ThermometerIcon />
              <span>슬로프</span>
            </div>
            <span className="stat-value">
              {resort.slopes.open}/{resort.slopes.total}
            </span>
          </div>
        </div>

        <div className={`slope-status ${resort.slopes.status}`}>
          {resort.slopes.status === "good" 
            ? "상태 좋음" 
            : resort.slopes.status === "fair" 
              ? "상태 보통" 
              : "상태 나쁨"}
        </div>
      </div>
    </div>
  );
};

const Resorts = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [regionFilter, setRegionFilter] = useState('all');
  const [difficultyFilter, setDifficultyFilter] = useState('all');

  const filteredResorts = resorts.filter(resort => {
    const matchesSearch = resort.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         resort.location.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRegion = regionFilter === 'all' || resort.location.includes(regionFilter);
    const matchesDifficulty = difficultyFilter === 'all' || resort.difficulty === difficultyFilter;
    
    return matchesSearch && matchesRegion && matchesDifficulty;
  });

  return (
    <div className="resorts-page">
      <SnowEffect/>
      
      <main className="resorts-main">
        <div className="hero-banner">
          <img
            src="/placeholder.svg"
            alt="Winter mountain landscape"
            className="banner-image"
          />
          <div className="banner-overlay"></div>
          <div className="banner-content">
            <h1>스키 리조트 정보</h1>
            <p>국내 주요 스키장의 실시간 날씨, 슬로프 현황, 적설량 정보를 확인하세요.</p>
          </div>
        </div>

        <div className="content-container">
          <div className="filter-card">
            <div className="filter-grid">
              <div className="search-container">
                <SearchIcon />
                <input
                  type="text"
                  placeholder="리조트 검색..."
                  className="search-input"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              
              <div className="select-container">
                <select 
                  className="filter-select"
                  value={regionFilter}
                  onChange={(e) => setRegionFilter(e.target.value)}
                >
                  <option value="all">전체</option>
                  <option value="강원도">강원도</option>
                  <option value="경기도">경기도</option>
                  <option value="충청도">충청도</option>
                  <option value="경상도">경상도</option>
                </select>
              </div>
              
              <div className="select-container">
                <select 
                  className="filter-select"
                  value={difficultyFilter}
                  onChange={(e) => setDifficultyFilter(e.target.value)}
                >
                  <option value="all">전체</option>
                  <option value="초급">초급</option>
                  <option value="중급">중급</option>
                  <option value="상급">상급</option>
                </select>
              </div>
              
              <button className="filter-button">
                <FilterIcon />
                <span>필터 적용</span>
              </button>
            </div>
          </div>

          <div className="resorts-grid">
            {filteredResorts.map((resort, index) => (
              <a href={`/resorts/${resort.id}`} key={index} className="resort-link">
                <ResortCardExtended resort={resort} />
              </a>
            ))}
          </div>

          <div className="pagination-container">
            <div className="pagination-controls">
              <button className="pagination-button">
                <ChevronLeft />
              </button>
              <button className="pagination-button active">1</button>
              <button className="pagination-button">2</button>
              <button className="pagination-button">3</button>
              <button className="pagination-button">
                <ChevronRight />
              </button>
            </div>
          </div>
        </div>
      </main>
      
      <footer className="resorts-footer">
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

// 임시 데이터
const resorts = [
    {
      id: "yongpyong",
      name: "용평 리조트",
      location: "강원도 평창군",
      image: "/placeholder.svg?height=300&width=400",
      difficulty: "중급",
      weather: {
        temperature: -5,
        condition: "snowing",
        snowDepth: 120,
      },
      slopes: {
        open: 28,
        total: 31,
        status: "good",
      },
    },
    {
      id: "vivaldi",
      name: "비발디 파크",
      location: "강원도 홍천군",
      image: "/placeholder.svg?height=300&width=400",
      difficulty: "초급",
      weather: {
        temperature: -3,
        condition: "cloudy",
        snowDepth: 85,
      },
      slopes: {
        open: 12,
        total: 13,
        status: "good",
      },
    },
    {
      id: "highone",
      name: "하이원 리조트",
      location: "강원도 정선군",
      image: "/placeholder.svg?height=300&width=400",
      difficulty: "상급",
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
    },
    {
      id: "phoenix",
      name: "휘닉스 평창",
      location: "강원도 평창군",
      image: "/placeholder.svg?height=300&width=400",
      difficulty: "중급",
      weather: {
        temperature: -4,
        condition: "cloudy",
        snowDepth: 95,
      },
      slopes: {
        open: 21,
        total: 21,
        status: "fair",
      },
    },
    {
      id: "elysian",
      name: "엘리시안 강촌",
      location: "강원도 춘천시",
      image: "/placeholder.svg?height=300&width=400",
      difficulty: "초급",
      weather: {
        temperature: -2,
        condition: "cloudy",
        snowDepth: 70,
      },
      slopes: {
        open: 10,
        total: 10,
        status: "fair",
      },
    },
    {
      id: "bears",
      name: "베어스타운",
      location: "경기도 포천시",
      image: "/placeholder.svg?height=300&width=400",
      difficulty: "초급",
      weather: {
        temperature: -1,
        condition: "cloudy",
        snowDepth: 60,
      },
      slopes: {
        open: 11,
        total: 11,
        status: "fair",
      },
    },
  ]
  

export default Resorts;