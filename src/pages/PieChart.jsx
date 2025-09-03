const PieChart = ({ data }) => {
  // Filter out zero values and calculate total
  const filteredData = data.filter((item) => item.value > 0);
  const total = filteredData.reduce((sum, item) => sum + item.value, 0);

  if (total === 0) {
    return <div className="flex items-center justify-center h-64 text-gray-500">No data available</div>;
  }

  let cumulativePercentage = 0;
  const createPath = (percentage, startAngle) => {
    const angle = (percentage / 100) * 360;
    const endAngle = startAngle + angle;
    const x1 = 50 + 40 * Math.cos((startAngle * Math.PI) / 180);
    const y1 = 50 + 40 * Math.sin((startAngle * Math.PI) / 180);
    const x2 = 50 + 40 * Math.cos((endAngle * Math.PI) / 180);
    const y2 = 50 + 40 * Math.sin((endAngle * Math.PI) / 180);
    const largeArc = angle > 180 ? 1 : 0;
    return `M 50 50 L ${x1} ${y1} A 40 40 0 ${largeArc} 1 ${x2} ${y2} Z`;
  };

  return (
    <div className="flex flex-col items-center">
      <div className="relative">
        <svg width="200" height="200" viewBox="0 0 100 100" className="transform -rotate-90">
          {filteredData.map((item, index) => {
            const percentage = (item.value / total) * 100;
            const startAngle = (cumulativePercentage / 100) * 360;
            const path = createPath(percentage, startAngle);
            cumulativePercentage += percentage;
            return (
              <path
                key={index}
                d={path}
                fill={item.color}
                className="hover:opacity-80 transition-opacity duration-200"
              />
            );
          })}
        </svg>
        
        {/* Center text showing count and percentage */}
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center pointer-events-none">
          <div className="text-2xl font-bold text-gray-800">{total}</div>
          <div className="text-sm text-gray-500">Total</div>
        </div>
      </div>

      {/* Legend - Show both count and percentage */}
      <div className="mt-4 grid grid-cols-1 gap-2 w-full">
        {filteredData.map((item, index) => {
          const percentage = ((item.value / total) * 100).toFixed(1);
          return (
            <div key={index} className="flex items-center justify-between text-sm">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }}></div>
                <span className="text-gray-700">{item.name}</span>
              </div>
              <div className="flex gap-1">
                <span className="font-medium text-gray-800">{item.value}</span>
                <span className="text-gray-500">({percentage}%)</span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default PieChart;