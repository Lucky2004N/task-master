import Layout from '../components/layout/Layout';

const WhatsNewPage = () => {
  // Features organized by release version
  const releases = [
    {
      version: "1.2.0",
      date: "May 2025",
      features: [
        {
          title: "AI-Powered Task Assistant",
          description: "Our new AI assistant helps you prioritize tasks, suggests optimal scheduling, and provides productivity tips based on your work patterns.",
          isNew: true
        },
        {
          title: "Enhanced Progress Visualization",
          description: "Track your progress with our new interactive journey tracker that shows milestones and achievements.",
          isNew: true
        },
        {
          title: "Dark Mode Support",
          description: "Reduce eye strain with our new dark mode option, perfect for late-night productivity sessions.",
          isNew: true
        }
      ]
    },
    {
      version: "1.1.0",
      date: "March 2025",
      features: [
        {
          title: "Project Management",
          description: "Organize your tasks into projects with color coding and progress tracking.",
          isNew: false
        },
        {
          title: "Calendar Integration",
          description: "View your tasks in a calendar format and sync with popular calendar applications.",
          isNew: false
        },
        {
          title: "Task Filtering and Sorting",
          description: "Find exactly what you need with advanced filtering options by status, priority, and project.",
          isNew: false
        }
      ]
    },
    {
      version: "1.0.0",
      date: "January 2025",
      features: [
        {
          title: "Task Management",
          description: "Create, edit, and organize tasks with priorities and due dates.",
          isNew: false
        },
        {
          title: "User Accounts",
          description: "Secure user authentication and profile management.",
          isNew: false
        },
        {
          title: "Responsive Design",
          description: "Access Task Master from any device with our mobile-friendly interface.",
          isNew: false
        }
      ]
    }
  ];

  return (
    <Layout>
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-6">What's New</h1>
        
        <p className="text-lg text-gray-600 mb-8">
          We're constantly improving Task Master with new features and enhancements. 
          Here's a summary of our recent updates and what's coming soon.
        </p>
        
        <div className="space-y-12">
          {releases.map((release, index) => (
            <div key={release.version} className="relative">
              {/* Timeline connector */}
              {index < releases.length - 1 && (
                <div className="absolute left-4 top-8 bottom-0 w-0.5 bg-gray-200"></div>
              )}
              
              <div className="flex items-start">
                {/* Version badge */}
                <div className="bg-primary-500 text-white rounded-full h-8 w-8 flex items-center justify-center z-10">
                  <span className="text-sm font-medium">{release.version.split('.')[0]}</span>
                </div>
                
                <div className="ml-6">
                  <h2 className="text-xl font-bold text-gray-900">
                    Version {release.version}
                    <span className="ml-2 text-sm font-normal text-gray-500">
                      Released {release.date}
                    </span>
                  </h2>
                  
                  <div className="mt-4 space-y-6">
                    {release.features.map((feature) => (
                      <div key={feature.title} className="bg-white rounded-lg shadow-md p-6 border-l-4 border-primary-500">
                        <div className="flex items-center">
                          <h3 className="text-lg font-medium text-gray-900">
                            {feature.title}
                          </h3>
                          {feature.isNew && (
                            <span className="ml-2 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-primary-100 text-primary-800">
                              NEW
                            </span>
                          )}
                        </div>
                        <p className="mt-2 text-gray-600">
                          {feature.description}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        {/* Coming Soon Section */}
        <div className="mt-12 bg-gray-50 rounded-lg p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Coming Soon</h2>
          
          <ul className="space-y-3">
            <li className="flex items-start">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-primary-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span className="text-gray-700">Team collaboration features for shared projects and tasks</span>
            </li>
            <li className="flex items-start">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-primary-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span className="text-gray-700">Mobile applications for iOS and Android</span>
            </li>
            <li className="flex items-start">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-primary-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span className="text-gray-700">Advanced analytics and productivity insights</span>
            </li>
            <li className="flex items-start">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-primary-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span className="text-gray-700">Integration with popular productivity tools</span>
            </li>
          </ul>
          
          <div className="mt-6">
            <p className="text-gray-600">
              Have a feature request? We'd love to hear your ideas!
            </p>
            <a 
              href="/contact" 
              className="mt-2 inline-flex items-center text-primary-600 hover:text-primary-700"
            >
              Contact us with your suggestions
              <svg xmlns="http://www.w3.org/2000/svg" className="ml-1 h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default WhatsNewPage;