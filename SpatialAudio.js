// import { useState, useEffect, useRef } from 'react';
// import { FiHeadphones, FiVolume2, FiVolumeX } from 'react-icons/fi';
// import './SpatialAudio.css'; // We'll create this next
// const musicLibrary = [
//     { id: 1, name: 'Track 1', path: '/music/372171__jovica__20170101-embracer-3d-neverending-story-cegb-chord-100-bpm-ni-guitar-rig-5-take-it-down.wav' },
//     // { id: 2, name: 'Track 2', path: '/path/to/track2.mp3' },
//     // Add more tracks as needed
//   ];
// export default function SpatialAudio2() {
//   const [isPlaying, setIsPlaying] = useState(false);
//   const [position, setPosition] = useState(0); // -1 (left) to 1 (right)
//   const [tracks, setTracks] = useState(musicLibrary);
//   const [currentTrack, setCurrentTrack] = useState(null);

//   const audioContextRef = useRef(null);
//   const pannerNodeRef = useRef(null);
//   const audioBufferRef = useRef(null);

//   // Initialize audio context
//   useEffect(() => {
//     audioContextRef.current = new (window.AudioContext || window.webkitAudioContext)();
//     pannerNodeRef.current = audioContextRef.current.createPanner();
//     pannerNodeRef.current.panningModel = 'HRTF';
//     pannerNodeRef.current.distanceModel = 'inverse';
//     pannerNodeRef.current.refDistance = 1;

//     // Load a sample audio (you can replace with your own)
//     // loadSampleAudio();
//     loadAudio();

//     return () => {
//       if (audioContextRef.current.state !== 'closed') {
//         audioContextRef.current.close();
//       }
//     };
//   }, []);

//   const handleFileUpload = (e) => {
//     const files = Array.from(e.target.files);
//     const newTracks = files.map((file, index) => ({
//       id: tracks.length + index + 1,
//       name: file.name.replace('.mp3', ''),
//       file: file
//     }));
//     setTracks([...tracks, ...newTracks]);
//   };


// //   const loadSampleAudio = async () => {
// //     try {
// //       const response = await fetch('https://assets.codepen.io/21542/howler-demo-bg-music.mp3');
// //       console.log("res: ",response)
// //       const arrayBuffer = await response.arrayBuffer();
// //       console.log("arr: ",arrayBuffer)
// //       audioBufferRef.current = await audioContextRef.current.decodeAudioData(arrayBuffer);
// //     } catch (error) {
// //       console.error('Error loading audio:', error);
// //     }
// //   };

// const loadAudio = async (track) => {
//     try {
//       let arrayBuffer;
      
//       if (track.file) {
//         // For files uploaded via input
//         arrayBuffer = await track.file.arrayBuffer();
//       } else if (track.path) {
//         // For predefined paths
//         const response = await fetch(track.path);
//         arrayBuffer = await response.arrayBuffer();
//       } else {
//         console.error('No valid audio source provided');
//         return;
//       }
      
//       audioBufferRef.current = await audioContextRef.current.decodeAudioData(arrayBuffer);
//       setCurrentTrack(track);
      
//       // Auto-play if already playing another track
//       if (isPlaying) {
//         stopAudio();
//         playAudio();
//       }
//     } catch (error) {
//       console.error('Error loading audio:', error);
//     }
//   };

//   const togglePlayback = () => {
//     if (!audioBufferRef.current) {
//       if (tracks.length > 0) {
//         loadAudio(tracks[0]); // Load first track if none selected
//       } else {
//         return;
//       }
//     }

//     if (isPlaying) {
//       stopAudio();
//     } else {
//       playAudio();
//     }
//     setIsPlaying(!isPlaying);
//   };

//   const playAudio = () => {
//     const source = audioContextRef.current.createBufferSource();
//     source.buffer = audioBufferRef.current;
//     source.loop = true;
    
//     pannerNodeRef.current.positionX.value = position * 5; // -5 to 5
//     source.connect(pannerNodeRef.current);
//     pannerNodeRef.current.connect(audioContextRef.current.destination);
    
