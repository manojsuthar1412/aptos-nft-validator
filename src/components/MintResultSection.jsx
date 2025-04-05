import React from 'react';

function MintResultSection({ mintResult }) {
  return (
    <section className="mint-result-section">
      {mintResult?.status == 'success' ? (
        <>
          <p>Minting Successful!</p>
          <p>Transaction Hash: {mintResult.txn_hash}</p>
          <a
            href={`https://explorer.aptoslabs.com/txn/${mintResult.txn_hash}?network=devnet`}
            
            target="_blank"
            rel="noopener noreferrer"
          >
            View on Aptos Explorer
          </a>
        </>
      ) : (
        <p>Minting Failed</p>
      )}
    </section>
  );
}

export default MintResultSection;
