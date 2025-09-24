// ChatbotTab.jsx
import React from 'react';
import { MessageCircle, Send } from 'lucide-react';

const ChatbotTab = ({ currentTexts, language, chatMessages, chatInput, setChatInput, handleChatSubmit }) => {
  const quickQuestions = [
    { en: 'What are symptoms of leaf blight?', hi: 'पत्ती ब्लाइट के लक्षण क्या हैं?' },
    { en: 'How to prevent powdery mildew?', hi: 'पाउडरी मिल्ड्यू कैसे रोकें?' },
    { en: 'Best fungicides for crops?', hi: 'फसलों के लिए सबसे अच्छे कवकनाशी?' },
    { en: 'Organic disease control methods?', hi: 'जैविक रोग नियंत्रण विधियां?' }
  ];

  return (
    <div className="max-w-4xl mx-auto">
      <div className="bg-white rounded-2xl shadow-lg border border-blue-100 overflow-hidden">
        <div className="bg-gradient-to-r from-blue-500 to-teal-500 p-4">
          <h2 className="text-xl font-bold text-white flex items-center">
            <MessageCircle className="h-6 w-6 mr-2" />
            {language === 'hindi' ? 'कृषि सहायक चैटबॉट' : 'Agricultural Assistant Chatbot'}
          </h2>
        </div>
        
        <div className="h-96 overflow-y-auto p-4 space-y-4 bg-gray-50">
          {chatMessages.map((message, index) => (
            <div key={index} className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}>
              <div className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${message.type === 'user' ? 'bg-blue-500 text-white' : 'bg-white text-gray-800 border border-gray-200'}`}>
                <p className="text-sm">{message.text}</p>
                <p className="text-xs opacity-75 mt-1">{message.timestamp.toLocaleTimeString()}</p>
              </div>
            </div>
          ))}
        </div>
        
        <form onSubmit={handleChatSubmit} className="p-4 bg-white border-t border-gray-200">
          <div className="flex space-x-3">
            <input
              type="text"
              value={chatInput}
              onChange={(e) => setChatInput(e.target.value)}
              placeholder={language === 'hindi' ? 'अपना सवाल यहाँ लिखें...' : 'Type your question here...'}
              className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
            <button type="submit" className="bg-gradient-to-r from-blue-500 to-teal-500 text-white px-4 py-2 rounded-lg hover:from-blue-600 hover:to-teal-600 transition-all">
              <Send className="h-5 w-5" />
            </button>
          </div>
        </form>
      </div>

      <div className="mt-6 bg-white rounded-xl shadow-lg p-6 border border-blue-100">
        <h3 className="text-lg font-semibold mb-4">{language === 'hindi' ? 'तुरंत पूछे जाने वाले सवाल' : 'Quick Questions'}</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {quickQuestions.map((question, index) => (
            <button
              key={index}
              onClick={() => setChatInput(question[language === 'hindi' ? 'hi' : 'en'])}
              className="text-left p-3 rounded-lg bg-blue-50 hover:bg-blue-100 text-blue-700 text-sm transition-colors border border-blue-200"
            >
              {question[language === 'hindi' ? 'hi' : 'en']}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ChatbotTab;
