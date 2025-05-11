import { Link } from 'react-router-dom';
// import { FiScan, FiHeadphones, FiCpu } from 'react-icons/fi';

export default function Home() {
  return (
    <div className="page home-page">
      <h1>Welcome to LuxiPath</h1>
      <div className="feature-grid">
        <Link to="/scanner" className="feature-card">
          {/* <FiScan size={48} /> */}
          <h2>OCR Scanner</h2>
          <p>Extract text from images and documents</p>
        </Link>
        
        <Link to="/spatial-audio" className="feature-card">
          {/* <FiHeadphones size={48} /> */}
          <h2>Spatial Audio</h2>
          <p>Immersive 3D sound experience</p>
        </Link>
        
        <Link to="/memory-game" className="feature-card">
          {/* <FiCpu size={48} /> */}
          <h2>Memory Game</h2>
          <p>Boost your cognitive skills</p>
        </Link>
      </div>
    </div>
  );
}