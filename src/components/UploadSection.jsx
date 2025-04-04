import React, { useState } from 'react';
import './UploadSection.css'; // Import the CSS file

function UploadSection({ setUploadedImage, setLoading, setAuthResult }) {
  const [preview, setPreview] = useState(null);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file && file.type.startsWith('image/') && file.size <= 10 * 1024 * 1024) {
      setPreview(URL.createObjectURL(file));
      setUploadedImage(file);
    } else {
      alert('Please upload a valid image file (max 10MB).');
    }
  };

  const checkAuthenticity = async () => {
    setLoading(true);
    // Simulate backend response
    setTimeout(() => {
      const isValid = Math.random() > 0.1; // Random validity for demo
      setAuthResult(isValid ? { valid: true } : { valid: false, reason: 'Duplicate image' });
      setLoading(false);
    }, 2000);
  };

  return (
    <section className="upload-section">
      <div className="upload-controls">
        <input type="file" accept="image/*" onChange={handleFileChange} />
        <button onClick={checkAuthenticity}>Check Authenticity</button>
      </div>
      {preview && (
        <img
          src={preview}
          alt="Preview"
          className="image-preview"
          style={{ animation: 'fadeIn 1s ease-in-out' }}
        />
      )}
    </section>
  );
}

export default UploadSection;
