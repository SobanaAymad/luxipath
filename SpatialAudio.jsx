import { useState } from 'react';
import SpatialAudio2 from '../components/SpatialAudio';

export default function SpatialAudio() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [position, setPosition] = useState(0);

  return (
    <div className="page audio-page">
      <h1>Spatial Audio Lab</h1>
      <div className="audio-visualizer">
        {/* Audio visualization will appear here */}
        <div className="position-indicator" style={{ left: `${(position + 1) * 50}%` }}></div>
      </div>
      <div className="audio-controls">
        <button onClick={() => setIsPlaying(!isPlaying)}>
          {isPlaying ? 'Pause' : 'Play'}
        </button>
        <input
          type="range"
          min="-1"
          max="1"
          step="0.1"
          value={position}
          onChange={(e) => setPosition(e.target.value)}
        />
      </div>
      <SpatialAudio2/>
    </div>
  );
}