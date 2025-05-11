import { useState } from 'react';

function TextToSpeech() {
  const [text, setText] = useState('');

  const speak = () => {
    // Check if browser supports TTS
    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(text);
      window.speechSynthesis.speak(utterance);
    } else {
      alert("Your browser doesn't support text-to-speech.");
    }
  };

  return (
    <div className="tts-box">
      <h2>Text-to-Speech</h2>
      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Type something and I'll read it aloud..."
        rows={5}
      />
      <button onClick={speak}>Read Aloud</button>
    </div>
  );
}

export default TextToSpeech;