//     source.start();
//     source.onended = () => setIsPlaying(false);
//   };

//   const stopAudio = () => {
//     audioContextRef.current.suspend();
//   };

//   const handlePositionChange = (e) => {
//     const newPos = parseFloat(e.target.value);
//     setPosition(newPos);
    
//     if (pannerNodeRef.current && isPlaying) {
//       pannerNodeRef.current.positionX.value = newPos * 5;
//     }
//   };

//   return (
//     <div className="spatial-audio-container">
//       <h1><FiHeadphones /> Spatial Audio Lab</h1>
      
//       <div className="audio-controls">
//         <button onClick={togglePlayback}>
//           {isPlaying ? <FiVolumeX /> : <FiVolume2 />}
//           {isPlaying ? ' Stop Sound' : ' Play Sound'}
//         </button>
        
//         <div className="position-control">
//           <label>Sound Position: {position.toFixed(1)}</label>
//           <input
//             type="range"
//             min="-1"
//             max="1"
//             step="0.1"
//             value={position}
//             onChange={handlePositionChange}
//           />
//           <div className="position-labels">
//             <span>Left</span>
//             <span>Center</span>
//             <span>Right</span>
//           </div>
//         </div>
//       </div>

      
      
//       <div className="audio-visualization">
//         <div 
//           className="sound-source"
//           style={{ left: `${(position + 1) * 50}%` }}
//         ></div>
//       </div>
//       <div>
//       <div className="track-list">
//           {tracks.map(track => (
//             <div 
//               key={track.id} 
//               className={`track-item ${currentTrack?.id === track.id ? 'active' : ''}`}
//               onClick={() => loadAudio(track)}
//             >
//               {track.name}
//             </div>
//           ))}
//         </div>
      
      
//       </div>
//     </div>
//   );
// }


import { useState, useEffect, useRef } from 'react';
import { FiHeadphones, FiVolume2, FiVolumeX, FiMusic } from 'react-icons/fi';
import './SpatialAudio.css';
import { Headphones, Music, Pause, Play, SkipBack, SkipForward } from 'lucide-react';

// Import your local MP3 files (they should be in your src/assets/ or public/ folder)
// import track1 from './assets/track1.mp3';
// import track2 from './assets/track2.mp3';
// Import more tracks as needed

