import React, { useState } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { XIcon as XMarkIcon } from '@heroicons/react/outline'

const SequenceStepModal = ({ isOpen, onClose, isDarkMode, onStepSelect }) => {
  const [selectedStep, setSelectedStep] = useState(null);
  const [showDetails, setShowDetails] = useState(false);

  const steps = [
    { id: 'automatic-email', name: 'Automatic email', description: 'Emails are delivered automatically.', icon: '📧', category: 'Automatic' },
    { id: 'manual-email', name: 'Manual email', description: 'Task is created to edit and deliver email.', icon: '✉️', category: 'Tasks' },
    { id: 'phone-call', name: 'Phone call', description: 'Task is created to call prospect.', icon: '📞', category: 'Tasks' },
    { id: 'action-item', name: 'Action item', description: 'Task is created to perform custom action.', icon: '✅', category: 'Tasks' },
    { id: 'linkedin-connect', name: 'LinkedIn - Send connection request', description: 'Send personalized invitations to connect with contacts for a positive first impression.', icon: 'in', category: 'LinkedIn tasks' },
    { id: 'linkedin-message', name: 'LinkedIn - Send message', description: 'Send personalized direct messages to contacts youre connected with to build relationships.', icon: 'in', category: 'LinkedIn tasks' },
    { id: 'linkedin-view', name: 'LinkedIn - View profile', description: 'View a contacts LinkedIn profile to gather key information for more effective engagement.', icon: 'in', category: 'LinkedIn tasks' },
    { id: 'linkedin-interact', name: 'LinkedIn - Interact with post', description: 'View a contacts activities and interact with their recent posts to foster engagement and boost visibility.', icon: 'in', category: 'LinkedIn tasks' },
  ];

  const handleStepSelect = (step) => {
    setSelectedStep(step);
    setShowDetails(true);
  };

  const handleBack = () => {
    setShowDetails(false);
    setSelectedStep(null);
  };

  const handleContinue = () => {
    onStepSelect(selectedStep);
    onClose();
  };

  const renderStepList = () => (
    <div className="space-y-4">
      {Object.entries(steps.reduce((acc, step) => {
        (acc[step.category] = acc[step.category] || []).push(step);
        return acc;
      }, {})).map(([category, categorySteps]) => (
        <div key={category}>
          <h3 className={`text-lg font-semibold mb-2 ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>{category}</h3>
          <div className="space-y-2">
            {categorySteps.map((step) => (
              <button
                key={step.id}
                className={`w-full text-left p-3 rounded-lg flex items-center space-x-3 ${
                  isDarkMode ? 'bg-gray-800 hover:bg-gray-700' : 'bg-white hover:bg-gray-50'
                } transition-colors duration-200`}
                onClick={() => handleStepSelect(step)}
              >
                <span className="text-2xl">{step.icon}</span>
                <div>
                  <p className={`font-medium ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>{step.name}</p>
                  <p className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-500'}`}>{step.description}</p>
                </div>
              </button>
            ))}
          </div>
        </div>
      ))}
    </div>
  );

  const renderStepDetails = () => {
    if (!selectedStep) return null;

    const commonInputClass = `w-full p-2 rounded-md ${
      isDarkMode ? 'bg-gray-700 text-white' : 'bg-white text-gray-900'
    } border ${isDarkMode ? 'border-gray-600' : 'border-gray-300'}`;

    return (
      <div className="space-y-4">
        <h2 className={`text-xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>{selectedStep.name}</h2>
        <div>
          <label className={`block mb-1 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
            When to start this step:
          </label>
          <div className="flex items-center space-x-2">
            <input
              type="radio"
              id="immediately"
              name="start-time"
              className={commonInputClass}
            />
            <label htmlFor="immediately" className={isDarkMode ? 'text-white' : 'text-gray-900'}>
              Immediately after the contact is added to sequence
            </label>
          </div>
          <div className="flex items-center space-x-2 mt-2">
            <input
              type="radio"
              id="after-delay"
              name="start-time"
              className={commonInputClass}
              defaultChecked
            />
            <input
              type="number"
              defaultValue="30"
              className={`${commonInputClass} w-20`}
            />
            <select className={commonInputClass}>
              <option>minutes</option>
              <option>hours</option>
              <option>days</option>
            </select>
            <span className={isDarkMode ? 'text-white' : 'text-gray-900'}>after the contact is added</span>
          </div>
        </div>
        {selectedStep.id === 'manual-email' && (
          <div>
            <label className={`block mb-1 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
              Assign task priority
            </label>
            <div className="flex space-x-2">
              {['High priority', 'Medium priority', 'Low priority'].map((priority) => (
                <button
                  key={priority}
                  className={`px-4 py-2 rounded-md ${
                    priority === 'Medium priority'
                      ? 'bg-blue-500 text-white'
                      : isDarkMode
                      ? 'bg-gray-700 text-white'
                      : 'bg-gray-200 text-gray-800'
                  }`}
                >
                  {priority}
                </button>
              ))}
            </div>
          </div>
        )}
        <div>
          <label className={`block mb-1 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
            Add note
          </label>
          <textarea
            className={`${commonInputClass} h-24`}
            placeholder="Add a description, purpose or goal for the task"
          ></textarea>
        </div>
        <div>
          <button
            className={`w-full p-2 text-left ${isDarkMode ? 'text-gray-300 hover:text-white' : 'text-gray-600 hover:text-gray-900'}`}
            onClick={() => setShowAdvanced((prev) => !prev)}
          >
            Advanced settings
          </button>
        </div>
      </div>
    );
  };

  return (
    <Transition.Root show={isOpen} as={React.Fragment}>
      <Dialog
        as="div"
        className="fixed inset-0 z-10 overflow-y-auto"
        onClose={onClose}
      >
        <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
          <Transition.Child
            as={React.Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Dialog.Overlay className="fixed inset-0 bg-black bg-opacity-30 transition-opacity" />
          </Transition.Child>

          <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">
            &#8203;
          </span>
          
          <Transition.Child
            as={React.Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            enterTo="opacity-100 translate-y-0 sm:scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 translate-y-0 sm:scale-100"
            leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
          >
            <div className={`inline-block align-bottom rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full ${
              isDarkMode ? 'bg-gray-900' : 'bg-white'
            }`}>
              <div className={`px-4 pt-5 pb-4 sm:p-6 sm:pb-4 ${isDarkMode ? 'bg-gray-900' : 'bg-white'}`}>
                <div className="sm:flex sm:items-start">
                  <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left w-full">
                    <Dialog.Title as="h3" className={`text-lg leading-6 font-medium ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                      Select a sequence step
                    </Dialog.Title>
                    <div className="mt-2">
                      {showDetails ? renderStepDetails() : renderStepList()}
                    </div>
                  </div>
                </div>
              </div>
              <div className={`px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse ${isDarkMode ? 'bg-gray-800' : 'bg-gray-50'}`}>
                <button
                  type="button"
                  className={`w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 text-base font-medium text-white sm:ml-3 sm:w-auto sm:text-sm ${
                    showDetails ? 'bg-blue-600 hover:bg-blue-700' : 'bg-gray-300 cursor-not-allowed'
                  }`}
                  onClick={showDetails ? handleContinue : onClose}
                >
                  {showDetails ? 'Continue' : 'Cancel'}
                </button>
                {showDetails && (
                  <button
                    type="button"
                    className={`mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 text-base font-medium sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm ${
                      isDarkMode ? 'bg-gray-700 text-white hover:bg-gray-600' : 'bg-white text-gray-700 hover:bg-gray-50'
                    }`}
                    onClick={handleBack}
                  >
                    Back
                  </button>
                )}
              </div>
            </div>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition.Root>
  );
};

export default SequenceStepModal;