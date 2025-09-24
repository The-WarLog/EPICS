// HomeTab.jsx
import React from 'react';
import { Camera, MessageCircle, BarChart3, Shield } from 'lucide-react';

const FeatureCard = ({ icon, title, description, language }) => (
  <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100 hover:shadow-xl transition-shadow">
    <div className="flex items-center justify-center w-12 h-12 bg-blue-100 rounded-lg mb-4">
      {icon}
    </div>
    <h3 className="text-lg font-semibold text-gray-800 mb-2">{title}</h3>
    <p className="text-gray-600 text-sm">{description}</p>
  </div>
);

const HomeTab = ({ currentTexts, projectInfo, language }) => {
  return (
    <div className="space-y-8">
      <div className="bg-white rounded-2xl shadow-lg p-6 md:p-8 border border-blue-100">
        <div className="text-center max-w-4xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-4">
            {language === 'hindi' ? 'किसानों के लिए स्मार्ट समाधान' : 'Smart Solution for Farmers'}
          </h2>
          <p className="text-gray-600 text-lg leading-relaxed mb-6">
            {currentTexts.description}
          </p>
          <div className="bg-gradient-to-r from-blue-50 to-teal-50 rounded-xl p-6 mb-6">
            <h3 className="text-xl font-semibold text-gray-800 mb-4">Project Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-left">
              <div><strong>Project Name:</strong> {projectInfo.name}</div>
              <div><strong>Programming Language:</strong> {projectInfo.language}</div>
              <div><strong>Specific Diseases:</strong> {projectInfo.diseases.join(', ')}</div>
              <div><strong>Chatbot Features:</strong> {projectInfo.chatbotFeatures.join(', ')}</div>
              <div className="md:col-span-2"><strong>Data Interactivity:</strong> {projectInfo.dataInteractivity.join(', ')}</div>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <FeatureCard
          icon={<Camera className="h-6 w-6 text-blue-600" />}
          title={currentTexts.features.detection}
          description={language === 'hindi' ? 'उन्नत AI तकनीक से तत्काल बीमारी पहचान' : 'Instant disease identification using advanced AI technology'}
          language={language}
        />
        <FeatureCard
          icon={<MessageCircle className="h-6 w-6 text-green-600" />}
          title={currentTexts.features.chat}
          description={language === 'hindi' ? '24/7 उपलब्ध स्मार्ट सहायक' : '24/7 available smart assistant'}
          language={language}
        />
        <FeatureCard
          icon={<BarChart3 className="h-6 w-6 text-teal-600" />}
          title={currentTexts.features.analytics}
          description={language === 'hindi' ? 'विस्तृत डेटा विश्लेषण और रिपोर्ट्स' : 'Detailed data analysis and reports'}
          language={language}
        />
        <FeatureCard
          icon={<Shield className="h-6 w-6 text-purple-600" />}
          title={language === 'hindi' ? 'फसल सुरक्षा' : 'Crop Protection'}
          description={language === 'hindi' ? 'निवारक उपायों की सिफारिश' : 'Preventive measures recommendations'}
          language={language}
        />
      </div>
    </div>
  );
};

export default HomeTab;
