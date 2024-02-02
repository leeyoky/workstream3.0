import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

export const options = {
  responsive: true,
  plugins: {
    legend: {
      position: 'top' as const,
      align: 'end' as const,
    },
  },
  scales: {
    x: {
      grid: {
        display: false,
      },
      ticks: {
        font: {
          weight: 900,
        },
      },
    },
    y: {
      // position: 'right' as const,
      ticks: {
        callback: (tickValue: string | number) => {
          const value =
            typeof tickValue === 'number'
              ? tickValue
              : parseFloat(tickValue.replace('₩', '').replace(',', ''));
          return `₩${value.toLocaleString()}`;
        },
      },
      type: 'linear' as const,
      beginAtZero: true,
      grid: {
        display: true,
      },
    },
  },
  indexAxis: 'x' as const,
  elements: {
    bar: {
      borderWidth: 2,
      borderRadius: 5,
    },
  },
  barThickness: 50, // 가로폭을 원하는 값으로 설정
};

const realData = [50000000, 60000000, 35000000, 120000000];
const addResult = [];
let cumulativeValue = 0;
for (const value of realData) {
  cumulativeValue += value;
  addResult.push(cumulativeValue);
}

const labels = ['동양생명', '생명보험협회', '현대글로비스', '한국지역정보개발원'];

export const data = {
  labels,
  datasets: [
    {
      borderWidth: 2,
      borderRadius: 5,
      label: '수주금액',
      backgroundColor: '#ffD09978',
      borderColor: '#ff9209',
      data: realData,
    },
    {
      borderWidth: 2,
      borderRadius: 5,
      label: '누적실적',
      backgroundColor: '#FF572278',
      borderColor: '#FF5722',
      data: addResult,
    },
  ],
};

const PerformanceChart = () => {
  return <Bar options={options} data={data} width={350} />;
};

export default PerformanceChart;
