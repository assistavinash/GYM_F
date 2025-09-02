import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import UsersFetcher from './components/UsersFetcher';
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
import Unauthorized from './pages/Unauthorized';
import ProtectedRoute from './components/ProtectedRoute';
import Cardio from './pages/Cardio';
import Yoga from './pages/Yoga';
import Nutrition from './pages/Nutrition';
import Physiotherapy from './pages/Physiotherapy';
import Privacy from './pages/Privacy';
import Terms from './pages/Terms';
import Refund from './pages/Refund';
import Sitemap from './pages/Sitemap';

function App() {
  return (
    <>
      <UsersFetcher />
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

          {/* Protected Routes */}
          <Route path="/admin" element={
            <ProtectedRoute allowedRoles={["admin"]}>
              <AdminDashboard />
            </ProtectedRoute>
          } />

          <Route path="/trainer" element={
            <ProtectedRoute allowedRoles={["trainer"]}>
              <TrainerDashboard />
            </ProtectedRoute>
          } />

          <Route path="/user" element={
            <ProtectedRoute allowedRoles={["user"]}>
              <UserDashboard />
            </ProtectedRoute>
          } />

          <Route path="/unauthorized" element={<Unauthorized />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
