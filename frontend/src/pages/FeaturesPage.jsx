import { Link } from 'react-router-dom';
import Layout from '../components/layout/Layout';

const FeaturesPage = () => {
  // Features data
  const features = [
    {
      title: "Task Management",
      description: "Create, organize, and track tasks with ease. Set priorities, due dates, and detailed descriptions to keep everything organized.",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
        </svg>
      ),
      details: [
        "Create tasks with titles, descriptions, and due dates",
        "Set priority levels (Low, Medium, High, Urgent)",
        "Track task status (Pending, In Progress, Completed, Archived)",
        "Filter and sort tasks by various criteria",
        "Bulk actions for managing multiple tasks"
      ]
    },
    {
      title: "Project Organization",
      description: "Group related tasks into projects. Color-code and categorize for better organization and tracking.",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
        </svg>
      ),
      details: [
        "Create projects with custom names and descriptions",
        "Assign color codes to visually distinguish projects",
        "Group tasks within projects for better organization",
        "Track project progress with completion percentages",
        "View project-specific task lists and statistics"
      ]
    },
    {
      title: "Progress Tracking",
      description: "Visualize your journey and celebrate your achievements with our interactive progress visualization tools.",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 8v8m-4-5v5m-4-2v2m-2 4h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
        </svg>
      ),
      details: [
        "Interactive journey tracker with milestones",
        "Visual progress bars for projects and overall completion",
        "Statistics dashboard with key metrics",
        "Completion history and trends over time",
        "Achievement badges and rewards for hitting milestones"
      ]
    },
    {
      title: "Calendar View",
      description: "Visualize your tasks in a calendar format. Never miss a deadline again with our intuitive calendar interface.",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
        </svg>
      ),
      details: [
        "Monthly, weekly, and daily calendar views",
        "Drag-and-drop task scheduling",
        "Visual indicators for task priority and status",
        "Deadline notifications and reminders",
        "Integration with popular calendar applications"
      ]
    },
    {
      title: "AI-Powered Assistant",
      description: "Get personalized task suggestions and productivity tips from our AI assistant that learns from your work patterns.",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
        </svg>
      ),
      details: [
        "Smart task prioritization suggestions",
        "Personalized productivity insights",
        "Automated scheduling recommendations",
        "Motivational messages and tips",
        "Learning algorithm that adapts to your work style"
      ]
    },
    {
      title: "User Profiles",
      description: "Customize your experience with personalized user profiles, settings, and preferences.",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
        </svg>
      ),
      details: [
        "Customizable user profiles with avatars",
        "Personal productivity statistics and insights",
        "Preference settings for notifications and display",
        "Account security and privacy controls",
        "Activity history and usage reports"
      ]
    }
  ];

  // Pricing plans
  const plans = [
    {
      name: "Free",
      price: "$0",
      period: "forever",
      features: [
        "Up to 20 active tasks",
        "Up to 3 projects",
        "Basic task management",
        "7-day task history",
        "Email support"
      ],
      cta: "Get Started",
      ctaLink: "/register",
      popular: false
    },
    {
      name: "Pro",
      price: "$9.99",
      period: "per month",
      features: [
        "Unlimited tasks",
        "Unlimited projects",
        "Advanced task management",
        "Full history access",
        "Calendar integration",
        "Priority support"
      ],
      cta: "Try Free for 14 Days",
      ctaLink: "/register?plan=pro",
      popular: true
    },
    {
      name: "Team",
      price: "$19.99",
      period: "per month",
      features: [
        "Everything in Pro",
        "Up to 5 team members",
        "Team collaboration",
        "Role-based permissions",
        "Team analytics",
        "Dedicated support"
      ],
      cta: "Contact Sales",
      ctaLink: "/contact",
      popular: false
    }
  ];

  return (
    <Layout>
      <div className="max-w-7xl mx-auto">
        {/* Hero Section */}
        <div className="text-center py-12">
          <h1 className="text-4xl font-extrabold text-gray-900 tracking-tight">
            Powerful Features for <span className="text-primary-500">Maximum Productivity</span>
          </h1>
          <p className="mt-6 text-xl text-gray-500 max-w-3xl mx-auto">
            Task Master combines powerful task management with an intuitive interface to help you stay organized, focused, and productive.
          </p>
        </div>

        {/* Features Grid */}
        <div className="py-12">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow duration-300">
                <div className="w-12 h-12 bg-primary-100 rounded-md flex items-center justify-center text-primary-600 mb-4">
                  {feature.icon}
                </div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">{feature.title}</h3>
                <p className="text-gray-600 mb-4">{feature.description}</p>
                <ul className="space-y-2">
                  {feature.details.map((detail, i) => (
                    <li key={i} className="flex items-start">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-primary-500 mr-2 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <span className="text-sm text-gray-600">{detail}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Comparison Table */}
        <div className="py-12">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-8">Feature Comparison</h2>
          
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white rounded-lg shadow-md">
              <thead>
                <tr className="bg-gray-50">
                  <th className="py-4 px-6 text-left text-gray-700 font-medium">Feature</th>
                  <th className="py-4 px-6 text-center text-gray-700 font-medium">Free</th>
                  <th className="py-4 px-6 text-center text-gray-700 font-medium">Pro</th>
                  <th className="py-4 px-6 text-center text-gray-700 font-medium">Team</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                <tr>
                  <td className="py-4 px-6 text-gray-700">Tasks</td>
                  <td className="py-4 px-6 text-center text-gray-600">Up to 20</td>
                  <td className="py-4 px-6 text-center text-gray-600">Unlimited</td>
                  <td className="py-4 px-6 text-center text-gray-600">Unlimited</td>
                </tr>
                <tr>
                  <td className="py-4 px-6 text-gray-700">Projects</td>
                  <td className="py-4 px-6 text-center text-gray-600">Up to 3</td>
                  <td className="py-4 px-6 text-center text-gray-600">Unlimited</td>
                  <td className="py-4 px-6 text-center text-gray-600">Unlimited</td>
                </tr>
                <tr>
                  <td className="py-4 px-6 text-gray-700">Task History</td>
                  <td className="py-4 px-6 text-center text-gray-600">7 days</td>
                  <td className="py-4 px-6 text-center text-gray-600">Unlimited</td>
                  <td className="py-4 px-6 text-center text-gray-600">Unlimited</td>
                </tr>
                <tr>
                  <td className="py-4 px-6 text-gray-700">Calendar View</td>
                  <td className="py-4 px-6 text-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-red-500 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </td>
                  <td className="py-4 px-6 text-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-green-500 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </td>
                  <td className="py-4 px-6 text-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-green-500 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </td>
                </tr>
                <tr>
                  <td className="py-4 px-6 text-gray-700">AI Assistant</td>
                  <td className="py-4 px-6 text-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-red-500 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </td>
                  <td className="py-4 px-6 text-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-green-500 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </td>
                  <td className="py-4 px-6 text-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-green-500 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </td>
                </tr>
                <tr>
                  <td className="py-4 px-6 text-gray-700">Team Collaboration</td>
                  <td className="py-4 px-6 text-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-red-500 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </td>
                  <td className="py-4 px-6 text-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-red-500 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </td>
                  <td className="py-4 px-6 text-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-green-500 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </td>
                </tr>
                <tr>
                  <td className="py-4 px-6 text-gray-700">Support</td>
                  <td className="py-4 px-6 text-center text-gray-600">Email</td>
                  <td className="py-4 px-6 text-center text-gray-600">Priority</td>
                  <td className="py-4 px-6 text-center text-gray-600">Dedicated</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* Pricing Section */}
        <div className="py-12">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-2">Simple, Transparent Pricing</h2>
          <p className="text-center text-gray-600 mb-8 max-w-3xl mx-auto">
            Choose the plan that works best for you. All plans include our core task management features.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {plans.map((plan, index) => (
              <div 
                key={index} 
                className={`bg-white rounded-lg shadow-md overflow-hidden border ${
                  plan.popular ? 'border-primary-500 ring-2 ring-primary-500 ring-opacity-50' : 'border-gray-200'
                }`}
              >
                {plan.popular && (
                  <div className="bg-primary-500 text-white text-center py-1 text-sm font-medium">
                    Most Popular
                  </div>
                )}
                
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-900">{plan.name}</h3>
                  <div className="mt-4 flex items-baseline">
                    <span className="text-3xl font-extrabold text-gray-900">{plan.price}</span>
                    <span className="ml-1 text-gray-500">/{plan.period}</span>
                  </div>
                  
                  <ul className="mt-6 space-y-4">
                    {plan.features.map((feature, i) => (
                      <li key={i} className="flex items-start">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-primary-500 mr-2 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        <span className="text-gray-600">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  
                  <div className="mt-8">
                    <Link
                      to={plan.ctaLink}
                      className={`w-full block text-center py-2 px-4 rounded-md shadow-sm text-sm font-medium ${
                        plan.popular 
                          ? 'bg-primary-500 text-white hover:bg-primary-600' 
                          : 'bg-white text-primary-600 border border-primary-500 hover:bg-gray-50'
                      }`}
                    >
                      {plan.cta}
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* FAQ Section */}
        <div className="py-12">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-8">Frequently Asked Questions</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-lg font-medium text-gray-900 mb-2">Can I upgrade or downgrade my plan?</h3>
              <p className="text-gray-600">
                Yes, you can upgrade or downgrade your plan at any time. Changes will be applied at the start of your next billing cycle.
              </p>
            </div>
            
            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-lg font-medium text-gray-900 mb-2">Is there a mobile app available?</h3>
              <p className="text-gray-600">
                We're currently developing mobile apps for iOS and Android. In the meantime, our web application is fully responsive and works great on mobile browsers.
              </p>
            </div>
            
            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-lg font-medium text-gray-900 mb-2">Can I export my data?</h3>
              <p className="text-gray-600">
                Yes, all plans include the ability to export your tasks and projects in common formats like CSV and JSON.
              </p>
            </div>
            
            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-lg font-medium text-gray-900 mb-2">Do you offer discounts for nonprofits or education?</h3>
              <p className="text-gray-600">
                Yes, we offer special pricing for nonprofit organizations, educational institutions, and students. Please contact our sales team for more information.
              </p>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="py-12 bg-primary-500 rounded-xl text-center">
          <h2 className="text-3xl font-bold text-white mb-4">Ready to boost your productivity?</h2>
          <p className="text-xl text-primary-100 mb-8 max-w-3xl mx-auto">
            Start organizing your tasks and projects today with Task Master's powerful yet simple tools.
          </p>
          <div className="flex justify-center space-x-4">
            <Link
              to="/register"
              className="btn bg-white text-primary-600 hover:bg-gray-100 px-8 py-3 text-base font-medium"
            >
              Get Started for Free
            </Link>
            <Link
              to="/contact"
              className="btn bg-primary-600 text-white hover:bg-primary-700 border border-primary-100 px-8 py-3 text-base font-medium"
            >
              Contact Sales
            </Link>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default FeaturesPage;