import { useState } from 'react';
import { Link } from 'react-router-dom';

const ProjectCard = ({ project, onEdit, onDelete }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  
  const taskCount = project.tasks?.length || 0;
  const completedTaskCount = project.tasks?.filter(task => task.status === 'completed').length || 0;
  const progress = taskCount > 0 ? Math.round((completedTaskCount / taskCount) * 100) : 0;
  
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <div 
        className="h-2" 
        style={{ backgroundColor: project.color || '#22c55e' }}
      ></div>
      
      <div className="p-4">
        <div className="flex justify-between items-start">
          <Link to={`/projects/${project.id}`} className="block">
            <h3 className="text-lg font-medium text-gray-900 hover:text-primary-600">
              {project.name}
            </h3>
          </Link>
          
          <div className="relative">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-gray-400 hover:text-gray-600 focus:outline-none"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path d="M10 6a2 2 0 110-4 2 2 0 010 4zM10 12a2 2 0 110-4 2 2 0 010 4zM10 18a2 2 0 110-4 2 2 0 010 4z" />
              </svg>
            </button>
            
            {isMenuOpen && (
              <div className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none z-10">
                <div className="py-1" role="menu" aria-orientation="vertical">
                  <button
                    onClick={() => {
                      onEdit(project);
                      setIsMenuOpen(false);
                    }}
                    className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    role="menuitem"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => {
                      onDelete(project.id);
                      setIsMenuOpen(false);
                    }}
                    className="block w-full text-left px-4 py-2 text-sm text-red-700 hover:bg-gray-100"
                    role="menuitem"
                  >
                    Delete
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
        
        {project.description && (
          <p className="mt-1 text-sm text-gray-600">
            {project.description}
          </p>
        )}
        
        <div className="mt-4">
          <div className="flex justify-between text-sm text-gray-500 mb-1">
            <span>Progress</span>
            <span>{progress}%</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2.5">
            <div 
              className="h-2.5 rounded-full transition-all duration-500 ease-out" 
              style={{ 
                width: `${progress}%`,
                backgroundColor: project.color || '#22c55e'
              }}
            ></div>
          </div>
        </div>
        
        <div className="mt-4 flex justify-between text-sm">
          <span className="text-gray-500">
            {taskCount} {taskCount === 1 ? 'task' : 'tasks'}
          </span>
          <span className="text-gray-500">
            {completedTaskCount} completed
          </span>
        </div>
      </div>
    </div>
  );
};

export default ProjectCard;