import { createContext, useState, useEffect, useContext } from 'react';
import axios from 'axios';
import AuthContext from './AuthContext';

const TaskContext = createContext();

export const TaskProvider = ({ children }) => {
  const { isAuthenticated } = useContext(AuthContext);
  const [tasks, setTasks] = useState([]);
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Fetch tasks when authenticated
  useEffect(() => {
    if (isAuthenticated) {
      fetchTasks();
      fetchProjects();
    } else {
      setTasks([]);
      setProjects([]);
    }
  }, [isAuthenticated]);

  // Fetch all tasks
  const fetchTasks = async (filters = {}) => {
    setLoading(true);
    setError(null);
    
    try {
      // Build query string from filters
      const queryParams = new URLSearchParams();
      Object.entries(filters).forEach(([key, value]) => {
        if (value) queryParams.append(key, value);
      });
      
      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}/tasks?${queryParams.toString()}`
      );
      
      setTasks(response.data);
    } catch (error) {
      setError(error.response?.data?.message || 'Failed to fetch tasks');
      console.error('Error fetching tasks:', error);
    } finally {
      setLoading(false);
    }
  };

  // Fetch all projects
  const fetchProjects = async () => {
    setLoading(true);
    setError(null);
    
    try {
      const response = await axios.get(`${import.meta.env.VITE_API_URL}/projects`);
      setProjects(response.data);
    } catch (error) {
      setError(error.response?.data?.message || 'Failed to fetch projects');
      console.error('Error fetching projects:', error);
    } finally {
      setLoading(false);
    }
  };

  // Create a new task
  const createTask = async (taskData) => {
    setLoading(true);
    setError(null);
    
    try {
      const response = await axios.post(`${import.meta.env.VITE_API_URL}/tasks`, taskData);
      setTasks([response.data, ...tasks]);
      return { success: true, task: response.data };
    } catch (error) {
      setError(error.response?.data?.message || 'Failed to create task');
      console.error('Error creating task:', error);
      return { success: false, message: error.response?.data?.message || 'Failed to create task' };
    } finally {
      setLoading(false);
    }
  };

  // Update a task
  const updateTask = async (id, taskData) => {
    setLoading(true);
    setError(null);
    
    try {
      const response = await axios.put(`${import.meta.env.VITE_API_URL}/tasks/${id}`, taskData);
      setTasks(tasks.map(task => task.id === id ? response.data : task));
      return { success: true, task: response.data };
    } catch (error) {
      setError(error.response?.data?.message || 'Failed to update task');
      console.error('Error updating task:', error);
      return { success: false, message: error.response?.data?.message || 'Failed to update task' };
    } finally {
      setLoading(false);
    }
  };

  // Delete a task
  const deleteTask = async (id) => {
    setLoading(true);
    setError(null);
    
    try {
      await axios.delete(`${import.meta.env.VITE_API_URL}/tasks/${id}`);
      setTasks(tasks.filter(task => task.id !== id));
      return { success: true };
    } catch (error) {
      setError(error.response?.data?.message || 'Failed to delete task');
      console.error('Error deleting task:', error);
      return { success: false, message: error.response?.data?.message || 'Failed to delete task' };
    } finally {
      setLoading(false);
    }
  };

  // Create a new project
  const createProject = async (projectData) => {
    setLoading(true);
    setError(null);
    
    try {
      const response = await axios.post(`${import.meta.env.VITE_API_URL}/projects`, projectData);
      setProjects([response.data, ...projects]);
      return { success: true, project: response.data };
    } catch (error) {
      setError(error.response?.data?.message || 'Failed to create project');
      console.error('Error creating project:', error);
      return { success: false, message: error.response?.data?.message || 'Failed to create project' };
    } finally {
      setLoading(false);
    }
  };

  // Update a project
  const updateProject = async (id, projectData) => {
    setLoading(true);
    setError(null);
    
    try {
      const response = await axios.put(`${import.meta.env.VITE_API_URL}/projects/${id}`, projectData);
      setProjects(projects.map(project => project.id === id ? response.data : project));
      return { success: true, project: response.data };
    } catch (error) {
      setError(error.response?.data?.message || 'Failed to update project');
      console.error('Error updating project:', error);
      return { success: false, message: error.response?.data?.message || 'Failed to update project' };
    } finally {
      setLoading(false);
    }
  };

  // Delete a project
  const deleteProject = async (id) => {
    setLoading(true);
    setError(null);
    
    try {
      await axios.delete(`${import.meta.env.VITE_API_URL}/projects/${id}`);
      setProjects(projects.filter(project => project.id !== id));
      // Also remove tasks associated with this project
      setTasks(tasks.filter(task => task.projectId !== id));
      return { success: true };
    } catch (error) {
      setError(error.response?.data?.message || 'Failed to delete project');
      console.error('Error deleting project:', error);
      return { success: false, message: error.response?.data?.message || 'Failed to delete project' };
    } finally {
      setLoading(false);
    }
  };

  return (
    <TaskContext.Provider
      value={{
        tasks,
        projects,
        loading,
        error,
        fetchTasks,
        fetchProjects,
        createTask,
        updateTask,
        deleteTask,
        createProject,
        updateProject,
        deleteProject
      }}
    >
      {children}
    </TaskContext.Provider>
  );
};

export default TaskContext;