import { useState } from 'react';
import { formatRelativeDate, isOverdue } from '../../utils/formatDate';

const TaskCard = ({ task, onEdit, onDelete, onStatusChange }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  
  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'low':
        return 'bg-green-100 text-green-800';
      case 'medium':
        return 'bg-primary-100 text-primary-800';
      case 'high':
        return 'bg-orange-100 text-orange-800';
      case 'urgent':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };
  
  const getStatusColor = (status) => {
    switch (status) {
      case 'pending':
        return 'bg-gray-100 text-gray-800';
      case 'in_progress':
        return 'bg-primary-100 text-primary-800';
      case 'completed':
        return 'bg-green-100 text-green-800';
      case 'archived':
        return 'bg-gray-100 text-gray-500';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };
  
  const handleStatusChange = (newStatus) => {
    onStatusChange(task.id, { status: newStatus });
    setIsMenuOpen(false);
  };
  
  return (
    <div className={`bg-white rounded-lg shadow-md p-4 border-l-4 ${
      task.status === 'completed' 
        ? 'border-green-500' 
        : isOverdue(task.dueDate) && task.status !== 'completed'
          ? 'border-red-500'
          : 'border-primary-500'
    }`}>
      <div className="flex justify-between items-start">
        <div className="flex items-center">
          <input
            type="checkbox"
            checked={task.status === 'completed'}
            onChange={() => 
              handleStatusChange(task.status === 'completed' ? 'pending' : 'completed')
            }
            className="h-5 w-5 text-primary-500 focus:ring-primary-500 border-gray-300 rounded"
          />
          <h3 className={`ml-3 text-lg font-medium ${
            task.status === 'completed' ? 'line-through text-gray-500' : 'text-gray-900'
          }`}>
            {task.title}
          </h3>
        </div>
        
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
                    onEdit(task);
                    setIsMenuOpen(false);
                  }}
                  className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  role="menuitem"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleStatusChange('pending')}
                  className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  role="menuitem"
                >
                  Mark as Pending
                </button>
                <button
                  onClick={() => handleStatusChange('in_progress')}
                  className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  role="menuitem"
                >
                  Mark as In Progress
                </button>
                <button
                  onClick={() => handleStatusChange('completed')}
                  className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  role="menuitem"
                >
                  Mark as Completed
                </button>
                <button
                  onClick={() => {
                    onDelete(task.id);
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
      
      {task.description && (
        <p className="mt-2 text-gray-600 text-sm">
          {task.description}
        </p>
      )}
      
      <div className="mt-4 flex flex-wrap gap-2">
        {task.project && (
          <span 
            className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800"
            style={{ backgroundColor: `${task.project.color}20`, color: task.project.color }}
          >
            {task.project.name}
          </span>
        )}
        
        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getPriorityColor(task.priority)}`}>
          {task.priority.charAt(0).toUpperCase() + task.priority.slice(1)}
        </span>
        
        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(task.status)}`}>
          {task.status === 'in_progress' ? 'In Progress' : task.status.charAt(0).toUpperCase() + task.status.slice(1)}
        </span>
      </div>
      
      {task.dueDate && (
        <div className={`mt-2 text-sm ${
          isOverdue(task.dueDate) && task.status !== 'completed' 
            ? 'text-red-600' 
            : 'text-gray-500'
        }`}>
          <span className="font-medium">Due: </span>
          {formatRelativeDate(task.dueDate)}
        </div>
      )}
    </div>
  );
};

export default TaskCard;