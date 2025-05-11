import React, { useState } from 'react';
import axios from 'axios';

function OCRScanner() {
  const [text, setText] = useState("");
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleScan = async (e) => {
    e.preventDefault();
    if (!image) return;

    setLoading(true);
    const formData = new FormData();
    formData.append("file", image);

    try {
      const response = await axios.post("http://localhost:8000/scan", formData);
      setText(response.data.text);
    } catch (error) {
      console.error("Error:", error);
      alert("OCR failed. Please try another image.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: "20px", maxWidth: "600px", margin: "0 auto" }}>
      <h1>LuxiPath OCR Scanner</h1>
      <form onSubmit={handleScan}>
        <input
          type="file"
          accept="image/*"
          onChange={(e) => setImage(e.target.files[0])}
          style={{ marginBottom: "10px" }}
        />
        <button 
          type="submit" 
          disabled={loading}
          style={{ padding: "8px 16px", background: loading ? "#ccc" : "#007bff", color: "white", border: "none" }}
        >
          {loading ? "Processing..." : "Scan Text"}
        </button>
      </form>
      
      {text && (
        <div style={{ marginTop: "20px", padding: "10px", border: "1px solid #ddd" }}>
          <h3>Extracted Text:</h3>
          <p>{text}</p>
        </div>
      )}
    </div>
  );
}

export default OCRScanner;