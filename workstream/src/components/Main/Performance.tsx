import React from 'react';
import PerformanceChart from './PerformanceChart';

interface PerformanceProps {
  month: number;
}

const Performance: React.FC<PerformanceProps> = ({ month }) => {
  return (
    <div className="orderPerformance-wrapper _card">
      <div className="inner-box">
        <div className="inner-box__title">
          <i className="fa-solid fa-star"></i>
          {month}월의 수주실적
        </div>
        <div className="chart-box">
          <PerformanceChart />
        </div>
      </div>
    </div>
  );
};

export default Performance;
