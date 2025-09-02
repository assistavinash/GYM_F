import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Hero } from "../components/home/Hero";
import AboutPreview from "../components/home/AboutPreview";
import CallToAction from "../components/home/CallToAction";
import ClassesPreview from "../components/home/ClassesPreview";
import Features from "../components/home/Features";
import Testimonials from "../components/home/Testimonials";
import TrainersPreview from "../components/home/TrainersPreview";
import Header from "../components/layout/Header";
import Footer from "../components/layout/Footer";
import Sidebar from "../components/layout/Sidebar";

import LoginModal from "../components/LoginModal";
import RegisterModal from "../components/RegisterModal";
import LightRays from "../components/LightRays";
import Particles from "../components/Particles";
import JoinNowPopup from "../components/JoinNowPopup";


const Home = () => {
  const navigate = useNavigate();
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showRegisterModal, setShowRegisterModal] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [showJoinNow, setShowJoinNow] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setShowJoinNow(true), 5000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-gray-900 via-black to-gray-900"
        >
      <Sidebar 
        onLoginClick={() => setShowLoginModal(true)}
        onRegisterClick={() => setShowRegisterModal(true)}
      />
      <Header />
      
      {/* Hero Section */}
      <section className="relative py-0">
        <div className="relative py-0">
          <Hero />
        </div>
      </section>
      {/* Features Section */}
      <section className="relative py-0">


        <div className="relative z-10">
          <Features />
        </div>
      </section>

      {/* About Preview */}
      <section className="relative py-0">

        <div className="relative z-10">
          <AboutPreview />
        </div>
      </section>

      {/* Classes Preview */}
      <section className="relative py-0">

      <div className="absolute inset-0 z-[1]">
        <Particles
          particleCount={isMobile ? 400 : 1000}
          particleSpread={isMobile ? 8 : 12}
          speed={isMobile ? 0.05 : 0.1}
          particleColors={["#FACC15", "#22c55e", "#60A5FA", "#ec4899", "#ffffff"]}
          moveParticlesOnHover={true}
          particleHoverFactor={isMobile ? 0.5 : 0.8}
          alphaParticles={true}
          particleBaseSize={isMobile ? 120 : 200}
          sizeRandomness={0.8}
          cameraDistance={isMobile ? 18 : 25}
          disableRotation={false}
          className="features-particles"
        />
      </div>
        <div className="relative z-10">
          <ClassesPreview />
        </div>
      </section>

      {/* Trainers Preview */}
      <section className="relative py-0">

      <div className="absolute inset-0 z-[1]">
        <Particles
          particleCount={isMobile ? 400 : 1000}
          particleSpread={isMobile ? 8 : 12}
          speed={isMobile ? 0.05 : 0.1}
          particleColors={["#FACC15", "#22c55e", "#60A5FA", "#ec4899", "#ffffff"]}
          moveParticlesOnHover={true}
          particleHoverFactor={isMobile ? 0.5 : 0.8}
          alphaParticles={true}
          particleBaseSize={isMobile ? 120 : 200}
          sizeRandomness={0.8}
          cameraDistance={isMobile ? 18 : 25}
          disableRotation={false}
          className="features-particles"
        />
      </div>
        <div className="relative z-10">
          <TrainersPreview />
        </div>
      </section>

      {/* Testimonials */}
      <section className="relative py-0">

      <div className="absolute inset-0 z-[1]">
        <Particles
          particleCount={isMobile ? 400 : 1000}
          particleSpread={isMobile ? 8 : 12}
          speed={isMobile ? 0.05 : 0.1}
          particleColors={["#FACC15", "#22c55e", "#60A5FA", "#ec4899", "#ffffff"]}
          moveParticlesOnHover={true}
          particleHoverFactor={isMobile ? 0.5 : 0.8}
          alphaParticles={true}
          particleBaseSize={isMobile ? 120 : 200}
          sizeRandomness={0.8}
          cameraDistance={isMobile ? 18 : 25}
          disableRotation={false}
          className="features-particles"
        />
      </div>
        <div className="relative z-10">
          <Testimonials />
        </div>
      </section>

      {/* Call to Action */}
      <section className="relative py-0">

      <div className="absolute inset-0 z-[1]">
        <Particles
          particleCount={isMobile ? 400 : 1000}
          particleSpread={isMobile ? 8 : 12}
          speed={isMobile ? 0.05 : 0.1}
          particleColors={["#FACC15", "#22c55e", "#60A5FA", "#ec4899", "#ffffff"]}
          moveParticlesOnHover={true}
          particleHoverFactor={isMobile ? 0.5 : 0.8}
          alphaParticles={true}
          particleBaseSize={isMobile ? 120 : 200}
          sizeRandomness={0.8}
          cameraDistance={isMobile ? 18 : 25}
          disableRotation={false}
          className="features-particles"
        />
      </div>
        <div className="relative z-10">
          <CallToAction />
        </div>
      </section>
      
      <Footer />
      
      {/* Modals */}
      {showLoginModal && (
        <LoginModal 
          onClose={() => setShowLoginModal(false)}
          onSwitchToRegister={() => {
            setShowLoginModal(false);
            setShowRegisterModal(true);
          }}
        />
      )}

      {showRegisterModal && (
        <RegisterModal 
          onClose={() => setShowRegisterModal(false)}
          onSwitchToLogin={() => {
            setShowRegisterModal(false);
            setShowLoginModal(true);
          }}
        />
      )}

      <JoinNowPopup show={showJoinNow} onClose={() => setShowJoinNow(false)} />
    </div>
  );
};

export default Home;
