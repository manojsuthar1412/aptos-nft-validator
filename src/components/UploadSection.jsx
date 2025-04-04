import React, { useState } from 'react';

function UploadSection({ setUploadedImage }) {
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

  return (
    <section className="upload-section">
      <input type="file" accept="image/*" onChange={handleFileChange} />
      {preview && <img src={preview} alt="Preview" className="image-preview" />}
    </section>
  );
}

export default UploadSection;
