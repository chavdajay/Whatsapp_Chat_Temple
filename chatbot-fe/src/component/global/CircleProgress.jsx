import React from 'react';

const CircleProgress = ({ 
  percentage = 0, 
  strokeWidth = 4, 
  secondaryColor = "#f0f0f0", 
  primaryColor = ["#F64E60", "#F64E60"], 
  width = "70" 
}) => {
  const radius = (parseInt(width) - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const strokeDasharray = circumference;
  const strokeDashoffset = circumference - (percentage / 100) * circumference;

  return (
    <div style={{ width: width, height: width }}>
      <svg
        width={width}
        height={width}
        viewBox={`0 0 ${width} ${width}`}
        style={{ transform: 'rotate(-90deg)' }}
      >
        {/* Background circle */}
        <circle
          cx={parseInt(width) / 2}
          cy={parseInt(width) / 2}
          r={radius}
          fill="none"
          stroke={secondaryColor}
          strokeWidth={strokeWidth}
        />
        
        {/* Progress circle */}
        <circle
          cx={parseInt(width) / 2}
          cy={parseInt(width) / 2}
          r={radius}
          fill="none"
          stroke={primaryColor[0]}
          strokeWidth={strokeWidth}
          strokeDasharray={strokeDasharray}
          strokeDashoffset={strokeDashoffset}
          strokeLinecap="round"
          style={{
            transition: 'stroke-dashoffset 0.5s ease-in-out'
          }}
        />
      </svg>
    </div>
  );
};

export default CircleProgress; 