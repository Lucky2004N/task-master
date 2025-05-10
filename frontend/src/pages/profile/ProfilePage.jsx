import { useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from '../../components/layout/Layout';
import AuthContext from '../../context/AuthContext';

const avatarOptions = [
  { id: 'avatar1', src: '/avatars/avatar1.png', alt: 'Avatar 1' },
  { id: 'avatar2', src: '/avatars/avatar2.png', alt: 'Avatar 2' },
  { id: 'avatar3', src: '/avatars/avatar3.png', alt: 'Avatar 3' },
  { id: 'avatar4', src: '/avatars/avatar4.png', alt: 'Avatar 4' },
  { id: 'avatar5', src: '/avatars/avatar5.png', alt: 'Avatar 5' },
  { id: 'avatar6', src: '/avatars/avatar6.png', alt: 'Avatar 6' },
];

const ProfilePage = () => {
  const { user, updateProfile } = useContext(AuthContext);
  const navigate = useNavigate();
  
  const [formData, setFormData] = useState({
    name: '',
    username: '',
    email: '',
    specification: '',
    profileImage: '',
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  });
  
  const [activeTab, setActiveTab] = useState('profile');
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState({ type: '', text: '' });
  const [showAvatarSelector, setShowAvatarSelector] = useState(false);
  
  useEffect(() => {
    if (user) {
      setFormData({
        name: user.name || '',
        username: user.username || '',
        email: user.email || '',
        specification: user.specification || 'student',
        profileImage: user.profileImage || '',
        currentPassword: '',
        newPassword: '',
        confirmPassword: '',
      });
    }
  }, [user]);
  
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  
  const handleProfileSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setMessage({ type: '', text: '' });
    
    try {
      const result = await updateProfile({
        name: formData.name,
        username: formData.username,
        specification: formData.specification,
        profileImage: formData.profileImage,
      });
      
      if (result.success) {
        setMessage({ type: 'success', text: 'Profile updated successfully!' });
      } else {
        setMessage({ type: 'error', text: result.message || 'Failed to update profile' });
      }
    } catch (err) {
      setMessage({ type: 'error', text: 'An unexpected error occurred' });
      console.error('Profile update error:', err);
    } finally {
      setIsLoading(false);
    }
  };
  
  const handlePasswordSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setMessage({ type: '', text: '' });
    
    // Validate passwords
    if (formData.newPassword !== formData.confirmPassword) {
      setMessage({ type: 'error', text: 'New passwords do not match' });
      setIsLoading(false);
      return;
    }
    
    if (formData.newPassword.length < 6) {
      setMessage({ type: 'error', text: 'Password must be at least 6 characters' });
      setIsLoading(false);
      return;
    }
    
    try {
      const result = await updateProfile({
        currentPassword: formData.currentPassword,
        newPassword: formData.newPassword,
      });
      
      if (result.success) {
        setMessage({ type: 'success', text: 'Password updated successfully!' });
        setFormData({
          ...formData,
          currentPassword: '',
          newPassword: '',
          confirmPassword: '',
        });
      } else {
        setMessage({ type: 'error', text: result.message || 'Failed to update password' });
      }
    } catch (err) {
      setMessage({ type: 'error', text: 'An unexpected error occurred' });
      console.error('Password update error:', err);
    } finally {
      setIsLoading(false);
    }
  };
  
  const handleAvatarSelect = (avatarSrc) => {
    setFormData({ ...formData, profileImage: avatarSrc });
    setShowAvatarSelector(false);
  };
  
  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    
    const reader = new FileReader();
    reader.onloadend = () => {
      setFormData({ ...formData, profileImage: reader.result });
    };
    reader.readAsDataURL(file);
  };
  
  return (
    <Layout>
      <div className="max-w-4xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        <div className="bg-white shadow rounded-lg overflow-hidden">
          <div className="flex flex-col sm:flex-row">
            {/* Sidebar */}
            <div className="sm:w-64 bg-gray-50 p-6 border-b sm:border-b-0 sm:border-r border-gray-200">
              <div className="flex flex-col items-center mb-6">
                <div className="relative group">
                  {formData.profileImage ? (
                    <img 
                      src={formData.profileImage} 
                      alt={formData.name} 
                      className="h-24 w-24 rounded-full object-cover border-4 border-primary-100"
                    />
                  ) : (
                    <div className="h-24 w-24 rounded-full bg-primary-100 flex items-center justify-center text-primary-600 text-3xl font-bold border-4 border-primary-100">
                      {formData.name?.charAt(0).toUpperCase() || 'U'}
                    </div>
                  )}
                  <button 
                    type="button"
                    onClick={() => setShowAvatarSelector(true)}
                    className="absolute bottom-0 right-0 bg-primary-500 text-white p-1 rounded-full hover:bg-primary-600 transition-colors duration-200"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                      <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
                    </svg>
                  </button>
                </div>
                <h2 className="mt-4 text-xl font-medium text-gray-900">{formData.name}</h2>
                <p className="text-sm text-gray-500">@{formData.username}</p>
                <p className="mt-1 text-sm text-primary-600 capitalize">{formData.specification}</p>
              </div>
              
              <nav className="space-y-1">
                <button
                  onClick={() => setActiveTab('profile')}
                  className={`w-full flex items-center px-3 py-2 text-sm font-medium rounded-md ${
                    activeTab === 'profile'
                      ? 'bg-primary-100 text-primary-700'
                      : 'text-gray-600 hover:bg-gray-100'
                  }`}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                  </svg>
                  Profile Information
                </button>
                <button
                  onClick={() => setActiveTab('security')}
                  className={`w-full flex items-center px-3 py-2 text-sm font-medium rounded-md ${
                    activeTab === 'security'
                      ? 'bg-primary-100 text-primary-700'
                      : 'text-gray-600 hover:bg-gray-100'
                  }`}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                  </svg>
                  Security
                </button>
              </nav>
            </div>
            
            {/* Main content */}
            <div className="flex-1 p-6">
              {message.text && (
                <div className={`mb-6 p-4 rounded-md ${
                  message.type === 'success' ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-700'
                }`}>
                  <p>{message.text}</p>
                </div>
              )}
              
              {activeTab === 'profile' ? (
                <form onSubmit={handleProfileSubmit}>
                  <h3 className="text-lg font-medium text-gray-900 mb-6">Profile Information</h3>
                  
                  <div className="space-y-6">
                    <div>
                      <label htmlFor="name" className="form-label">
                        Full Name
                      </label>
                      <input
                        id="name"
                        name="name"
                        type="text"
                        value={formData.name}
                        onChange={handleChange}
                        className="form-input"
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="username" className="form-label">
                        Username
                      </label>
                      <input
                        id="username"
                        name="username"
                        type="text"
                        value={formData.username}
                        onChange={handleChange}
                        className="form-input"
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="email" className="form-label">
                        Email Address
                      </label>
                      <input
                        id="email"
                        name="email"
                        type="email"
                        value={formData.email}
                        disabled
                        className="form-input bg-gray-50"
                      />
                      <p className="mt-1 text-xs text-gray-500">
                        Email cannot be changed. Contact support for assistance.
                      </p>
                    </div>
                    
                    <div>
                      <label htmlFor="specification" className="form-label">
                        I am a
                      </label>
                      <select
                        id="specification"
                        name="specification"
                        value={formData.specification}
                        onChange={handleChange}
                        className="form-input"
                      >
                        <option value="student">Student</option>
                        <option value="professional">Working Professional</option>
                        <option value="freelancer">Freelancer</option>
                        <option value="other">Other</option>
                      </select>
                    </div>
                    
                    <div>
                      <label className="form-label">
                        Profile Image
                      </label>
                      <div className="mt-1 flex items-center">
                        {formData.profileImage ? (
                          <img 
                            src={formData.profileImage} 
                            alt={formData.name} 
                            className="h-12 w-12 rounded-full object-cover"
                          />
                        ) : (
                          <div className="h-12 w-12 rounded-full bg-primary-100 flex items-center justify-center text-primary-600 font-bold">
                            {formData.name?.charAt(0).toUpperCase() || 'U'}
                          </div>
                        )}
                        <div className="ml-4 flex">
                          <button
                            type="button"
                            onClick={() => setShowAvatarSelector(true)}
                            className="bg-white py-2 px-3 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
                          >
                            Choose Avatar
                          </button>
                          <label className="ml-2 cursor-pointer bg-white py-2 px-3 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500">
                            Upload Image
                            <input
                              type="file"
                              accept="image/*"
                              onChange={handleImageUpload}
                              className="sr-only"
                            />
                          </label>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="mt-8 flex justify-end">
                    <button
                      type="submit"
                      disabled={isLoading}
                      className="btn btn-primary"
                    >
                      {isLoading ? 'Saving...' : 'Save Changes'}
                    </button>
                  </div>
                </form>
              ) : (
                <form onSubmit={handlePasswordSubmit}>
                  <h3 className="text-lg font-medium text-gray-900 mb-6">Change Password</h3>
                  
                  <div className="space-y-6">
                    <div>
                      <label htmlFor="currentPassword" className="form-label">
                        Current Password
                      </label>
                      <input
                        id="currentPassword"
                        name="currentPassword"
                        type="password"
                        value={formData.currentPassword}
                        onChange={handleChange}
                        className="form-input"
                        required
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="newPassword" className="form-label">
                        New Password
                      </label>
                      <input
                        id="newPassword"
                        name="newPassword"
                        type="password"
                        value={formData.newPassword}
                        onChange={handleChange}
                        className="form-input"
                        required
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="confirmPassword" className="form-label">
                        Confirm New Password
                      </label>
                      <input
                        id="confirmPassword"
                        name="confirmPassword"
                        type="password"
                        value={formData.confirmPassword}
                        onChange={handleChange}
                        className="form-input"
                        required
                      />
                    </div>
                  </div>
                  
                  <div className="mt-8 flex justify-end">
                    <button
                      type="submit"
                      disabled={isLoading}
                      className="btn btn-primary"
                    >
                      {isLoading ? 'Updating...' : 'Update Password'}
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
      
      {/* Avatar selector modal */}
      {showAvatarSelector && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg shadow-xl max-w-md w-full p-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-medium text-gray-900">Choose an Avatar</h3>
              <button
                type="button"
                onClick={() => setShowAvatarSelector(false)}
                className="text-gray-400 hover:text-gray-500"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            
            <div className="grid grid-cols-3 gap-4">
              {avatarOptions.map((avatar) => (
                <button
                  key={avatar.id}
                  type="button"
                  onClick={() => handleAvatarSelect(avatar.src)}
                  className="p-2 border-2 rounded-lg hover:bg-gray-50 transition-colors duration-200"
                  style={{ borderColor: formData.profileImage === avatar.src ? '#22c55e' : 'transparent' }}
                >
                  <img src={avatar.src} alt={avatar.alt} className="w-full h-auto rounded" />
                </button>
              ))}
            </div>
            
            <div className="mt-6 flex justify-end">
              <button
                type="button"
                onClick={() => setShowAvatarSelector(false)}
                className="btn btn-secondary mr-2"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={() => setShowAvatarSelector(false)}
                className="btn btn-primary"
              >
                Select
              </button>
            </div>
          </div>
        </div>
      )}
    </Layout>
  );
};

export default ProfilePage;