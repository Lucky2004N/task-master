import { useState, useContext } from 'react';
import Layout from '../../components/layout/Layout';
import AuthContext from '../../context/AuthContext';

const ProfilePage = () => {
  const { user, updateProfile, logout } = useContext(AuthContext);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
    profileImage: user?.profileImage || ''
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setLoading(true);

    // Validate passwords if changing
    if (formData.newPassword) {
      if (!formData.currentPassword) {
        setError('Current password is required to set a new password');
        setLoading(false);
        return;
      }
      if (formData.newPassword !== formData.confirmPassword) {
        setError('New passwords do not match');
        setLoading(false);
        return;
      }
      if (formData.newPassword.length < 6) {
        setError('Password must be at least 6 characters');
        setLoading(false);
        return;
      }
    }

    // Prepare update data
    const updateData = {
      name: formData.name,
      email: formData.email,
      profileImage: formData.profileImage
    };

    // Add password fields if changing password
    if (formData.newPassword) {
      updateData.currentPassword = formData.currentPassword;
      updateData.newPassword = formData.newPassword;
    }

    try {
      const result = await updateProfile(updateData);
      if (result.success) {
        setSuccess('Profile updated successfully');
        setIsEditing(false);
        // Reset password fields
        setFormData({
          ...formData,
          currentPassword: '',
          newPassword: '',
          confirmPassword: ''
        });
      } else {
        setError(result.message || 'Failed to update profile');
      }
    } catch (err) {
      setError('An error occurred while updating your profile');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteAccount = () => {
    if (window.confirm('Are you sure you want to delete your account? This action cannot be undone.')) {
      // Implement account deletion logic here
      // For now, just log the user out
      logout();
    }
  };

  return (
    <Layout>
      <div className="max-w-3xl mx-auto">
        <h1 className="text-2xl font-bold text-gray-900 mb-6">Profile Settings</h1>

        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          {/* Profile header */}
          <div className="bg-primary-500 h-24"></div>
          
          <div className="p-6">
            {/* Profile image and basic info */}
            <div className="flex flex-col sm:flex-row items-center sm:items-start -mt-12 sm:-mt-16 mb-6">
              <div className="h-24 w-24 sm:h-32 sm:w-32 rounded-full bg-white p-1 shadow-lg mb-4 sm:mb-0">
                {user?.profileImage ? (
                  <img 
                    src={user.profileImage} 
                    alt={user.name} 
                    className="h-full w-full rounded-full object-cover"
                  />
                ) : (
                  <div className="h-full w-full rounded-full bg-primary-100 flex items-center justify-center text-primary-600 text-4xl font-semibold">
                    {user?.name?.charAt(0).toUpperCase() || 'U'}
                  </div>
                )}
              </div>
              
              <div className="sm:ml-6 text-center sm:text-left">
                <h2 className="text-xl font-bold text-gray-900">{user?.name}</h2>
                <p className="text-gray-600">{user?.email}</p>
                <p className="text-sm text-gray-500 mt-1">Member since {new Date(user?.createdAt).toLocaleDateString()}</p>
              </div>
            </div>

            {/* Success/Error messages */}
            {success && (
              <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative mb-4" role="alert">
                <span className="block sm:inline">{success}</span>
              </div>
            )}
            
            {error && (
              <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4" role="alert">
                <span className="block sm:inline">{error}</span>
              </div>
            )}

            {/* Profile form */}
            <div className="mt-6">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-medium text-gray-900">Personal Information</h3>
                <button
                  type="button"
                  onClick={() => setIsEditing(!isEditing)}
                  className="text-primary-600 hover:text-primary-700 text-sm font-medium"
                >
                  {isEditing ? 'Cancel' : 'Edit'}
                </button>
              </div>

              <form onSubmit={handleSubmit}>
                <div className="space-y-4">
                  <div>
                    <label htmlFor="name" className="form-label">Name</label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      disabled={!isEditing}
                      className="form-input"
                      required
                    />
                  </div>

                  <div>
                    <label htmlFor="email" className="form-label">Email</label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      disabled={!isEditing}
                      className="form-input"
                      required
                    />
                  </div>

                  <div>
                    <label htmlFor="profileImage" className="form-label">Profile Image URL</label>
                    <input
                      type="url"
                      id="profileImage"
                      name="profileImage"
                      value={formData.profileImage}
                      onChange={handleChange}
                      disabled={!isEditing}
                      placeholder="https://example.com/image.jpg"
                      className="form-input"
                    />
                    <p className="mt-1 text-sm text-gray-500">
                      Enter a URL to an image. Leave blank to use your initial as avatar.
                    </p>
                  </div>

                  {isEditing && (
                    <>
                      <div className="border-t border-gray-200 pt-4 mt-4">
                        <h4 className="text-md font-medium text-gray-900 mb-2">Change Password</h4>
                        <p className="text-sm text-gray-500 mb-4">
                          Leave blank if you don't want to change your password
                        </p>

                        <div className="space-y-4">
                          <div>
                            <label htmlFor="currentPassword" className="form-label">Current Password</label>
                            <input
                              type="password"
                              id="currentPassword"
                              name="currentPassword"
                              value={formData.currentPassword}
                              onChange={handleChange}
                              className="form-input"
                            />
                          </div>

                          <div>
                            <label htmlFor="newPassword" className="form-label">New Password</label>
                            <input
                              type="password"
                              id="newPassword"
                              name="newPassword"
                              value={formData.newPassword}
                              onChange={handleChange}
                              className="form-input"
                              minLength="6"
                            />
                          </div>

                          <div>
                            <label htmlFor="confirmPassword" className="form-label">Confirm New Password</label>
                            <input
                              type="password"
                              id="confirmPassword"
                              name="confirmPassword"
                              value={formData.confirmPassword}
                              onChange={handleChange}
                              className="form-input"
                            />
                          </div>
                        </div>
                      </div>

                      <div className="flex justify-end mt-6">
                        <button
                          type="submit"
                          className="btn btn-primary"
                          disabled={loading}
                        >
                          {loading ? 'Saving...' : 'Save Changes'}
                        </button>
                      </div>
                    </>
                  )}
                </div>
              </form>

              {/* Danger Zone */}
              <div className="mt-12 border-t border-gray-200 pt-6">
                <h3 className="text-lg font-medium text-red-600">Danger Zone</h3>
                <p className="mt-1 text-sm text-gray-500">
                  Once you delete your account, there is no going back. Please be certain.
                </p>
                <div className="mt-4">
                  <button
                    type="button"
                    onClick={handleDeleteAccount}
                    className="btn bg-red-600 text-white hover:bg-red-700"
                  >
                    Delete Account
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default ProfilePage;