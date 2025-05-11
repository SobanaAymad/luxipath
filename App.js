import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useState } from 'react';
import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Scanner from './pages/OCRScanner';
import SpatialAudio from './pages/SpatialAudio';
import MemoryGame from './pages/MemoryGame';
import TextToSpeech from './pages/TextToSpeech';
import MathSolver from './pages/MathSolver';
import Settings from './pages/Settings';
import LoginEmail from './pages/LoginEmail';
import LoginPhone from './pages/LoginPhone';
import Signup from './pages/Signup';
import OCRScanner from './components/OCRScanner';
import './App.css';

function App() {
  const [darkMode, setDarkMode] = useState(false);

  return (
    <div className={`app-container ${darkMode ? 'dark' : ''}`}>
      <Router>
        <AuthProvider>
          <Navbar darkMode={darkMode} toggleDarkMode={() => setDarkMode(!darkMode)} />
          
          <main className="main-content">
            <Routes>
              <Route path="/login" element={<LoginEmail />} />
              <Route path="/phone-login" element={<LoginPhone />} />
              <Route path="/signup" element={<Signup />} />

              <Route path="/" element={<ProtectedRoute><Home /></ProtectedRoute>} />
              <Route path="/scanner" element={<ProtectedRoute><Scanner /></ProtectedRoute>} />
              <Route path="/spatial-audio" element={<ProtectedRoute><SpatialAudio /></ProtectedRoute>} />
              <Route path="/memory-game" element={<ProtectedRoute><MemoryGame /></ProtectedRoute>} />
              <Route path="/text-to-speech" element={<ProtectedRoute><TextToSpeech /></ProtectedRoute>} />
              <Route path="/math-solver" element={<ProtectedRoute><MathSolver /></ProtectedRoute>} />
              <Route path="/settings" element={
                <ProtectedRoute>
                  <Settings darkMode={darkMode} setDarkMode={setDarkMode} />
                </ProtectedRoute>
              } />
              
              {/* New OCR Scanner route */}
              <Route path="/ocr-scanner" element={<ProtectedRoute><OCRScanner /></ProtectedRoute>} />
            </Routes>
          </main>
          
          <Footer />
        </AuthProvider>
      </Router>
    </div>
  );
}

export default App;