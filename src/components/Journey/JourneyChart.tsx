import React, { useEffect, useRef } from 'react';
import { Chart, registerables } from 'chart.js';
import { JourneyStage } from '../../types';

Chart.register(...registerables);

interface JourneyChartProps {
  stages: JourneyStage[];
  currentStage: number;
}

const JourneyChart: React.FC<JourneyChartProps> = ({ stages, currentStage }) => {
  const chartRef = useRef<HTMLCanvasElement>(null);
  const chartInstance = useRef<Chart | null>(null);

  useEffect(() => {
    if (chartRef.current) {
      // Destroy previous chart instance
      if (chartInstance.current) {
        chartInstance.current.destroy();
      }

      const ctx = chartRef.current.getContext('2d');
      
      if (ctx) {
        // Format dates for display
        const labels = stages.map((stage) => stage.name);
        const dates = stages.map((stage) => new Date(stage.timestamp));
        
        // Calculate time differences in days
        const timeData = dates.map((date) => date.getTime());
        
        // Color configuration
        const backgroundColors = stages.map((_, index) => 
          index <= currentStage ? 'rgba(45, 106, 79, 0.6)' : 'rgba(156, 163, 175, 0.4)'
        );
        
        const borderColors = stages.map((_, index) => 
          index <= currentStage ? 'rgb(45, 106, 79)' : 'rgb(156, 163, 175)'
        );

        chartInstance.current = new Chart(ctx, {
          type: 'line',
          data: {
            labels,
            datasets: [
              {
                label: 'Product Journey Timeline',
                data: timeData,
                backgroundColor: backgroundColors,
                borderColor: borderColors,
                borderWidth: 2,
                pointBackgroundColor: backgroundColors,
                pointBorderColor: borderColors,
                pointRadius: 6,
                pointHoverRadius: 8,
                tension: 0.2,
              },
            ],
          },
          options: {
            responsive: true,
            scales: {
              y: {
                type: 'time',
                time: {
                  unit: 'day',
                  displayFormats: {
                    day: 'MMM d, yyyy',
                  },
                },
                title: {
                  display: true,
                  text: 'Date',
                },
              },
              x: {
                title: {
                  display: true,
                  text: 'Journey Stages',
                },
              },
            },
            plugins: {
              tooltip: {
                callbacks: {
                  label: function(context) {
                    const date = new Date(context.parsed.y);
                    return date.toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'short',
                      day: 'numeric',
                      hour: '2-digit',
                      minute: '2-digit',
                    });
                  },
                },
              },
            },
          },
        });
      }
    }
    
    // Cleanup function
    return () => {
      if (chartInstance.current) {
        chartInstance.current.destroy();
      }
    };
  }, [stages, currentStage]);

  return (
    <div className="bg-white p-4 rounded-lg shadow">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">Journey Timeline</h3>
      <canvas ref={chartRef} />
    </div>
  );
};

export default JourneyChart;