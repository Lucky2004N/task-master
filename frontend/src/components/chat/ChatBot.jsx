import { useState, useRef, useEffect } from 'react';

const ChatBot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { 
      id: 1, 
      text: "Hi there! I'm your Task Master assistant. Need help staying motivated or organizing your tasks?", 
      sender: 'bot',
      timestamp: new Date()
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);
  
  // Motivational messages and task suggestions
  const motivationalResponses = [
    "You're making great progress! Keep up the good work!",
    "Remember, every completed task brings you closer to your goals.",
    "Taking things one step at a time is the key to success.",
    "You've got this! I believe in you.",
    "Small progress is still progress. Be proud of what you've accomplished today."
  ];
  
  const taskSuggestions = [
    "How about adding a quick 15-minute task to your list?",
    "Consider breaking down that big project into smaller, manageable tasks.",
    "Have you tried the Pomodoro technique? 25 minutes of focus, then a 5-minute break.",
    "Setting specific deadlines can help you stay on track.",
    "Try prioritizing your tasks using the Eisenhower Matrix: urgent/important, important/not urgent, etc."
  ];
  
  // Scroll to bottom of chat when new messages arrive
  useEffect(() => {
    scrollToBottom();
  }, [messages]);
  
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };
  
  const toggleChat = () => {
    setIsOpen(!isOpen);
    // If opening the chat and it's been closed for a while, add a greeting
    if (!isOpen && messages.length === 1) {
      setTimeout(() => {
        addBotMessage("What can I help you with today?");
      }, 500);
    }
  };
  
  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    if (inputValue.trim() === '') return;
    
    // Add user message
    const userMessage = {
      id: messages.length + 1,
      text: inputValue,
      sender: 'user',
      timestamp: new Date()
    };
    
    setMessages([...messages, userMessage]);
    setInputValue('');
    setIsTyping(true);
    
    // Simulate bot thinking
    setTimeout(() => {
      respondToMessage(inputValue);
      setIsTyping(false);
    }, 1000);
  };
  
  const addBotMessage = (text) => {
    const botMessage = {
      id: messages.length + 1,
      text,
      sender: 'bot',
      timestamp: new Date()
    };
    
    setMessages(prevMessages => [...prevMessages, botMessage]);
  };
  
  const respondToMessage = (message) => {
    const lowerMessage = message.toLowerCase();
    
    // Check for different types of user queries
    if (lowerMessage.includes('motivat') || lowerMessage.includes('inspire') || lowerMessage.includes('encourage')) {
      // Send a motivational message
      const randomMotivation = motivationalResponses[Math.floor(Math.random() * motivationalResponses.length)];
      addBotMessage(randomMotivation);
    } 
    else if (lowerMessage.includes('task') || lowerMessage.includes('todo') || lowerMessage.includes('to do') || lowerMessage.includes('work')) {
      // Send a task suggestion
      const randomSuggestion = taskSuggestions[Math.floor(Math.random() * taskSuggestions.length)];
      addBotMessage(randomSuggestion);
    }
    else if (lowerMessage.includes('hello') || lowerMessage.includes('hi') || lowerMessage.includes('hey')) {
      // Greeting
      addBotMessage("Hello! How can I help you with your tasks today?");
    }
    else if (lowerMessage.includes('thank')) {
      // Thanks
      addBotMessage("You're welcome! I'm here anytime you need assistance.");
    }
    else if (lowerMessage.includes('bye') || lowerMessage.includes('goodbye')) {
      // Farewell
      addBotMessage("Goodbye! Remember to check your tasks before you go. Have a productive day!");
    }
    else {
      // Default response with a suggestion to add a task
      addBotMessage("I'm here to help you stay on track! Would you like to add a task for today?");
      
      setTimeout(() => {
        addBotMessage("You can say 'motivate me' if you need some encouragement, or ask for task suggestions.");
      }, 1000);
    }
  };
  
  const formatTime = (date) => {
    return new Date(date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };
  
  return (
    <div className="fixed bottom-4 right-4 z-50">
      {/* Chat button */}
      <button
        onClick={toggleChat}
        className={`flex items-center justify-center w-14 h-14 rounded-full shadow-lg focus:outline-none transition-transform duration-300 hover:scale-110 ${
          isOpen ? 'bg-red-500 rotate-45' : 'bg-primary-500'
        }`}
      >
        {isOpen ? (
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        ) : (
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
          </svg>
        )}
      </button>
      
      {/* Chat window */}
      {isOpen && (
        <div className="absolute bottom-16 right-0 w-80 sm:w-96 bg-white rounded-lg shadow-xl border border-gray-200 overflow-hidden transition-all duration-300 transform origin-bottom-right animate-scale-in">
          {/* Chat header */}
          <div className="bg-primary-500 text-white px-4 py-3 flex justify-between items-center">
            <div className="flex items-center">
              <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center text-primary-500 mr-2">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M2 5a2 2 0 012-2h7a2 2 0 012 2v4a2 2 0 01-2 2H9l-3 3v-3H4a2 2 0 01-2-2V5z" />
                  <path d="M15 7v2a4 4 0 01-4 4H9.828l-1.766 1.767c.28.149.599.233.938.233h2l3 3v-3h2a2 2 0 002-2V9a2 2 0 00-2-2h-1z" />
                </svg>
              </div>
              <div>
                <h3 className="font-medium">Task Assistant</h3>
                <p className="text-xs text-primary-100">Here to motivate you</p>
              </div>
            </div>
          </div>
          
          {/* Chat messages */}
          <div className="h-80 overflow-y-auto p-4 bg-gray-50">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`mb-3 flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[80%] rounded-lg px-4 py-2 ${
                    message.sender === 'user'
                      ? 'bg-primary-500 text-white rounded-br-none'
                      : 'bg-white border border-gray-200 text-gray-700 rounded-bl-none'
                  }`}
                >
                  <p>{message.text}</p>
                  <p className={`text-xs mt-1 ${message.sender === 'user' ? 'text-primary-100' : 'text-gray-400'}`}>
                    {formatTime(message.timestamp)}
                  </p>
                </div>
              </div>
            ))}
            
            {isTyping && (
              <div className="flex justify-start mb-3">
                <div className="bg-white border border-gray-200 rounded-lg rounded-bl-none px-4 py-2">
                  <div className="flex space-x-1">
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
                  </div>
                </div>
              </div>
            )}
            
            <div ref={messagesEndRef} />
          </div>
          
          {/* Chat input */}
          <form onSubmit={handleSubmit} className="border-t border-gray-200 p-3 flex">
            <input
              type="text"
              value={inputValue}
              onChange={handleInputChange}
              placeholder="Type a message..."
              className="flex-1 border border-gray-300 rounded-l-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            />
            <button
              type="submit"
              className="bg-primary-500 text-white rounded-r-lg px-4 py-2 hover:bg-primary-600 transition-colors duration-200"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-8.707l-3-3a1 1 0 00-1.414 0l-3 3a1 1 0 001.414 1.414L9 9.414V13a1 1 0 102 0V9.414l1.293 1.293a1 1 0 001.414-1.414z" clipRule="evenodd" />
              </svg>
            </button>
          </form>
        </div>
      )}
    </div>
  );
};

export default ChatBot;