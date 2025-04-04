import React from 'react';
import { Pie } from 'react-chartjs-2';
import 'chart.js/auto';

const statsData = {
  total_uploads: 13,
  total_valid_mints: 2,
  total_rejected: 10,
  average_score: 1.3871,
};

function Stats() {
  const chartData = {
    labels: ['Valid Mints', 'Rejected'],
    datasets: [
      {
        data: [statsData.total_valid_mints, statsData.total_rejected],
        backgroundColor: ['#81c784', '#e57373'], // Lighter green and red
        borderColor: ['#66bb6a', '#ef5350'], // Slightly darker shades for borders
        borderWidth: 2,
      },
    ],
  };

  return (
    <div className="stats">
      <h2 style={{ textAlign: 'center', marginBottom: '20px', color: '#f8fafc' }}>Project Stats</h2>
      <div className="stats-cards" style={{ display: 'flex', justifyContent: 'space-around', marginBottom: '40px' }}>
        <div className="card" style={{ background: '#1e293b', padding: '20px', borderRadius: '8px', textAlign: 'center', color: '#f8fafc' }}>
          <h3>Total Uploads</h3>
          <p style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>{statsData.total_uploads}</p>
        </div>
        <div className="card" style={{ background: '#1e293b', padding: '20px', borderRadius: '8px', textAlign: 'center', color: '#f8fafc' }}>
          <h3>Average Score</h3>
          <p style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>{statsData.average_score.toFixed(4)}</p>
        </div>
      </div>
      <div className="chart-container" style={{ maxWidth: '600px', margin: '0 auto' }}>
        <Pie data={chartData} />
      </div>
    </div>
  );
}

export default Stats;
