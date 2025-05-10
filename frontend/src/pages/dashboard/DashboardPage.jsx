import { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Layout from '../../components/layout/Layout';
import TaskCard from '../../components/tasks/TaskCard';
import ProjectCard from '../../components/projects/ProjectCard';
import ProgressJourney from '../../components/progress/ProgressJourney';
import AuthContext from '../../context/AuthContext';
import TaskContext from '../../context/TaskContext';
import { isOverdue } from '../../utils/formatDate';

const DashboardPage = () => {
  const { user } = useContext(AuthContext);
  const { tasks, projects, loading, fetchTasks, updateTask, deleteTask } = useContext(TaskContext);
  const [stats, setStats] = useState({
    totalTasks: 0,
    completedTasks: 0,
    pendingTasks: 0,
    overdueTasks: 0
  });
  
  useEffect(() => {
    fetchTasks();
  }, [fetchTasks]);
  
  useEffect(() => {
    if (tasks.length > 0) {
      const totalTasks = tasks.length;
      const completedTasks = tasks.filter(task => task.status === 'completed').length;
      const pendingTasks = tasks.filter(task => task.status === 'pending' || task.status === 'in_progress').length;
      const overdueTasks = tasks.filter(task => 
        (task.status === 'pending' || task.status === 'in_progress') && 
        task.dueDate && 
        isOverdue(task.dueDate)
      ).length;
      
      setStats({
        totalTasks,
        completedTasks,
        pendingTasks,
        overdueTasks
      });
    }
  }, [tasks]);
  
  // Calculate progress percentage
  const progressPercentage = stats.totalTasks > 0 
    ? Math.round((stats.completedTasks / stats.totalTasks) * 100) 
    : 0;
  
  // Get recent tasks (last 5)
  const recentTasks = [...tasks]
    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
    .slice(0, 5);
  
  // Get upcoming tasks (next 5 due)
  const upcomingTasks = [...tasks]
    .filter(task => 
      (task.status === 'pending' || task.status === 'in_progress') && 
      task.dueDate
    )
    .sort((a, b) => new Date(a.dueDate) - new Date(b.dueDate))
    .slice(0, 5);
  
  // Get recent projects (last 3)
  const recentProjects = [...projects]
    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
    .slice(0, 3);
  
  const handleStatusChange = async (taskId, updates) => {
    await updateTask(taskId, updates);
  };
  
  return (
    <Layout>
      <div className="max-w-7xl mx-auto">
        {/* Welcome Section */}
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-900">
            Welcome back, {user?.name || 'User'}!
          </h1>
          <p className="text-gray-600">
            Here's an overview of your tasks and projects.
          </p>
        </div>
        
        {/* Progress Visualization */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Your Progress</h2>
          <div className="flex justify-center">
            <ProgressJourney 
              percentage={progressPercentage} 
              milestones={[
                { position: 0, label: 'Start' },
                { position: 25, label: 'Getting Started' },
                { position: 50, label: 'Halfway' },
                { position: 75, label: 'Almost There' },
                { position: 100, label: 'Complete' }
              ]}
              width={600}
              height={150}
            />
          </div>
          <div className="mt-4 text-center text-gray-600">
            {stats.completedTasks} of {stats.totalTasks} tasks completed
          </div>
        </div>
        
        {/* Stats Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <div className="bg-white rounded-lg shadow-md p-6 border-l-4 border-primary-500">
            <div className="flex items-center">
              <div className="p-3 rounded-full bg-primary-100 text-primary-600">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                </svg>
              </div>
              <div className="ml-4">
                <h2 className="text-sm font-medium text-gray-500">Total Tasks</h2>
                <p className="text-2xl font-semibold text-gray-900">{stats.totalTasks}</p>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow-md p-6 border-l-4 border-green-500">
            <div className="flex items-center">
              <div className="p-3 rounded-full bg-green-100 text-green-600">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <div className="ml-4">
                <h2 className="text-sm font-medium text-gray-500">Completed</h2>
                <p className="text-2xl font-semibold text-gray-900">{stats.completedTasks}</p>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow-md p-6 border-l-4 border-blue-500">
            <div className="flex items-center">
              <div className="p-3 rounded-full bg-blue-100 text-blue-600">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div className="ml-4">
                <h2 className="text-sm font-medium text-gray-500">Pending</h2>
                <p className="text-2xl font-semibold text-gray-900">{stats.pendingTasks}</p>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow-md p-6 border-l-4 border-red-500">
            <div className="flex items-center">
              <div className="p-3 rounded-full bg-red-100 text-red-600">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div className="ml-4">
                <h2 className="text-sm font-medium text-gray-500">Overdue</h2>
                <p className="text-2xl font-semibold text-gray-900">{stats.overdueTasks}</p>
              </div>
            </div>
          </div>
        </div>
        
        {/* Tasks and Projects Section */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Recent Tasks */}
          <div className="lg:col-span-2">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold text-gray-900">Recent Tasks</h2>
              <Link to="/tasks" className="text-primary-500 hover:text-primary-600 text-sm font-medium">
                View all
              </Link>
            </div>
            
            {loading ? (
              <div className="text-center py-4">Loading tasks...</div>
            ) : recentTasks.length > 0 ? (
              <div className="space-y-4">
                {recentTasks.map(task => (
                  <TaskCard
                    key={task.id}
                    task={task}
                    onStatusChange={handleStatusChange}
                    onDelete={deleteTask}
                  />
                ))}
              </div>
            ) : (
              <div className="bg-white rounded-lg shadow-md p-6 text-center">
                <p className="text-gray-500">No tasks yet. Create your first task!</p>
                <Link
                  to="/tasks/new"
                  className="mt-4 inline-block btn btn-primary"
                >
                  Create Task
                </Link>
              </div>
            )}
            
            {/* Upcoming Tasks */}
            <div className="mt-8">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-bold text-gray-900">Upcoming Tasks</h2>
              </div>
              
              {loading ? (
                <div className="text-center py-4">Loading tasks...</div>
              ) : upcomingTasks.length > 0 ? (
                <div className="space-y-4">
                  {upcomingTasks.map(task => (
                    <TaskCard
                      key={task.id}
                      task={task}
                      onStatusChange={handleStatusChange}
                      onDelete={deleteTask}
                    />
                  ))}
                </div>
              ) : (
                <div className="bg-white rounded-lg shadow-md p-6 text-center">
                  <p className="text-gray-500">No upcoming tasks.</p>
                </div>
              )}
            </div>
          </div>
          
          {/* Projects */}
          <div>
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold text-gray-900">Projects</h2>
              <Link to="/projects" className="text-primary-500 hover:text-primary-600 text-sm font-medium">
                View all
              </Link>
            </div>
            
            {loading ? (
              <div className="text-center py-4">Loading projects...</div>
            ) : recentProjects.length > 0 ? (
              <div className="space-y-4">
                {recentProjects.map(project => (
                  <ProjectCard
                    key={project.id}
                    project={project}
                  />
                ))}
              </div>
            ) : (
              <div className="bg-white rounded-lg shadow-md p-6 text-center">
                <p className="text-gray-500">No projects yet. Create your first project!</p>
                <Link
                  to="/projects/new"
                  className="mt-4 inline-block btn btn-primary"
                >
                  Create Project
                </Link>
              </div>
            )}
            
            {/* Quick Actions */}
            <div className="mt-8 bg-white rounded-lg shadow-md p-6">
              <h3 className="text-lg font-medium text-gray-900 mb-4">Quick Actions</h3>
              <div className="space-y-3">
                <Link
                  to="/tasks/new"
                  className="block w-full text-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary-500 hover:bg-primary-600"
                >
                  Create New Task
                </Link>
                <Link
                  to="/projects/new"
                  className="block w-full text-center py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
                >
                  Create New Project
                </Link>
                <Link
                  to="/calendar"
                  className="block w-full text-center py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
                >
                  View Calendar
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default DashboardPage;