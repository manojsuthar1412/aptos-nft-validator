import React, { useState } from 'react';
import { Pie } from 'react-chartjs-2';
import 'chart.js/auto';

const leaderboardData = [
  { rank: 1, address: '0x123...abc', minted: 50 },
  { rank: 2, address: '0x456...def', minted: 30 },
  { rank: 3, address: '0x789...ghi', minted: 20 },
];

function Leaderboard() {
  const [activeTab, setActiveTab] = useState('Table');

  const chartData = {
    labels: leaderboardData.map((entry) => entry.address),
    datasets: [
      {
        label: 'Minted Tokens',
        data: leaderboardData.map((entry) => entry.minted),
        backgroundColor: ['#4caf50', '#2196f3', '#ff9800'], // Green, blue, and orange
        borderColor: ['#388e3c', '#1976d2', '#f57c00'], // Slightly darker shades for borders
        borderWidth: 2, // Added border for better visibility
      },
    ],
  };

  return (
    <div className="leaderboard">
      <div className="tab-menu">
        <button
          className={activeTab === 'Table' ? 'active' : ''}
          onClick={() => setActiveTab('Table')}
        >
          Table
        </button>
        <button
          className={activeTab === 'Chart' ? 'active' : ''}
          onClick={() => setActiveTab('Chart')}
        >
          Chart
        </button>
      </div>
      {activeTab === 'Table' ? (
        <table className="leaderboard-table">
          <thead>
            <tr>
              <th>Rank</th>
              <th>Address</th>
              <th>Minted Tokens</th>
            </tr>
          </thead>
          <tbody>
            {leaderboardData.map((entry) => (
              <tr key={entry.rank}>
                <td>{entry.rank}</td>
                <td>{entry.address}</td>
                <td>{entry.minted}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <div className="chart-container">
          <Pie data={chartData} />
        </div>
      )}
    </div>
  );
}

export default Leaderboard;
