import { useState, useEffect } from 'react';

const ProjectForm = ({ project = null, onSubmit, onCancel }) => {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    color: '#22c55e' // Default to primary-500 color
  });

  useEffect(() => {
    if (project) {
      setFormData({
        name: project.name || '',
        description: project.description || '',
        color: project.color || '#22c55e'
      });
    }
  }, [project]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  // Predefined color options
  const colorOptions = [
    { value: '#22c55e', label: 'Green (Default)' },
    { value: '#3b82f6', label: 'Blue' },
    { value: '#ef4444', label: 'Red' },
    { value: '#f59e0b', label: 'Orange' },
    { value: '#8b5cf6', label: 'Purple' },
    { value: '#ec4899', label: 'Pink' },
    { value: '#06b6d4', label: 'Cyan' },
    { value: '#64748b', label: 'Slate' }
  ];

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label htmlFor="name" className="form-label">
          Project Name <span className="text-red-500">*</span>
        </label>
        <input
          type="text"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          className="form-input"
          placeholder="Enter project name"
          required
        />
      </div>

      <div>
        <label htmlFor="description" className="form-label">
          Description
        </label>
        <textarea
          id="description"
          name="description"
          value={formData.description}
          onChange={handleChange}
          rows="3"
          className="form-input"
          placeholder="Enter project description (optional)"
        ></textarea>
      </div>

      <div>
        <label htmlFor="color" className="form-label">
          Project Color
        </label>
        <div className="grid grid-cols-4 gap-2 mb-2">
          {colorOptions.map((color) => (
            <div 
              key={color.value}
              onClick={() => setFormData({ ...formData, color: color.value })}
              className={`h-8 rounded-md cursor-pointer border-2 ${
                formData.color === color.value ? 'border-gray-800' : 'border-transparent'
              }`}
              style={{ backgroundColor: color.value }}
              title={color.label}
            ></div>
          ))}
        </div>
        <div className="flex items-center">
          <input
            type="color"
            id="color"
            name="color"
            value={formData.color}
            onChange={handleChange}
            className="h-8 w-8 cursor-pointer"
          />
          <span className="ml-2 text-sm text-gray-500">Or select a custom color</span>
        </div>
      </div>

      <div className="flex justify-end space-x-3">
        <button
          type="button"
          onClick={onCancel}
          className="btn btn-secondary"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="btn btn-primary"
        >
          {project ? 'Update Project' : 'Create Project'}
        </button>
      </div>
    </form>
  );
};

export default ProjectForm;