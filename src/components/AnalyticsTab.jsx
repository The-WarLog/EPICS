// AnalyticsTab.jsx
import React from 'react';
import { TrendingUp, Leaf, AlertTriangle, Users } from 'lucide-react';
import DiseaseTrendChart from './charts/DiseaseTrendChart';
import RegionalDistributionChart from './charts/RegionalDistributionChart';
import MonthlyDetectionsChart from './charts/MonthlyDetectionsChart';

const StatCard = ({ title, value, icon, colorClass }) => (
  <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
    <div className="flex items-center justify-between">
      <div>
        <p className="text-sm text-gray-600">{title}</p>
        <p className={`text-2xl font-bold ${colorClass}`}>{value}</p>
      </div>
      {icon}
    </div>
  </div>
);

const AnalyticsTab = ({ currentTexts, language, diseaseData, regionData }) => {
  return (
    <div className="space-y-8">
      <h2 className="text-2xl font-bold text-center text-gray-800">
        {language === 'hindi' ? 'डेटा विश्लेषण डैशबोर्ड' : 'Data Analytics Dashboard'}
      </h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard title={language === 'hindi' ? 'कुल स्कैन' : 'Total Scans'} value="1,247" icon={<TrendingUp className="h-8 w-8 text-blue-500" />} colorClass="text-blue-600" />
        <StatCard title={language === 'hindi' ? 'स्वस्थ पौधे' : 'Healthy Plants'} value="892" icon={<Leaf className="h-8 w-8 text-green-500" />} colorClass="text-green-600" />
        <StatCard title={language === 'hindi' ? 'बीमार पौधे' : 'Diseased Plants'} value="355" icon={<AlertTriangle className="h-8 w-8 text-red-500" />} colorClass="text-red-600" />
        <StatCard title={language === 'hindi' ? 'सक्रिय उपयोगकर्ता' : 'Active Users'} value="2,143" icon={<Users className="h-8 w-8 text-purple-500" />} colorClass="text-purple-600" />
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
        <DiseaseTrendChart data={diseaseData} title={language === 'hindi' ? 'बीमारी का रुझान (2024)' : 'Disease Trends (2024)'} />
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-1 gap-8">
            <RegionalDistributionChart data={regionData} title={language === 'hindi' ? 'क्षेत्रीय वितरण' : 'Regional Distribution'}/>
            <MonthlyDetectionsChart data={diseaseData} title={language === 'hindi' ? 'मासिक पहचान' : 'Monthly Detections'} />
        </div>
      </div>
    </div>
  );
};

export default AnalyticsTab;
