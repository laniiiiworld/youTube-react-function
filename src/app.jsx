import React, { useState } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import '@fortawesome/fontawesome-free/js/all.js';
import Header from './components/header/header';
import MainPage from './components/mainPage/mainPage';
import VideoDetailPage from './components/videoDetailPage/videoDetailPage';
import VideoSearchPage from './components/videoSearchPage/videoSearchPage';
import './app.css';

const App = (props) => {
  const navigate = useNavigate();
  const [videos, setVideos] = useState([]);

  /** 검색 페이지로 이동 */
  const handleSearch = async (keyword) => {
    const data = await getSearchResultVideos(keyword);
    setVideos(data);
    navigate(`/search`);
  };

  /** 비디오 클릭시 상세 페이지로 이동 */
  const handleVideoClick = (videoId) => {
    navigate(`/detail/`);
  };

  /** 메인 페이지 - API에서 인기있는 동영상 목록 가져오기 */
  const getMostPopularVideos = async () => {
    try {
      const videos = await props.youtube.videos();
      return videos;
    } catch (error) {
    }
  };

  /** 검색 페이지 - API에서 검색 결과 가져오기 */
  const getSearchResultVideos = async (keyword) => {
    try {
      const videos = await props.youtube.search(keyword);
      return videos;
    } catch (error) {
    }
  };

  return (
    <>
      <Header handleSearch={handleSearch} />
      <Routes>
        <Route path='/' element={<MainPage getMostPopularVideos={getMostPopularVideos} handleVideoClick={handleVideoClick} />} />
        <Route path='/detail' element={<VideoDetailPage />} />
        <Route path='/search' element={<VideoSearchPage videos={videos} handleVideoClick={handleVideoClick} />} />
      </Routes>
    </>
  );
};

export default App;
