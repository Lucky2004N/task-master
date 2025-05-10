import React from 'react';
import Layout from '../components/layout/Layout';

const AboutPage = () => {
  return (
    <Layout>
      <div className="max-w-4xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
            About Task Master
          </h1>
          <p className="mt-4 text-lg text-gray-500">
            Our mission is to help you stay organized and productive
          </p>
        </div>
        
        <div className="prose prose-lg prose-primary mx-auto">
          <p>
            Task Master was created with a simple goal in mind: to make task management 
            intuitive, efficient, and even enjoyable. We believe that when you have the 
            right tools to organize your work, you can focus on what truly matters.
          </p>
          
          <h2>Our Story</h2>
          <p>
            Task Master began as a personal project by a team of developers who were 
            frustrated with existing task management solutions. We wanted something that 
            was powerful enough to handle complex projects but simple enough to use every day.
          </p>
          
          <p>
            After months of development and testing, we launched Task Master with core 
            features designed to help individuals and small teams organize their work 
            effectively. Since then, we've continued to refine and expand the platform 
            based on user feedback and our own experiences.
          </p>
          
          <h2>Our Philosophy</h2>
          <p>
            We believe that effective task management should be:
          </p>
          
          <ul>
            <li>
              <strong>Simple</strong> - No unnecessary complexity or steep learning curves
            </li>
            <li>
              <strong>Flexible</strong> - Adaptable to different workflows and preferences
            </li>
            <li>
              <strong>Motivating</strong> - Encouraging progress and celebrating achievements
            </li>
            <li>
              <strong>Insightful</strong> - Providing useful data to help you improve
            </li>
          </ul>
          
          <h2>Our Team</h2>
          <p>
            Task Master is developed and maintained by a small team of passionate 
            developers, designers, and productivity enthusiasts. We're committed to 
            creating tools that make a positive difference in how people work.
          </p>
          
          <div className="bg-primary-50 p-6 rounded-lg border-l-4 border-primary-500 mt-8">
            <h3 className="text-primary-800 font-medium">Our Vision</h3>
            <p className="text-primary-700 mt-2">
              We envision a world where everyone has access to simple yet powerful tools 
              that help them achieve their goals, reduce stress, and find more satisfaction 
              in their work.
            </p>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default AboutPage;