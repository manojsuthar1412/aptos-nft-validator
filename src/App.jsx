import React, { useState } from 'react';
import Header from './components/Header';
import UploadSection from './components/UploadSection';


function App() {
  const [uploadedImage, setUploadedImage] = useState(null);

  return (
    <div className="app">
      <Header />
      <UploadSection setUploadedImage={setUploadedImage} />     
    </div>
  );
}

export default App;
