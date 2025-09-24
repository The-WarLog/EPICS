// App.jsx
import React, { useState, useRef } from 'react';

// Data and Constants
import { PROJECT_INFO, diseaseData, regionData, texts, diseaseDatabase } from './constants';

// Child Components
import Header from './components/Header';
import Navigation from './components/Navigation';
import HomeTab from './components/HomeTab';
import DetectionTab from './components/DetectionTab';
import ChatbotTab from './components/ChatbotTab';
import AnalyticsTab from './components/AnalyticsTab';
import Footer from './components/Footer';

const App = () => {
  const [activeTab, setActiveTab] = useState('home');
  const [language, setLanguage] = useState('english');
  const [chatMessages, setChatMessages] = useState([
    { type: 'bot', text: 'नमस्ते! मैं आपकी फसल की बीमारियों की पहचान में मदद कर सकता हूं। / Hello! I can help you identify crop diseases.', timestamp: new Date() }
  ]);
  const [chatInput, setChatInput] = useState('');
  const [selectedImage, setSelectedImage] = useState(null);
  const [detectionResult, setDetectionResult] = useState(null);
  const fileInputRef = useRef(null);

  const detectDisease = (imageFile) => {
    // Simulating API call
    setTimeout(() => {
      const diseases = ['Leaf Blight', 'Powdery Mildew', 'Healthy', 'Bacterial Spot', 'Rust'];
      const randomDisease = diseases[Math.floor(Math.random() * diseases.length)];
      const confidence = Math.floor(Math.random() * 30) + 70;
      
      setDetectionResult({
        disease: randomDisease,
        confidence: confidence,
        severity: randomDisease === 'Healthy' ? 'None' : ['Low', 'Medium', 'High'][Math.floor(Math.random() * 3)],
        recommendations: randomDisease === 'Healthy' 
          ? 'Your plant looks healthy! Continue current care routine.'
          : `Treatment needed for ${randomDisease}. Apply appropriate fungicide and monitor closely.`
      });
    }, 2000);
  };

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setSelectedImage(e.target.result);
        setDetectionResult(null); // Clear previous results
        detectDisease(file);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleChatSubmit = (e) => {
    e.preventDefault();
    if (!chatInput.trim()) return;

    const userMessage = { type: 'user', text: chatInput, timestamp: new Date() };
    setChatMessages(prev => [...prev, userMessage]);

    // Simulating Bot response
    setTimeout(() => {
      let botResponse = '';
      const input = chatInput.toLowerCase();
      
      if (input.includes('blight') || input.includes('ब्लाइट')) {
        const info = diseaseDatabase['leaf blight'];
        botResponse = language === 'hindi' 
          ? `पत्ती ब्लाइट के लक्षण: ${info.hindi.symptoms}। उपचार: ${info.hindi.treatment}`
          : `Leaf Blight symptoms: ${info.symptoms}. Treatment: ${info.treatment}`;
      } else if (input.includes('mildew') || input.includes('मिल्ड्यू')) {
        const info = diseaseDatabase['powdery mildew'];
        botResponse = language === 'hindi'
          ? `पाउडरी मिल्ड्यू के लक्षण: ${info.hindi.symptoms}। उपचार: ${info.hindi.treatment}`
          : `Powdery Mildew symptoms: ${info.symptoms}. Treatment: ${info.treatment}`;
      } else if (input.includes('hello') || input.includes('hi') || input.includes('नमस्ते')) {
        botResponse = language === 'hindi'
          ? 'नमस्ते! मैं आपकी फसल की समस्याओं में मदद कर सकता हूं। कृपया अपना सवाल पूछें।'
          : 'Hello! I can help you with your crop problems. Please ask your question.';
      } else {
        botResponse = language === 'hindi'
          ? 'मुझे खुशी होगी आपकी मदद करने में। कृपया बीमारी के नाम या लक्षणों के बारे में पूछें।'
          : 'I would be happy to help you. Please ask about disease names or symptoms.';
      }

      const botMessage = { type: 'bot', text: botResponse, timestamp: new Date() };
      setChatMessages(prev => [...prev, botMessage]);
    }, 1000);

    setChatInput('');
  };

  const currentTexts = texts[language];

  const renderTabContent = () => {
    switch (activeTab) {
      case 'detection':
        return <DetectionTab 
          currentTexts={currentTexts}
          selectedImage={selectedImage}
          detectionResult={detectionResult}
          handleImageUpload={handleImageUpload}
          fileInputRef={fileInputRef}
        />;
      case 'chatbot':
        return <ChatbotTab 
          currentTexts={currentTexts}
          language={language}
          chatMessages={chatMessages}
          chatInput={chatInput}
          setChatInput={setChatInput}
          handleChatSubmit={handleChatSubmit}
        />;
      case 'analytics':
        return <AnalyticsTab 
          currentTexts={currentTexts}
          language={language}
          diseaseData={diseaseData}
          regionData={regionData}
        />;
      case 'home':
      default:
        return <HomeTab currentTexts={currentTexts} projectInfo={PROJECT_INFO} />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-green-50 to-teal-50">
      <Header 
        currentTexts={currentTexts}
        language={language}
        setLanguage={setLanguage}
      />
      <Navigation 
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        currentTexts={currentTexts}
      />
      <main className="container mx-auto px-4 py-8">
        {renderTabContent()}
      </main>
      <Footer currentTexts={currentTexts} />
    </div>
  );
};

export default App;
