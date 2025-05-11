import { useState, useEffect } from 'react';

const ProgressJourney = ({ 
  percentage = 0, 
  milestones = [], 
  width = 600, 
  height = 150,
  animate = true
}) => {
  const [animatedPercentage, setAnimatedPercentage] = useState(0);
  
  // Animate the progress when component mounts or percentage changes
  useEffect(() => {
    if (!animate) {
      setAnimatedPercentage(percentage);
      return;
    }
    
    let start = 0;
    const end = percentage;
    const duration = 1000; // Animation duration in ms
    const increment = 1;
    const stepTime = Math.abs(Math.floor(duration / (end - start)));
    
    const timer = setInterval(() => {
      start += increment;
      setAnimatedPercentage(start);
      if (start >= end) {
        clearInterval(timer);
        setAnimatedPercentage(end);
      }
    }, stepTime);
    
    return () => {
      clearInterval(timer);
    };
  }, [percentage, animate]);
  
  // Calculate path dimensions
  const pathWidth = width - 40; // Padding on both sides
  const pathHeight = height / 3;
  const pathY = height / 2;
  
  // Generate the path
  const generatePath = () => {
    const segments = milestones.length - 1;
    const segmentWidth = pathWidth / segments;
    
    let path = `M 20 ${pathY}`;
    
    // Create a wavy path with control points
    for (let i = 0; i < segments; i++) {
      const startX = 20 + i * segmentWidth;
      const endX = startX + segmentWidth;
      const controlY = i % 2 === 0 ? pathY - 20 : pathY + 20;
      
      path += ` C ${startX + segmentWidth / 3} ${controlY}, ${endX - segmentWidth / 3} ${controlY}, ${endX} ${pathY}`;
    }
    
    return path;
  };
  
  // Calculate the position of the marker based on percentage
  const getMarkerPosition = () => {
    const progress = animatedPercentage / 100;
    const pathLength = pathWidth;
    const x = 20 + (pathLength * progress);
    
    return { x, y: pathY };
  };
  
  // Calculate milestone positions
  const getMilestonePosition = (position) => {
    const progress = position / 100;
    const pathLength = pathWidth;
    const x = 20 + (pathLength * progress);
    
    return { x, y: pathY };
  };
  
  const markerPosition = getMarkerPosition();
  const path = generatePath();
  
  return (
    <div className="progress-journey">
      <svg width={width} height={height} viewBox={`0 0 ${width} ${height}`}>
        {/* Background path */}
        <path
          d={path}
          fill="none"
          stroke="#e5e7eb"
          strokeWidth="6"
          strokeLinecap="round"
        />
        
        {/* Progress path */}
        <path
          d={path}
          fill="none"
          stroke="#22c55e"
          strokeWidth="6"
          strokeLinecap="round"
          strokeDasharray={pathWidth}
          strokeDashoffset={pathWidth - (pathWidth * animatedPercentage / 100)}
          style={{ transition: 'stroke-dashoffset 0.5s ease' }}
        />
        
        {/* Milestones */}
        {milestones.map((milestone, index) => {
          const pos = getMilestonePosition(milestone.position);
          const isActive = milestone.position <= animatedPercentage;
          
          return (
            <g key={index}>
              <circle
                cx={pos.x}
                cy={pos.y}
                r="8"
                fill={isActive ? '#22c55e' : '#e5e7eb'}
                stroke="#ffffff"
                strokeWidth="2"
              />
              <text
                x={pos.x}
                y={pos.y + 25}
                textAnchor="middle"
                fontSize="12"
                fill="#6b7280"
              >
                {milestone.label}
              </text>
            </g>
          );
        })}
        
        {/* Current position marker */}
        <circle
          cx={markerPosition.x}
          cy={markerPosition.y}
          r="10"
          fill="#22c55e"
          stroke="#ffffff"
          strokeWidth="2"
          className="animate-pulse"
        />
      </svg>
      
      {/* Percentage display */}
      <div className="text-center mt-2">
        <span className="text-lg font-medium text-gray-700">{Math.round(animatedPercentage)}% Complete</span>
      </div>
    </div>
  );
};

export default ProgressJourney;