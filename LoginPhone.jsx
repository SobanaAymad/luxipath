import { useState, useEffect, useRef } from 'react';
import { useNavigate, Link } from 'react-router-dom'; // Added Link import here
import { auth } from '../firebase';
import { RecaptchaVerifier, signInWithPhoneNumber } from 'firebase/auth';
import { useAuth } from '../context/AuthContext';

export default function LoginPhone() {
  const [phone, setPhone] = useState('');
  const [otp, setOtp] = useState('');
  const [confirmation, setConfirmation] = useState(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const recaptcha = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    recaptcha.current = new RecaptchaVerifier(auth, 'recaptcha-container', {
      'size': 'invisible',
    });

    return () => {
      if (recaptcha.current) recaptcha.current.clear();
    };
  }, []);

  async function sendOTP() {
    try {
      setLoading(true);
      const formattedPhone = `+${phone.replace(/\D/g, '')}`;
      const confirmation = await signInWithPhoneNumber(
        auth, 
        formattedPhone, 
        recaptcha.current
      );
      setConfirmation(confirmation);
    } catch (err) {
      setError(err.message);
    }
    setLoading(false);
  }

  async function verifyOTP() {
    try {
      setLoading(true);
      await confirmation.confirm(otp);
      navigate('/');
    } catch (err) {
      setError('Invalid OTP');
    }
    setLoading(false);
  }

  return (
    <div className="auth-container">
      <h2>Phone Login</h2>
      {error && <div className="error">{error}</div>}
      
      {!confirmation ? (
        <>
          <input
            type="tel"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            placeholder="+1 234567890"
            required
          />
          <button onClick={sendOTP} disabled={loading}>
            Send OTP
          </button>
        </>
      ) : (
        <>
          <input
            type="text"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            placeholder="Enter OTP"
            required
          />
          <button onClick={verifyOTP} disabled={loading}>
            Verify OTP
          </button>
        </>
      )}
      
      <div className="auth-links">
        <Link to="/login">Use Email Instead</Link>
      </div>
      <div id="recaptcha-container"></div>
    </div>
  );
}