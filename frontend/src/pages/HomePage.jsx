import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Layout from '../components/layout/Layout';
import ProgressJourney from '../components/progress/ProgressJourney';
import ChatBot from '../components/chat/ChatBot';

const HomePage = () => {
  const [animateFeatures, setAnimateFeatures] = useState(false);
  const [animateProgress, setAnimateProgress] = useState(false);
  const [progressValue, setProgressValue] = useState(0);
  
  // Trigger animations when component mounts
  useEffect(() => {
    const featuresTimer = setTimeout(() => {
      setAnimateFeatures(true);
    }, 300);
    
    const progressTimer = setTimeout(() => {
      setAnimateProgress(true);
    }, 600);
    
    // Animate progress value
    const progressInterval = setInterval(() => {
      setProgressValue(prev => {
        if (prev >= 75) {
          clearInterval(progressInterval);
          return 75;
        }
        return prev + 1;
      });
    }, 30);
    
    return () => {
      clearTimeout(featuresTimer);
      clearTimeout(progressTimer);
      clearInterval(progressInterval);
    };
  }, []);
  
  return (
    <Layout>
      <div className="max-w-7xl mx-auto">
        {/* Hero Section */}
        <div className="py-12 md:py-20">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 tracking-tight animate-fade-in">
              Manage your tasks with <span className="text-primary-500">Task Master</span>
            </h1>
            <p className="mt-6 text-xl text-gray-500 max-w-3xl mx-auto animate-fade-in-up">
              A simple, intuitive task management platform for individuals and small teams.
              Stay organized, focused, and productive.
            </p>
            <div className="mt-10 flex justify-center gap-4 animate-fade-in-up" style={{ animationDelay: '200ms' }}>
              <Link
                to="/register"
                className="btn btn-primary px-8 py-3 text-base font-medium transform transition-transform duration-300 hover:scale-105"
              >
                Get Started
              </Link>
              <Link
                to="/login"
                className="btn btn-secondary px-8 py-3 text-base font-medium transform transition-transform duration-300 hover:scale-105"
              >
                Sign In
              </Link>
            </div>
          </div>
        </div>

        {/* Features Section */}
        <div className="py-12 bg-gray-50 rounded-xl">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <h2 className="text-3xl font-extrabold text-gray-900">
                Features that help you stay organized
              </h2>
              <p className="mt-4 text-lg text-gray-500">
                Everything you need to manage your tasks efficiently
              </p>
            </div>

            <div className="mt-12 grid gap-8 md:grid-cols-3">
              <div 
                className={`bg-white p-6 rounded-lg shadow-md transform transition-all duration-700 ${
                  animateFeatures ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
                }`}
                style={{ transitionDelay: '100ms' }}
              >
                <div className="w-12 h-12 bg-primary-100 rounded-md flex items-center justify-center text-primary-600">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                  </svg>
                </div>
                <h3 className="mt-4 text-lg font-medium text-gray-900">Task Management</h3>
                <p className="mt-2 text-gray-500">
                  Create, edit, and organize tasks with ease. Set priorities, deadlines, and track progress.
                </p>
              </div>

              <div 
                className={`bg-white p-6 rounded-lg shadow-md transform transition-all duration-700 ${
                  animateFeatures ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
                }`}
                style={{ transitionDelay: '300ms' }}
              >
                <div className="w-12 h-12 bg-primary-100 rounded-md flex items-center justify-center text-primary-600">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                  </svg>
                </div>
                <h3 className="mt-4 text-lg font-medium text-gray-900">Project Organization</h3>
                <p className="mt-2 text-gray-500">
                  Group related tasks into projects. Color-code and categorize for better organization.
                </p>
              </div>

              <div 
                className={`bg-white p-6 rounded-lg shadow-md transform transition-all duration-700 ${
                  animateFeatures ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
                }`}
                style={{ transitionDelay: '500ms' }}
              >
                <div className="w-12 h-12 bg-primary-100 rounded-md flex items-center justify-center text-primary-600">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                </div>
                <h3 className="mt-4 text-lg font-medium text-gray-900">Calendar View</h3>
                <p className="mt-2 text-gray-500">
                  Visualize your tasks in a calendar format. Never miss a deadline again.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Progress Visualization Section */}
        <div className="py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-extrabold text-gray-900">
                Track Your Progress
              </h2>
              <p className="mt-4 text-lg text-gray-500">
                Visualize your journey and celebrate your achievements
              </p>
            </div>
            
            <div 
              className={`bg-white p-8 rounded-lg shadow-md transform transition-all duration-1000 ${
                animateProgress ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0'
              }`}
            >
              <div className="flex justify-center">
                <ProgressJourney 
                  percentage={progressValue} 
                  milestones={[
                    { position: 0, label: 'Start' },
                    { position: 25, label: 'Planning' },
                    { position: 50, label: 'Halfway' },
                    { position: 75, label: 'Almost There' },
                    { position: 100, label: 'Complete' }
                  ]}
                  width={600}
                  height={150}
                />
              </div>
              
              <div className="mt-8 text-center">
                <p className="text-gray-600 mb-4">
                  Task Master helps you visualize your progress and stay motivated.
                </p>
                <Link
                  to="/register"
                  className="btn btn-primary"
                >
                  Start Tracking Your Progress
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Testimonials Section */}
        <div className="py-12 bg-gray-50 rounded-xl">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <h2 className="text-3xl font-extrabold text-gray-900">
                What our users say
              </h2>
            </div>

            <div className="mt-12 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              <div className="bg-white p-6 rounded-lg shadow-md transform transition-all duration-500 hover:scale-105">
                <div className="flex items-center">
                  <div className="h-12 w-12 rounded-full bg-primary-100 flex items-center justify-center text-primary-600 font-semibold">
                    JD
                  </div>
                  <div className="ml-4">
                    <h4 className="text-lg font-medium text-gray-900">John Doe</h4>
                    <p className="text-gray-500">Freelancer</p>
                  </div>
                </div>
                <p className="mt-4 text-gray-600">
                  "Task Master has completely transformed how I manage my client projects. The interface is intuitive and the project organization is exactly what I needed."
                </p>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-md transform transition-all duration-500 hover:scale-105">
                <div className="flex items-center">
                  <div className="h-12 w-12 rounded-full bg-primary-100 flex items-center justify-center text-primary-600 font-semibold">
                    JS
                  </div>
                  <div className="ml-4">
                    <h4 className="text-lg font-medium text-gray-900">Jane Smith</h4>
                    <p className="text-gray-500">Team Lead</p>
                  </div>
                </div>
                <p className="mt-4 text-gray-600">
                  "My team's productivity has increased significantly since we started using Task Master. The ability to organize tasks by projects has been a game-changer."
                </p>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-md transform transition-all duration-500 hover:scale-105">
                <div className="flex items-center">
                  <div className="h-12 w-12 rounded-full bg-primary-100 flex items-center justify-center text-primary-600 font-semibold">
                    RJ
                  </div>
                  <div className="ml-4">
                    <h4 className="text-lg font-medium text-gray-900">Robert Johnson</h4>
                    <p className="text-gray-500">Student</p>
                  </div>
                </div>
                <p className="mt-4 text-gray-600">
                  "As a student juggling multiple courses, Task Master helps me stay on top of assignments and deadlines. The calendar view is especially helpful for planning my study schedule."
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* What's New Section */}
        <div className="py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-extrabold text-gray-900">
                What's New
              </h2>
              <p className="mt-4 text-lg text-gray-500">
                Latest features and improvements
              </p>
            </div>
            
            <div className="grid gap-8 md:grid-cols-2">
              <div className="bg-white p-6 rounded-lg shadow-md border-l-4 border-primary-500">
                <span className="inline-block px-2 py-1 bg-primary-100 text-primary-800 text-xs font-semibold rounded-full mb-2">
                  NEW
                </span>
                <h3 className="text-lg font-medium text-gray-900">Motivational Chat Assistant</h3>
                <p className="mt-2 text-gray-500">
                  Our new AI-powered chat assistant helps you stay motivated and provides task management tips.
                </p>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-md border-l-4 border-primary-500">
                <span className="inline-block px-2 py-1 bg-primary-100 text-primary-800 text-xs font-semibold rounded-full mb-2">
                  IMPROVED
                </span>
                <h3 className="text-lg font-medium text-gray-900">Enhanced Progress Tracking</h3>
                <p className="mt-2 text-gray-500">
                  Visualize your progress with our new interactive journey tracker and celebrate your achievements.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="py-12 bg-primary-500 rounded-xl">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl font-extrabold text-white">
              Ready to get started?
            </h2>
            <p className="mt-4 text-xl text-primary-100">
              Join thousands of users who are already managing their tasks more efficiently.
            </p>
            <div className="mt-8">
              <Link
                to="/register"
                className="btn bg-white text-primary-600 hover:bg-gray-100 px-8 py-3 text-base font-medium transform transition-transform duration-300 hover:scale-105"
              >
                Sign up for free
              </Link>
            </div>
          </div>
        </div>
      </div>
      
      {/* Chat Bot */}
      <ChatBot />
      
      {/* CSS for animations */}
      <style jsx>{`
        @keyframes fade-in {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        
        @keyframes fade-in-up {
          from { 
            opacity: 0;
            transform: translateY(20px);
          }
          to { 
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        @keyframes scale-in {
          from { 
            opacity: 0;
            transform: scale(0.9);
          }
          to { 
            opacity: 1;
            transform: scale(1);
          }
        }
        
        .animate-fade-in {
          animation: fade-in 0.8s ease-out forwards;
        }
        
        .animate-fade-in-up {
          animation: fade-in-up 0.8s ease-out forwards;
        }
        
        .animate-scale-in {
          animation: scale-in 0.3s ease-out forwards;
        }
      `}</style>
    </Layout>
  );
};

export default HomePage;