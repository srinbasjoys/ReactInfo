
import React from 'react';
import { CheckSquare } from 'lucide-react';

const UpgradeBanner = ({ isDarkMode }) => {
  return (
    <div className={`${isDarkMode ? 'bg-gray-800' : 'bg-white'} p-4 rounded-md shadow mb-4`}>
      <h2 className="font-bold mb-2">Need more pipeline? Upgrade now for advanced features.</h2>
      <div className="flex flex-wrap space-x-4">
        <span className="flex items-center"><CheckSquare className="text-green-500 mr-1" size={16} /> Advanced Filters</span>
        <span className="flex items-center"><CheckSquare className="text-green-500 mr-1" size={16} /> Find mobile numbers</span>
        <span className="flex items-center"><CheckSquare className="text-green-500 mr-1" size={16} /> Push to CRM</span>
      </div>
      <button className={`${isDarkMode ? 'bg-blue-600 hover:bg-blue-700' : 'bg-blue-500 hover:bg-blue-600'} text-white px-4 py-1 rounded-md mt-2 transition-colors duration-300`}>View Plans</button>
    </div>
  );
};

export default UpgradeBanner;
