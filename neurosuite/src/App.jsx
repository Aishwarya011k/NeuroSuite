import { AuthProvider } from './context/AuthContext';
import { Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import SignUp from './components/SignUp';
import Login from './components/Login';
import SuccessPage from './components/SuccessPage';
import Profile from './components/Profile';
import { useAuth } from './context/AuthContext';
import Features from './components/Features';
import EEGDecoder from './components/EEGDecoder';
import SleepStageDetector from './components/SleepStageDetector';
import About from './components/About';



// Protected Route Component
const ProtectedRoute = ({ children }) => {
  const { user } = useAuth();
  if (!user) {
    return <Navigate to="/login" />;
  }
  return children;
};

function App() {
  return (
    <AuthProvider>
    
      <div className="min-h-screen w-full bg-gradient-to-b from-gray-950 via-gray-900 to-neutral-900">
         
           <Navbar />
       
        <main className="container mx-auto px-4 text-gray-100">
          <Routes>
            <Route path="/" element={
              <>
              <Hero />
              <Features/>
              </>} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/login" element={<Login />} />
            <Route path="/success" element={<SuccessPage />} />
            <Route 
              path="/profile" 
              element={
                <ProtectedRoute>
                  <Profile />
                </ProtectedRoute>
              } 
            />
            {/*<Route path='/about' element={<About />}/>*/}
            <Route path='/features' element={<Features />}/>
              <Route path="/eeg-decoder" element={<EEGDecoder />} />
              <Route path="/sleep-detector" element={<SleepStageDetector />} />
              <Route path="/about" element={<About />} />
             // ...other routes...
            </Routes>
        </main>
      </div>
    </AuthProvider>
  );
}

export default App;