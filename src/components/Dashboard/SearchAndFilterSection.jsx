import React, { useState } from 'react';
import { ChevronUp, ChevronDown, X } from 'lucide-react';
import BuyerIntentModal from './BuyerIntentModal';

const SearchAndFilterSection = ({ activeTab, isDarkMode, isVisible, toggleVisibility }) => {
  const [isBuyerIntentModalOpen, setIsBuyerIntentModalOpen] = useState(false);

  const filters = [
    { label: 'Job Titles', count: 1, options: ['CEO', 'CTO', 'Manager', 'Developer'] },
    { label: 'Company', count: 0, options: ['Startup', 'Enterprise', 'SMB'] },
    { label: 'Location', count: 0, options: ['USA', 'Europe', 'Asia'] },
    { label: '# Employees', count: 0, options: ['1-10', '11-50', '51-200', '201-500', '500+'] },
    { label: 'Industry & Keywords', count: 0, options: ['Technology', 'Finance', 'Healthcare', 'Education'] },
    { label: 'Buying Intent', count: 0, options: ['High', 'Medium', 'Low'] },
  ];

  const peopleFilters = [
    { label: 'Job Level', count: 0, options: ['C-Level', 'VP', 'Director', 'Manager'] },
    { label: 'Department', count: 0, options: ['Sales', 'Marketing', 'Engineering', 'HR'] },
  ];

  const companyFilters = [
    { label: 'Company Type', count: 0, options: ['Public', 'Private', 'Non-Profit'] },
    { label: 'Revenue', count: 0, options: ['$0-1M', '$1-10M', '$10-100M', '$100M+'] },
  ];

  const currentFilters = activeTab === 'people' ? [...filters, ...peopleFilters] : [...filters, ...companyFilters];

  return (
    <div className={`${isDarkMode ? 'bg-gray-800 text-white' : 'bg-white'} p-4 rounded-md shadow mb-4 transition-all duration-300 ${isVisible ? '' : 'h-16 overflow-hidden'}`}>
      <div className="flex justify-between items-center mb-4">
        <div>
          <span className="font-bold">Search and Filters</span>
          <span className={`ml-2 ${isDarkMode ? 'bg-gray-700 text-gray-300' : 'bg-gray-200 text-gray-800'} px-2 py-1 rounded-full text-sm`}>2</span>
        </div>
        <button 
          className={`text-blue-500 flex items-center ${isDarkMode ? 'text-blue-400' : ''}`} 
          onClick={toggleVisibility}
        >
          {isVisible ? (
            <>Hide <ChevronUp size={16} className="ml-1" /></>
          ) : (
            <>Show Filters <ChevronDown size={16} className="ml-1" /></>
          )}
        </button>
      </div>
      {isVisible && (
        <>
          <div className="mb-4">
            <input type="text" placeholder={`Search ${activeTab}...`} className={`w-full border rounded-md px-3 py-2 ${isDarkMode ? 'bg-gray-700 text-white border-gray-600' : 'bg-white text-gray-800 border-gray-300'}`} />
          </div>
          <div className="mb-4 flex items-center">
            <span className={`${isDarkMode ? 'bg-gray-700 text-gray-300' : 'bg-gray-200 text-gray-700'} px-2 py-1 rounded-full text-sm mr-2`}>Likely to engage</span>
            <X size={16} className={`${isDarkMode ? 'text-gray-400' : 'text-gray-500'} cursor-pointer`} />
          </div>
          {currentFilters.map((filter) => (
            <div key={filter.label} className="mb-4">
              <label className={`block text-sm font-medium ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                {filter.label}
                {filter.label === 'Buying Intent' && (
                  <button
                    onClick={() => setIsBuyerIntentModalOpen(true)}
                    className="ml-2 text-blue-500"
                  >
                    Edit
                  </button>
                )}
              </label>
              <select className={`mt-1 block w-full pl-3 pr-10 py-2 text-base ${isDarkMode ? 'bg-gray-700 text-white border-gray-600' : 'border-gray-300 text-gray-900'} focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md`}>
                <option>Select {filter.label}</option>
                {filter.options.map((option) => (
                  <option key={option} value={option}>{option}</option>
                ))}
              </select>
            </div>
          ))}
          <button className={`w-full ${isDarkMode ? 'bg-blue-600 hover:bg-blue-700' : 'bg-blue-500 hover:bg-blue-600'} text-white py-2 rounded-md mt-4 transition-colors duration-300`}>Save Search</button>
        </>
      )}
      <BuyerIntentModal
        isOpen={isBuyerIntentModalOpen}
        onClose={() => setIsBuyerIntentModalOpen(false)}
        isDarkMode={isDarkMode}
      />
    </div>
  );
};

export default SearchAndFilterSection;
