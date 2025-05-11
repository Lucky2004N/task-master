import Layout from '../components/layout/Layout';

const AboutPage = () => {
  // Team members data
  const teamMembers = [
    {
      name: "Alex Johnson",
      role: "Founder & CEO",
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
      bio: "Alex founded Task Master with a vision to make task management simple and effective for everyone. With over 10 years of experience in productivity software, he leads the company's strategic direction."
    },
    {
      name: "Sarah Chen",
      role: "Lead Developer",
      image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
      bio: "Sarah oversees the technical development of Task Master. Her expertise in full-stack development and user experience design has been instrumental in creating our intuitive platform."
    },
    {
      name: "Marcus Williams",
      role: "UX/UI Designer",
      image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
      bio: "Marcus brings creativity and user-centered design principles to Task Master. His focus on accessibility and clean design ensures that our platform is easy and enjoyable to use."
    },
    {
      name: "Priya Patel",
      role: "Product Manager",
      image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
      bio: "Priya works closely with our users to understand their needs and translate them into product features. Her background in productivity coaching helps shape our roadmap."
    }
  ];

  return (
    <Layout>
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-6">About Task Master</h1>
        
        {/* Mission Section */}
        <div className="bg-white rounded-lg shadow-md p-8 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Our Mission</h2>
          <p className="text-lg text-gray-600">
            At Task Master, we believe that productivity shouldn't be complicated. Our mission is to help individuals and teams organize their work with a simple, intuitive platform that adapts to their unique needs.
          </p>
          <p className="text-lg text-gray-600 mt-4">
            We're passionate about creating tools that reduce stress, increase focus, and help people achieve their goals—whether that's completing a personal project or managing a team's workload.
          </p>
        </div>
        
        {/* Story Section */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Our Story</h2>
          
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="md:flex">
              <div className="md:flex-shrink-0">
                <img 
                  className="h-48 w-full object-cover md:h-full md:w-48" 
                  src="https://images.unsplash.com/photo-1515378791036-0648a3ef77b2?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80" 
                  alt="Person working on laptop" 
                />
              </div>
              <div className="p-8">
                <p className="text-gray-600 mb-4">
                  Task Master began in 2024 when our founder, Alex, became frustrated with existing task management tools that were either too complex or too simplistic. He envisioned a platform that struck the perfect balance—powerful enough for complex projects but simple enough for everyday use.
                </p>
                <p className="text-gray-600 mb-4">
                  What started as a personal project quickly grew as friends and colleagues began using early versions of Task Master and providing feedback. We officially launched in January 2025 and have been growing steadily ever since.
                </p>
                <p className="text-gray-600">
                  Today, Task Master is used by thousands of individuals and teams worldwide. We remain committed to our core values of simplicity, effectiveness, and continuous improvement based on user feedback.
                </p>
              </div>
            </div>
          </div>
        </div>
        
        {/* Team Section */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Meet Our Team</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {teamMembers.map((member) => (
              <div key={member.name} className="bg-white rounded-lg shadow-md overflow-hidden">
                <div className="sm:flex">
                  <div className="flex-shrink-0">
                    <img 
                      className="h-48 w-full object-cover sm:h-full sm:w-48" 
                      src={member.image} 
                      alt={member.name} 
                    />
                  </div>
                  <div className="p-6">
                    <h3 className="text-lg font-medium text-gray-900">{member.name}</h3>
                    <p className="text-sm text-primary-600 mb-2">{member.role}</p>
                    <p className="text-gray-600 text-sm">{member.bio}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        
        {/* Values Section */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Our Values</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white rounded-lg shadow-md p-6 border-t-4 border-primary-500">
              <div className="w-12 h-12 bg-primary-100 rounded-md flex items-center justify-center text-primary-600 mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">Simplicity</h3>
              <p className="text-gray-600">
                We believe that the best tools get out of your way. Task Master is designed to be intuitive and straightforward, helping you focus on what matters.
              </p>
            </div>
            
            <div className="bg-white rounded-lg shadow-md p-6 border-t-4 border-primary-500">
              <div className="w-12 h-12 bg-primary-100 rounded-md flex items-center justify-center text-primary-600 mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">Security</h3>
              <p className="text-gray-600">
                Your data is yours. We prioritize security and privacy in everything we do, ensuring your information is protected and never shared.
              </p>
            </div>
            
            <div className="bg-white rounded-lg shadow-md p-6 border-t-4 border-primary-500">
              <div className="w-12 h-12 bg-primary-100 rounded-md flex items-center justify-center text-primary-600 mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z" />
                </svg>
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">User-Centered</h3>
              <p className="text-gray-600">
                We actively listen to our users and incorporate their feedback. Task Master evolves based on real needs, not assumptions.
              </p>
            </div>
          </div>
        </div>
        
        {/* CTA Section */}
        <div className="bg-primary-500 rounded-lg shadow-md p-8 text-center">
          <h2 className="text-2xl font-bold text-white mb-4">Ready to get started?</h2>
          <p className="text-lg text-primary-100 mb-6">
            Join thousands of users who are already managing their tasks more efficiently with Task Master.
          </p>
          <div className="flex justify-center space-x-4">
            <a 
              href="/register" 
              className="btn bg-white text-primary-600 hover:bg-gray-100"
            >
              Sign up for free
            </a>
            <a 
              href="/contact" 
              className="btn bg-primary-600 text-white hover:bg-primary-700 border border-primary-100"
            >
              Contact us
            </a>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default AboutPage;