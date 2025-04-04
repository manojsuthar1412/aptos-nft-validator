import React from 'react';
import './History.css'; // Import the CSS file

const userHistory = [
  {
    id: 1,
    name: 'gurukul',
    description: 'school teaching',
    creator_address: '0x423e7753ca68849d0f3fd592bd82b76e9e046b54a59fe982b639ff03fd2009d2',
    txn_hash: '0x1814fca8fa2519b1dcbe17e83991de538e19e0ba0e1f973c0787fce975b3a942',
    image_url: 'https://i.ibb.co/dsK7D90q/f885a6d4f7ec.jpg',
    label: 'hand-drawn illustration',
    score: 0.7383,
    created_at: '2025-04-04T13:49:13.505838+00:00',
  },
];

const allHistory = [
  {
    id: 1,
    name: 'gurukul',
    description: 'school teaching',
    creator_address: '0x423e7753ca68849d0f3fd592bd82b76e9e046b54a59fe982b639ff03fd2009d2',
    txn_hash: '0x1814fca8fa2519b1dcbe17e83991de538e19e0ba0e1f973c0787fce975b3a942',
    image_url: 'https://i.ibb.co/dsK7D90q/f885a6d4f7ec.jpg',
    label: 'hand-drawn illustration',
    score: 0.7383,
    created_at: '2025-04-04T13:49:13.505838+00:00',
  },
  {
    id: 2,
    name: 'artwork',
    description: 'digital painting',
    creator_address: '0x789e7753ca68849d0f3fd592bd82b76e9e046b54a59fe982b639ff03fd2009d3',
    txn_hash: '0x2814fca8fa2519b1dcbe17e83991de538e19e0ba0e1f973c0787fce975b3a943',
    image_url: 'https://i.ibb.co/dsK7D90q/f885a6d4f7ec.jpg',
    label: 'digital art',
    score: 0.8123,
    created_at: '2025-04-05T10:30:00.000000+00:00',
  },
];

function History() {
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
