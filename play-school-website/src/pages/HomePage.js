import React from 'react';
import Header from '../components/Header';
import Footer from '../components/footer';
import HeroSection from '../components/HeroSection';
import Gallery from '../components/Gallery';
import Faq from '../components/Faq';

const HomePage = () => {
  return (
    <div>
      <Header />
      <HeroSection />
      <Gallery/>
      <Faq/>
      <Footer />
    </div>
  );
};

export default HomePage;
