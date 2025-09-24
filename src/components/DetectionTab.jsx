// DetectionTab.jsx
import React from 'react';
import { Upload } from 'lucide-react';

const DetectionTab = ({ currentTexts, selectedImage, detectionResult, handleImageUpload, fileInputRef }) => {
  return (
    <div className="max-w-4xl mx-auto">
      <div className="bg-white rounded-2xl shadow-lg p-6 md:p-8 border border-blue-100">
        <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
          {currentTexts.language === 'hindi' ? 'बीमारी पहचान सिस्टम' : 'Disease Detection System'}
        </h2>
        
        <div className="border-2 border-dashed border-blue-300 rounded-xl p-8 text-center mb-6">
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleImageUpload}
            accept="image/*"
            className="hidden"
          />
          <Upload className="h-12 w-12 text-blue-400 mx-auto mb-4" />
          <p className="text-gray-600 mb-4">
            {currentTexts.language === 'hindi' ? 'पौधे की पत्ती की तस्वीर अपलोड करें' : 'Upload an image of the plant leaf'}
          </p>
          <button
            onClick={() => fileInputRef.current?.click()}
            className="bg-gradient-to-r from-blue-500 to-teal-500 text-white px-6 py-3 rounded-lg hover:from-blue-600 hover:to-teal-600 transition-all font-medium"
          >
            {currentTexts.features.upload}
          </button>
        </div>

        {selectedImage && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div>
              <h3 className="text-lg font-semibold mb-4">{currentTexts.language === 'hindi' ? 'अपलोड की गई तस्वीर' : 'Uploaded Image'}</h3>
              <img src={selectedImage} alt="Uploaded plant" className="w-full h-64 object-cover rounded-lg border-2 border-blue-200" />
            </div>
            
            <div>
              <h3 className="text-lg font-semibold mb-4">{currentTexts.language === 'hindi' ? 'पहचान परिणाम' : 'Detection Results'}</h3>
              {detectionResult ? (
                <div className="space-y-4">
                  <div className="bg-gradient-to-r from-blue-50 to-teal-50 p-4 rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-medium">{currentTexts.language === 'hindi' ? 'निदान:' : 'Diagnosis:'}</span>
                      <span className={`font-bold ${detectionResult.disease === 'Healthy' ? 'text-green-600' : 'text-red-600'}`}>{detectionResult.disease}</span>
                    </div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-medium">{currentTexts.language === 'hindi' ? 'विश्वास:' : 'Confidence:'}</span>
                      <span className="font-bold text-blue-600">{detectionResult.confidence}%</span>
                    </div>
                    <div className="flex items-center justify-between mb-4">
                      <span className="font-medium">{currentTexts.language === 'hindi' ? 'गंभीरता:' : 'Severity:'}</span>
                      <span className={`font-bold ${detectionResult.severity === 'High' ? 'text-red-600' : detectionResult.severity === 'Medium' ? 'text-yellow-600' : 'text-green-600'}`}>{detectionResult.severity}</span>
                    </div>
                    <div className="bg-white p-3 rounded border">
                      <h4 className="font-medium mb-2">{currentTexts.language === 'hindi' ? 'सिफारिशें:' : 'Recommendations:'}</h4>
                      <p className="text-sm text-gray-700">{detectionResult.recommendations}</p>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="flex items-center justify-center h-32">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
                  <span className="ml-3 text-gray-600">{currentTexts.language === 'hindi' ? 'विश्लेषण हो रहा है...' : 'Analyzing...'}</span>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default DetectionTab;
