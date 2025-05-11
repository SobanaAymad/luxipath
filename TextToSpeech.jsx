import { useState } from 'react';
import { FiVolume2 } from 'react-icons/fi';

export default function TextToSpeech() {
  const [text, setText] = useState('');
  const [isSpeaking, setIsSpeaking] = useState(false);

  const handleSpeak = () => {
    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(text);
      window.speechSynthesis.speak(utterance);
      setIsSpeaking(true);
      
      utterance.onend = () => setIsSpeaking(false);
    } else {
      alert("Text-to-speech not supported in your browser");
    }
  };

  return (
    <div className="page tts-page">
      <h1><FiVolume2 /> Text to Speech</h1>
      
      <div className="tts-container">
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Enter text to convert to speech..."
          rows={6}
        />
        
        <div className="tts-controls">
          <button 
            onClick={handleSpeak}
            disabled={!text || isSpeaking}
          >
            {isSpeaking ? 'Speaking...' : 'Speak'}
          </button>
          
          <button 
            onClick={() => window.speechSynthesis.cancel()}
            disabled={!isSpeaking}
          >
            Stop
          </button>
        </div>
      </div>
    </div>
  );
}