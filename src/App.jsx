import React, { useState } from 'react';
import Header from './components/Header';
import UploadSection from './components/UploadSection';
import ResultSection from './components/ResultSection';
import MintResultSection from './components/MintResultSection';

function App() {
  const [uploadedImage, setUploadedImage] = useState(null);
  const [authResult, setAuthResult] = useState(null);
  const [mintResult, setMintResult] = useState(null);

  return (
    <div className="app">
      <Header />
      <UploadSection setUploadedImage={setUploadedImage} />
      {uploadedImage && (
        <ResultSection
          uploadedImage={uploadedImage}
          setAuthResult={setAuthResult}
          authResult={authResult}
          setMintResult={setMintResult}
        />
      )}
      {mintResult && <MintResultSection mintResult={mintResult} />}
    </div>
  );
}

export default App;
