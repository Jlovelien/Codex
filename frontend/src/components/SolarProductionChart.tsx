import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
);

const hours = Array.from({ length: 12 }, (_, i) => 6 + i); // 6am to 17pm
const data = {
  labels: hours.map((h) => `${h}:00`),
  datasets: [
    {
      label: 'kWh',
      data: [
        0, 0, 1, 3, 5, 7, 6, 5, 4, 2, 1, 0,
      ],
      borderColor: '#ffa726',
      backgroundColor: 'rgba(255,167,38,0.5)',
    },
  ],
};

export default function SolarProductionChart() {
  return (
    <div className="solar-chart" data-testid="solar-chart">
      <h2>Solar Production for Today</h2>
      <Line data={data} />
    </div>
  );
}
