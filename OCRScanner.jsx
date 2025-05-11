import { useState } from 'react';

export default function OCRScanner() {
  const [scannedText, setScannedText] = useState('');

  return (
    <div className="page scanner-page">
      <h1>Document Scanner</h1>
      <div className="scanner-container">
        <div className="preview-area">
          {/* Scanner preview will appear here */}
          {scannedText && (
            <div className="result-box">
              <h3>Extracted Text:</h3>
              <p>{scannedText}</p>
            </div>
          )}
        </div>
        <button className="scan-button">Scan Document</button>
      </div>
    </div>
  );
}