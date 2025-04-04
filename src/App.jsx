import React, { useState } from 'react';
import Header from './components/Header';
import UploadSection from './components/UploadSection';
import ResultSection from './components/ResultSection';
import MintResultSection from './components/MintResultSection';

function App() {
  const [uploadedImage, setUploadedImage] = useState(null);
  const [authResult, setAuthResult] = useState(null);
  const [mintResult, setMintResult] = useState(null);
  const [loading, setLoading] = useState(false);

  return (
    <div className="app">
      <Header />
      <div className="content">    
        <UploadSection 
          setUploadedImage={setUploadedImage} 
          setLoading={setLoading}
          setAuthResult={setAuthResult}
        />  
        {uploadedImage && (
          <>
            <div className="result-container"> 
              {(loading || authResult) && (
                <ResultSection
                  loading={loading}
                  setLoading={setLoading}
                  uploadedImage={uploadedImage}
                  setAuthResult={setAuthResult}
                  authResult={authResult}
                  setMintResult={setMintResult}
                />
              )}
              {mintResult && <MintResultSection mintResult={mintResult} />}
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default App;
