/**
 * Collection of motivational quotes for task notifications
 */
const motivationalQuotes = [
  "The secret of getting ahead is getting started. - Mark Twain",
  "Don't watch the clock; do what it does. Keep going. - Sam Levenson",
  "The way to get started is to quit talking and begin doing. - Walt Disney",
  "It always seems impossible until it's done. - Nelson Mandela",
  "Your talent determines what you can do. Your motivation determines how much you're willing to do. - Lou Holtz",
  "The future depends on what you do today. - Mahatma Gandhi",
  "The only way to do great work is to love what you do. - Steve Jobs",
  "Start where you are. Use what you have. Do what you can. - Arthur Ashe",
  "Don't let yesterday take up too much of today. - Will Rogers",
  "You don't have to be great to start, but you have to start to be great. - Zig Ziglar",
  "The harder you work for something, the greater you'll feel when you achieve it.",
  "Success is not final, failure is not fatal: It is the courage to continue that counts. - Winston Churchill",
  "Believe you can and you're halfway there. - Theodore Roosevelt",
  "The only limit to our realization of tomorrow is our doubts of today. - Franklin D. Roosevelt",
  "Do what you can, with what you have, where you are. - Theodore Roosevelt",
  "Your time is limited, don't waste it living someone else's life. - Steve Jobs",
  "The best way to predict the future is to create it. - Peter Drucker",
  "Small progress is still progress.",
  "Focus on being productive instead of busy.",
  "The difference between ordinary and extraordinary is that little extra.",
  "Don't count the days, make the days count. - Muhammad Ali",
  "Success is walking from failure to failure with no loss of enthusiasm. - Winston Churchill",
  "The only place where success comes before work is in the dictionary. - Vidal Sassoon",
  "Opportunities don't happen. You create them. - Chris Grosser",
  "The key to success is to focus on goals, not obstacles.",
  "Dream big and dare to fail. - Norman Vaughan",
  "What you get by achieving your goals is not as important as what you become by achieving your goals. - Zig Ziglar",
  "The successful warrior is the average person, with laser-like focus. - Bruce Lee",
  "You are never too old to set another goal or to dream a new dream. - C.S. Lewis",
  "Quality is not an act, it is a habit. - Aristotle"
];

/**
 * Returns a random motivational quote from the collection
 * @returns {string} A random motivational quote
 */
const getRandomQuote = () => {
  const randomIndex = Math.floor(Math.random() * motivationalQuotes.length);
  return motivationalQuotes[randomIndex];
};

module.exports = {
  getRandomQuote
};