// Define your music library with imported tracks
const musicLibrary = [
        { id: 1, name: 'Track 1', path: '/music/372171__jovica__20170101-embracer-3d-neverending-story-cegb-chord-100-bpm-ni-guitar-rig-5-take-it-down.wav' },
    //     // { id: 2, name: 'Track 2', path: '/path/to/track2.mp3' },
    { id: 2, name: 'Track 2', path: '/music/449547__sirkoto51__notification-chime.wav' },
    //     // Add more tracks as needed
      ];

      export default function SpatialAudio2() {
        const [isPlaying, setIsPlaying] = useState(false);
        const [position, setPosition] = useState(0);
        const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
        const audioContextRef = useRef(null);
        const pannerNodeRef = useRef(null);
        const audioBufferRef = useRef(null);
        const sourceNodeRef = useRef(null);
      
        // Get current track from index
        const currentTrack = musicLibrary[currentTrackIndex];
      
        // Initialize audio context
        useEffect(() => {
          audioContextRef.current = new (window.AudioContext || window.webkitAudioContext)();
          pannerNodeRef.current = audioContextRef.current.createPanner();
          pannerNodeRef.current.panningModel = 'HRTF';
          pannerNodeRef.current.distanceModel = 'inverse';
          pannerNodeRef.current.refDistance = 1;
      
          // Load the first track
          if (musicLibrary.length > 0) {
            loadAudio(currentTrackIndex);
          }
      
          return () => {
            if (audioContextRef.current.state !== 'closed') {
              audioContextRef.current.close();
            }
          };
        }, []);
      
        const loadAudio = async (trackIndex) => {
          try {
            const track = musicLibrary[trackIndex];
            const response = await fetch(track.path);
            const arrayBuffer = await response.arrayBuffer();
            audioBufferRef.current = await audioContextRef.current.decodeAudioData(arrayBuffer);
            setCurrentTrackIndex(trackIndex);
            
            // Auto-play if already playing
            if (isPlaying) {
              stopAudio();
              playAudio();
            }
          } catch (error) {
            console.error('Error loading audio:', error);
          }
        };
      
        const togglePlayback = () => {
          if (!audioBufferRef.current) {
            if (musicLibrary.length > 0) {
              loadAudio(0); // Load first track if none selected
            } else {
              return;
            }
          }
      
          if (isPlaying) {
            stopAudio();
          } else {
            playAudio();
          }
          setIsPlaying(!isPlaying);
        };
      
        const playAudio = () => {
          if (!audioBufferRef.current) return;
          
          audioContextRef.current.resume();
          sourceNodeRef.current = audioContextRef.current.createBufferSource();
          sourceNodeRef.current.buffer = audioBufferRef.current;
          sourceNodeRef.current.loop = true;
          
          pannerNodeRef.current.positionX.value = position * 5;
          sourceNodeRef.current.connect(pannerNodeRef.current);
          pannerNodeRef.current.connect(audioContextRef.current.destination);
          
          sourceNodeRef.current.start();
          sourceNodeRef.current.onended = () => {
            setIsPlaying(false);
            // Auto-play next track when current ends
            playNextTrack();
          };
        };
      
        const stopAudio = () => {
          if (sourceNodeRef.current) {
            sourceNodeRef.current.stop();
            sourceNodeRef.current = null;
          }
        };
      
        const playNextTrack = () => {
          const nextIndex = (currentTrackIndex + 1) % musicLibrary.length;
          loadAudio(nextIndex);
          if (isPlaying) {
            playAudio();
          }
        };
      
        const playPreviousTrack = () => {
          const prevIndex = (currentTrackIndex - 1 + musicLibrary.length) % musicLibrary.length;
          loadAudio(prevIndex);
          if (isPlaying) {
            playAudio();
          }
        };
      
        const handlePositionChange = (e) => {
          const newPos = parseFloat(e.target.value);
          setPosition(newPos);
          
          if (pannerNodeRef.current && isPlaying) {
            pannerNodeRef.current.positionX.value = newPos * 5;
          }
        };
      
        return (
          <div className="spatial-audio-container">
            <h1><Headphones /> Spatial Audio Lab</h1>
            
            <div className="track-selection">
              <h2><Music /> Music Library</h2>
              
              <div className="track-list">
                {musicLibrary.map((track, index) => (
                  <div 
                    key={track.id} 
                    className={`track-item ${currentTrackIndex === index ? 'active' : ''}`}
                    onClick={() => loadAudio(index)}
                  >
                    {track.name}
                  </div>
                ))}
              </div>
            </div>
            
            <div className="audio-controls">
              <div className="now-playing">
                Now Playing: {currentTrack?.name || 'No track selected'}
              </div>
              
              <div className="player-controls">
                <button className="nav-button" onClick={playPreviousTrack}>
                  {/* <SkipBack /> */}
                </button>
                
                <button className="play-button" onClick={togglePlayback}>
                  {isPlaying ? <Pause /> : <Play />}
                </button>
                
                <button className="nav-button" onClick={playNextTrack}>
                  {/* <SkipForward /> */}
                </button>
              </div>
              
              <div className="position-control">
                <label>Sound Position: {position.toFixed(1)}</label>
                <input
                  type="range"
                  min="-1"
                  max="1"
                  step="0.1"
                  value={position}
                  onChange={handlePositionChange}
                />
                <div className="position-labels">
                  <span>Left</span>
                  <span>Center</span>
                  <span>Right</span>
                </div>
              </div>
            </div>
            
            <div className="audio-visualization">
              <div 
                className="sound-source"
                style={{ left: `${(position + 1) * 50}%` }}
              ></div>
            </div>
          </div>
        );
      }