import React from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const Dashboard = () => {
  const detailPengeluaran = [
    { bulan: 'Jan', gajiSatpam: 100000, perbaikanJalan: 50000, listrikPos: 50000 },
    { bulan: 'Feb', gajiSatpam: 100000, perbaikanJalan: 70000, listrikPos: 50000 },
    { bulan: 'Mar', gajiSatpam: 100000, perbaikanJalan: 60000, listrikPos: 50000 },
    { bulan: 'Apr', gajiSatpam: 100000, perbaikanJalan: 70000, listrikPos: 60000 },
    { bulan: 'May', gajiSatpam: 100000, perbaikanJalan: 80000, listrikPos: 50000 },
    { bulan: 'Jun', gajiSatpam: 100000, perbaikanJalan: 70000, listrikPos: 50000 },
    { bulan: 'Jul', gajiSatpam: 100000, perbaikanJalan: 60000, listrikPos: 60000 },
    { bulan: 'Aug', gajiSatpam: 100000, perbaikanJalan: 70000, listrikPos: 60000 },
    { bulan: 'Sep', gajiSatpam: 100000, perbaikanJalan: 75000, listrikPos: 55000 },
    { bulan: 'Oct', gajiSatpam: 100000, perbaikanJalan: 80000, listrikPos: 60000 },
    { bulan: 'Nov', gajiSatpam: 100000, perbaikanJalan: 85000, listrikPos: 60000 },
    { bulan: 'Dec', gajiSatpam: 100000, perbaikanJalan: 90000, listrikPos: 70000 },
  ];

  const labels = detailPengeluaran.map(item => item.bulan);

  const data = {
    labels: labels,
    datasets: [
      {
        label: 'Pemasukan (Rp)',
        data: [300000, 350000, 320000, 400000, 380000, 450000, 420000, 500000, 470000, 520000, 490000, 550000],
        borderColor: 'rgba(75, 192, 192, 1)',
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        fill: true,
        tension: 0.3,
      },
      {
        label: 'Pengeluaran (Rp)',
        data: detailPengeluaran.map(
          (item) => item.gajiSatpam + item.perbaikanJalan + item.listrikPos
        ),
        borderColor: 'rgba(255, 99, 132, 1)',
        backgroundColor: 'rgba(255, 99, 132, 0.2)',
        fill: true,
        tension: 0.3,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Pemasukan & Pengeluaran Per Bulan (Menggunakan Data Dummy)',
      },
    },
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  return (
    <div style={{ padding: '20px' }}>
      <h2>Dashboard Keuangan</h2>
      <div style={{ width: '80%', margin: '0 auto' }}>
        <Line data={data} options={options} />
      </div>

      <h3 className='mt-10'>Detail Pengeluaran Per Bulan</h3>
      <table style={{ width: '80%', margin: '20px auto', borderCollapse: 'collapse' }}>
        <thead>
          <tr>
            <th style={{ border: '1px solid #ddd', padding: '8px' }}>Bulan</th>
            <th style={{ border: '1px solid #ddd', padding: '8px' }}>Gaji Satpam (Rp)</th>
            <th style={{ border: '1px solid #ddd', padding: '8px' }}>Perbaikan Jalan (Rp)</th>
            <th style={{ border: '1px solid #ddd', padding: '8px' }}>Listrik Pos (Rp)</th>
            <th style={{ border: '1px solid #ddd', padding: '8px' }}>Total Pengeluaran (Rp)</th>
          </tr>
        </thead>
        <tbody>
          {detailPengeluaran.map((row, index) => (
            <tr key={index}>
              <td style={{ border: '1px solid #ddd', padding: '8px' }}>{row.bulan}</td>
              <td style={{ border: '1px solid #ddd', padding: '8px' }}>{row.gajiSatpam.toLocaleString()}</td>
              <td style={{ border: '1px solid #ddd', padding: '8px' }}>{row.perbaikanJalan.toLocaleString()}</td>
              <td style={{ border: '1px solid #ddd', padding: '8px' }}>{row.listrikPos.toLocaleString()}</td>
              <td style={{ border: '1px solid #ddd', padding: '8px' }}>
                {(row.gajiSatpam + row.perbaikanJalan + row.listrikPos).toLocaleString()}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Dashboard;
