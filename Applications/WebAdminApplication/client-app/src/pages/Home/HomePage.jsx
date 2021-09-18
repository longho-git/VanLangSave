import HomeCarousel from 'pages/components/HomeCarousel/HomeCarousel';
import HomeCategory from 'pages/components/HomeCategory/HomeCategory';
import HomePostLasted from 'pages/components/HomePostLasted/HomePostLasted';
import React from 'react';

// Core Components

function HomePage() {
  return (
    <>
      <HomeCarousel />
      <div className="main main-raised">
        <HomeCategory />
        <HomePostLasted />
      </div>
    </>
  );
}

export default HomePage;
