import { BrowserRouter, Routes, Route } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import Home from './pages/Home';
import Overview from './pages/Overview';
import SuccessStories from './pages/SuccessStories';
import Promotions from './pages/Promotions';
import OurStory from './pages/OurStory';
import MeetTheTeam from './pages/MeetTheTeam';
import OurFacilities from './pages/OurFacilities';
import StrengthTraining from './pages/StrengthTraining';
import YogaClasses from './pages/YogaClasses';
import CardioBlast from './pages/CardioBlast';
import CrossfitSessions from './pages/CrossfitSessions';
import PersonalTrainers from './pages/PersonalTrainers';
import NutritionExperts from './pages/NutritionExperts';
import Physiotherapists from './pages/Physiotherapists';
import PlansPricing from './pages/PlansPricing';
import CorporateMembership from './pages/CorporateMembership';
import FamilyPackages from './pages/FamilyPackages';
import ClassSchedule from './pages/ClassSchedule';
import TrainerAvailability from './pages/TrainerAvailability';
import EventsCalendar from './pages/EventsCalendar';
import ContactForm from './pages/ContactForm';
import LocationMap from './pages/LocationMap';
import Faqs from './pages/Faqs';
import About from './pages/About';
import Faq from './pages/Faq';
import Classes from './pages/Classes';
import Trainers from './pages/Trainers';
import Membership from './pages/Membership';
import Schedule from './pages/Schedule';
import Contact from './pages/Contact';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import ForgetPage from './pages/ForgetPage';
import AdminDashboard from './pages/AdminDashboard';
import TrainerDashboard from './pages/TrainerDashboard';
import UserDashboard from './pages/UserDashboard';

// import ProtectedRoute from './components/ProtectedRoute';
import Cardio from './pages/Cardio';
import Yoga from './pages/Yoga';
import Nutrition from './pages/Nutrition';
import Physiotherapy from './pages/Physiotherapy';
import Privacy from './pages/Privacy';
import Terms from './pages/Terms';
import Refund from './pages/Refund';
import Sitemap from './pages/Sitemap';

function App() {
  // Inline server-verified auth + role guard (no new files)
  const Guard = ({ need, children }) => {
    const [allow, setAllow] = useState(false);
    const [checked, setChecked] = useState(false);

    useEffect(() => {
      let alive = true;
      (async () => {
        try {
          const res = await fetch('http://localhost:3000/api/auth/user', {
            method: 'GET',
            credentials: 'include',
            headers: { 'Accept': 'application/json' }
          });
          if (!res.ok) {
            if (alive) window.location.replace('/login');
            return;
          }
            const data = await res.json();
            const role = (data?.user?.role || '').toLowerCase();
            // If required role mismatch -> send to their own dashboard
            if (need && role !== need.toLowerCase()) {
              const target = role === 'admin' ? '/admin' : (role === 'trainer' || role === 'traniner') ? '/trainer' : '/user';
              if (alive) window.location.replace(target);
              return;
            }
            if (alive) setAllow(true);
        } catch (e) {
          if (alive) window.location.replace('/login');
        } finally {
          if (alive) setChecked(true);
        }
      })();
      return () => { alive = false; };
    }, [need]);

    if (!checked) return null; // could show loader
    if (!allow) return null;
    return children;
  };

  return (
    <>
      {/* UsersFetcher intentionally disabled */}
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/classes" element={<Classes />} />
          <Route path="/trainers" element={<Trainers />} />
          <Route path="/membership" element={<Membership />} />
          <Route path="/schedule" element={<Schedule />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/forgot-password" element={<ForgetPage />} />

          {/* Submenu Pages */}
          <Route path="/overview" element={<Overview />} />
          <Route path="/success-stories" element={<SuccessStories />} />
          <Route path="/promotions" element={<Promotions />} />
          <Route path="/our-story" element={<OurStory />} />
          <Route path="/meet-the-team" element={<MeetTheTeam />} />
          <Route path="/our-facilities" element={<OurFacilities />} />
          <Route path="/strength-training" element={<StrengthTraining />} />
          <Route path="/yoga-classes" element={<YogaClasses />} />
          <Route path="/cardio-blast" element={<CardioBlast />} />
          <Route path="/crossfit-sessions" element={<CrossfitSessions />} />
          <Route path="/personal-trainers" element={<PersonalTrainers />} />
          <Route path="/nutrition-experts" element={<NutritionExperts />} />
          <Route path="/physiotherapists" element={<Physiotherapists />} />
          <Route path="/plans-pricing" element={<PlansPricing />} />
          <Route path="/corporate-membership" element={<CorporateMembership />} />
          <Route path="/family-packages" element={<FamilyPackages />} />
          <Route path="/class-schedule" element={<ClassSchedule />} />
          <Route path="/trainer-availability" element={<TrainerAvailability />} />
          <Route path="/events-calendar" element={<EventsCalendar />} />
          <Route path="/contact-form" element={<ContactForm />} />
          <Route path="/location-map" element={<LocationMap />} />
          <Route path="/faqs" element={<Faqs />} />

          {/* Footer Pages */}
          <Route path="/cardio" element={<Cardio />} />
          <Route path="/yoga" element={<Yoga />} />
          <Route path="/nutrition" element={<Nutrition />} />
          <Route path="/physiotherapy" element={<Physiotherapy />} />
          <Route path="/privacy" element={<Privacy />} />
          <Route path="/terms" element={<Terms />} />
          <Route path="/refund" element={<Refund />} />
          <Route path="/sitemap" element={<Sitemap />} />
          <Route path="/faq" element={<Faq />} />

          {/* Protected (server token check) */}
          <Route path="/admin" element={<Guard need="admin"><AdminDashboard /></Guard>} />
          <Route path="/trainer" element={<Guard need="trainer"><TrainerDashboard /></Guard>} />
          <Route path="/user" element={<Guard need="user"><UserDashboard /></Guard>} />

        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;