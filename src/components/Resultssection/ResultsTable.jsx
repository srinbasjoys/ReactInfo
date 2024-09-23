import React, { useState } from 'react';
import { Linkedin, Check, Mail, Phone } from 'lucide-react';

const ResultsTable = ({ results, openProfileModal, openCompanyModal, handleSave, isDarkMode, activeTab }) => {
  const [selectedItems, setSelectedItems] = useState([]);
  const [selectAll, setSelectAll] = useState(false);
  const [customSelectCount, setCustomSelectCount] = useState('');

  const handleSelectAll = () => {
    if (selectAll) {
      setSelectedItems([]);
    } else {
      setSelectedItems(results.map(item => item.id));
    }
    setSelectAll(!selectAll);
  };

  const handleSelectItem = (id) => {
    setSelectedItems(prev => 
      prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
    );
  };

  const handleCustomSelect = () => {
    const count = parseInt(customSelectCount);
    if (!isNaN(count) && count > 0 && count <= results.length) {
      setSelectedItems(results.slice(0, count).map(item => item.id));
    }
  };

  return (
    <div className="overflow-x-auto">
      <div className="mb-4 flex items-center">
        <input
          type="checkbox"
          checked={selectAll}
          onChange={handleSelectAll}
          className="mr-2"
        />
        <span>Select All</span>
        <input
          type="number"
          value={customSelectCount}
          onChange={(e) => setCustomSelectCount(e.target.value)}
          placeholder="Custom select count"
          className="ml-4 px-2 py-1 border rounded"
        />
        <button 
          onClick={handleCustomSelect}
          className="ml-2 px-2 py-1 bg-blue-500 text-white rounded"
        >
          Select
        </button>
      </div>
      <table className="w-full">
        <thead>
          <tr className={isDarkMode ? 'bg-gray-700' : 'bg-gray-50'}>
            <th className="p-2 text-left">Select</th>
            <th className="p-2 text-left">{activeTab === 'people' ? 'Name' : 'Company'}</th>
            <th className="p-2 text-left">{activeTab === 'people' ? 'Title' : 'Industry'}</th>
            <th className="p-2 text-left">{activeTab === 'people' ? 'Company' : 'Size'}</th>
            <th className="p-2 text-left">Quick Actions</th>
            <th className="p-2 text-left">Email</th>
            <th className="p-2 text-left">Phone</th>
            <th className="p-2 text-left">Location</th>
            <th className="p-2 text-left">Save</th>
          </tr>
        </thead>
        <tbody>
          {results.map((result) => (
            <ResultRow
              key={result.id}
              result={result}
              openProfileModal={openProfileModal}
              openCompanyModal={openCompanyModal}
              handleSave={handleSave}
              isDarkMode={isDarkMode}
              activeTab={activeTab}
              isSelected={selectedItems.includes(result.id)}
              onSelect={() => handleSelectItem(result.id)}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
};

const ResultRow = ({ result, openProfileModal, openCompanyModal, handleSave, isDarkMode, activeTab, isSelected, onSelect }) => {
  const [showEmail, setShowEmail] = useState(false);
  const [showPhone, setShowPhone] = useState(false);

  const maskEmail = (email) => {
    if (!email) return '';
    const [localPart, domain] = email.split('@');
    return `${localPart.slice(0, 2)}xxxx@${domain.slice(0, 2)}xxxx.com`;
  };

  const maskPhone = (phone) => {
    if (!phone) return '';
    return `${phone.slice(0, 4)}xxxxx`;
  };

  const getIconColor = (isShowing) => {
    if (isDarkMode) {
      return isShowing ? 'text-blue-400' : 'text-gray-300 hover:text-gray-100';
    } else {
      return isShowing ? 'text-blue-600' : 'text-gray-500 hover:text-gray-700';
    }
  };

  return (
    <tr className={`border-t ${isDarkMode ? 'border-gray-700' : 'border-gray-200'}`}>
      <td className="p-2">
        <input type="checkbox" checked={isSelected} onChange={onSelect} />
      </td>
      <td className="p-2">
        <div className="flex items-center whitespace-nowrap">
          <button onClick={() => activeTab === 'people' ? openProfileModal(result) : openCompanyModal(result)} className="text-blue-500 hover:underline">
            {activeTab === 'people' ? result.name : result.name}
          </button>
        </div>
      </td>
      <td className="p-2 whitespace-nowrap">{activeTab === 'people' ? result.title : result.industry}</td>
      <td className="p-2">
        <div className="flex items-center whitespace-nowrap">
          <Linkedin className="text-blue-500 mr-2" size={16} />
          <span className="mr-2">{result.logo}</span>
          {activeTab === 'people' ? (
            <button 
              onClick={() => openCompanyModal({ 
                name: result.company, 
                industry: 'Unknown', 
                size: 'Unknown',     
              })} 
              className="text-blue-500 hover:underline"
            >
              {result.company}
            </button>
          ) : (
            result.size
          )}
        </div>
      </td>
      <td className="p-2 whitespace-nowrap">
        {activeTab === 'people' && (
                    <>
                    {result.email && (
                      <button 
                        className={`mr-2 ${getIconColor(showEmail)}`}
                        onClick={() => setShowEmail(!showEmail)}
                        title={showEmail ? "Hide Email" : "Show Email"}
                      >
                        <Mail size={16} />
                      </button>
                    )}
                    {result.phone && (
                      <button 
                        className={getIconColor(showPhone)}
                        onClick={() => setShowPhone(!showPhone)}
                        title={showPhone ? "Hide Phone" : "Show Phone"}
                      >
                        <Phone size={16} />
                      </button>
                    )}
                  </>
        )}
      </td>
      <td className="p-2 whitespace-nowrap">
        {activeTab === 'people' && result.email ? (showEmail ? result.email : maskEmail(result.email)) : ''}
      </td>
      <td className="p-2 whitespace-nowrap">
        {activeTab === 'people' && result.phone ? (showPhone ? result.phone : maskPhone(result.phone)) : ''}
      </td>
      <td className="p-2 whitespace-nowrap">{result.location || '-'}</td>
      <td className="p-2">
        <button onClick={() => handleSave(result)}>
          {result.saved ? <Check size={16} className="text-green-500" /> : 'Save'}
        </button>
      </td>
    </tr>
  );
};

export default ResultsTable;