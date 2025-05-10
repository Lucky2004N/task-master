import React from 'react';

const ProgressJourney = ({ percentage = 0, milestones = [], width = 600, height = 150 }) => {
  // Default milestones if none provided
  const defaultMilestones = [
    { position: 0, label: 'Start' },
    { position: 25, label: 'Planning' },
    { position: 50, label: 'Halfway' },
    { position: 75, label: 'Almost There' },
    { position: 100, label: 'Complete' }
  ];
  
  const journeyMilestones = milestones.length > 0 ? milestones : defaultMilestones;
  
  // Calculate current position
  const currentPosition = (percentage / 100) * width;
  
  return (
    <div className="relative" style={{ width, height }}>
      {/* Main road */}
      <div className="absolute top-1/2 left-0 w-full h-4 bg-gray-300 rounded-full transform -translate-y-1/2">
        {/* Progress fill */}
        <div 
          className="h-full bg-gradient-to-r from-primary-400 to-primary-600 rounded-full transition-all duration-1000 ease-out"
          style={{ width: `${percentage}%` }}
        />
      </div>
      
      {/* Milestones */}
      {journeyMilestones.map((milestone, index) => {
        const milestonePosition = (milestone.position / 100) * width;
        const isPassed = percentage >= milestone.position;
        
        return (
          <div 
            key={index}
            className="absolute top-1/2 transform -translate-y-1/2"
            style={{ left: milestonePosition }}
          >
            {/* Milestone marker */}
            <div 
              className={`w-8 h-8 rounded-full flex items-center justify-center border-2 transition-colors duration-500 ${
                isPassed ? 'bg-primary-500 border-primary-600' : 'bg-white border-gray-400'
              }`}
              style={{ marginLeft: -16 }}
            >
              <span className={`text-xs font-bold ${isPassed ? 'text-white' : 'text-gray-600'}`}>
                {milestone.position}%
              </span>
            </div>
            
            {/* Milestone label */}
            <div 
              className="absolute mt-2 text-center w-24"
              style={{ marginLeft: -48 }}
            >
              <span className={`text-sm font-medium ${isPassed ? 'text-primary-700' : 'text-gray-500'}`}>
                {milestone.label}
              </span>
            </div>
          </div>
        );
      })}
      
      {/* Current position marker (vehicle/character) */}
      <div 
        className="absolute top-1/2 transform -translate-y-1/2 transition-all duration-1000"
        style={{ left: currentPosition }}
      >
        <div className="relative" style={{ marginLeft: -12, marginTop: -24 }}>
          {/* You can use an emoji, SVG or image here */}
          <div className="text-2xl">🚗</div>
        </div>
      </div>
    </div>
  );
};

export default ProgressJourney;