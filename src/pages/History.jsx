import React, { useEffect, useState } from 'react';
import './History.css'; // Import the CSS file

const API_BASE_URL = import.meta.env.VITE_BACKEND_API;
const CURRENT_USER_ADDRESS = '0x423e7753ca68849d0f3fd592bd82b76e9e046b54a59fe982b639ff03fd2009d2'; // Replace with dynamic user address

function History() {
  const [userHistory, setUserHistory] = useState([]);
  const [allHistory, setAllHistory] = useState([]);

  useEffect(() => {
    fetch(`${API_BASE_URL}/mint-history`)
      .then((response) => response.json())
      .then((data) => {
        setAllHistory(data);
        setUserHistory(data.filter((entry) => entry.creator_address === CURRENT_USER_ADDRESS));
      })
      .catch((error) => console.error('Error fetching history:', error));
  }, []);

  return (
    <div className="history" style={{ padding: '20px', maxWidth: '1200px', margin: '0 auto' }}>
      <h2 style={{ textAlign: 'center', marginBottom: '20px', color: '#f8fafc' }}>Your Minting History</h2>
      <table className="leaderboard-table" style={{ marginBottom: '40px', width: '100%' }}>
        <thead>
          <tr>
            <th>Name</th>
            <th>Description</th>
            <th>Creator Address</th>
            <th>Transaction Hash</th>
            <th>Image</th>
            <th>Label</th>
            <th>Score</th>
            <th>Created At</th>
          </tr>
        </thead>
        <tbody>
          {userHistory.map((entry) => (
            <tr key={entry.id}>
              <td>{entry.name}</td>
              <td>{entry.description}</td>
              <td style={{ wordBreak: 'break-word' }}>{entry.creator_address}</td>
              <td style={{ wordBreak: 'break-word' }}>
                <a
                  href={`https://explorer.aptos.dev/txn/${entry.txn_hash}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {entry.txn_hash}
                </a>
              </td>
              <td>
                <img src={entry.image_url} alt={entry.label} style={{ width: '50px', height: '50px', borderRadius: '4px' }} />
              </td>
              <td>{entry.label}</td>
              <td>{entry.score}</td>
              <td>{new Date(entry.created_at).toLocaleString()}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <h2 style={{ textAlign: 'center', marginBottom: '20px', color: '#f8fafc' }}>All History</h2>
      <table className="leaderboard-table" style={{ width: '100%' }}>
        <thead>
          <tr>
            <th>Name</th>
            <th>Description</th>
            <th>Creator Address</th>
            <th>Transaction Hash</th>
            <th>Image</th>
            <th>Label</th>
            <th>Score</th>
            <th>Created At</th>
          </tr>
        </thead>
        <tbody>
          {allHistory.map((entry) => (
            <tr key={entry.id}>
              <td>{entry.name}</td>
              <td>{entry.description}</td>
              <td style={{ wordBreak: 'break-word' }}>{entry.creator_address}</td>
              <td style={{ wordBreak: 'break-word' }}>
                <a
                  href={`https://explorer.aptos.dev/txn/${entry.txn_hash}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {entry.txn_hash}
                </a>
              </td>
              <td>
                <img src={entry.image_url} alt={entry.label} style={{ width: '50px', height: '50px', borderRadius: '4px' }} />
              </td>
              <td>{entry.label}</td>
              <td>{entry.score}</td>
              <td>{new Date(entry.created_at).toLocaleString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default History;
