// ToastContext.js
import React, { createContext, useContext, useState } from 'react';
import { CheckCircle, XCircle, AlertCircle, InfoIcon, X } from 'lucide-react';

const ToastContext = createContext();

export function ToastProvider({ children }) {
  const [toasts, setToasts] = useState([]);

  const addToast = (message, type = 'success') => {
    const id = Date.now();
    setToasts((prevToasts) => [...prevToasts, { id, message, type }]);
    setTimeout(() => {
      setToasts((prevToasts) => prevToasts.filter((toast) => toast.id !== id));
    }, 4000);
  };

  const removeToast = (id) => {
    setToasts((prevToasts) => prevToasts.filter((toast) => toast.id !== id));
  };

  // Helper function to get the right icon and colors
  const getToastProps = (type) => {
    switch (type) {
      case 'success':
        return {
          icon: <CheckCircle className="w-6 h-6 text-green-500" />,
          borderColor: 'border-green-500',
          textColor: 'text-green-900'
        };
      case 'error':
        return {
          icon: <XCircle className="w-6 h-6 text-red-500" />,
          borderColor: 'border-red-500',
          textColor: 'text-red-900'
        };
      case 'info':
        return {
          icon: <InfoIcon className="w-6 h-6 text-blue-500" />,
          borderColor: 'border-blue-500',
          textColor: 'text-blue-900'
        };
      case 'update':
        return {
          icon: <CheckCircle className="w-6 h-6 text-purple-500" />,
          borderColor: 'border-purple-500',
          textColor: 'text-purple-900'
        };
      case 'warning':
        return {
          icon: <AlertCircle className="w-6 h-6 text-yellow-500" />,
          borderColor: 'border-yellow-500',
          textColor: 'text-yellow-900'
        };
      default:
        return {
          icon: <CheckCircle className="w-6 h-6 text-green-500" />,
          borderColor: 'border-green-500',
          textColor: 'text-green-900'
        };
    }
  };

  return (
    <ToastContext.Provider value={{ addToast }}>
      {children}
      <div className="fixed top-0 left-0 right-0 flex flex-col items-center z-50 pointer-events-none">
        <div className="space-y-4 mt-4 max-w-md w-full pointer-events-auto">
          {toasts.map((toast) => {
            const { icon, borderColor, textColor } = getToastProps(toast.type);
            
            return (
              <div
                key={toast.id}
                className={`mx-4 flex items-center p-4 rounded-xl shadow-lg transform transition-all duration-500 ease-in-out 
                  bg-white bg-opacity-95 border-b-4 ${borderColor} animate-slide-down`}
                style={{
                  backdropFilter: 'blur(8px)',
                  WebkitBackdropFilter: 'blur(8px)'
                }}
              >
                <div className="flex-shrink-0 mr-3">
                  {icon}
                </div>
                <div className="flex-1 mr-2">
                  <p className={`text-sm font-medium ${textColor}`}>
                    {toast.message}
                  </p>
                </div>
                <button
                  onClick={() => removeToast(toast.id)}
                  className="flex-shrink-0 ml-auto -mx-1.5 -my-1.5 p-1.5 rounded-full hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-300"
                >
                  <X className="w-4 h-4 text-gray-500" />
                </button>
              </div>
            );
          })}
        </div>
      </div>

      {/* Add the animation CSS */}
      <style jsx>{`
        @keyframes slide-down {
          from {
            transform: translateY(-100%);
            opacity: 0;
          }
          to {
            transform: translateY(0);
            opacity: 1;
          }
        }
        .animate-slide-down {
          animation: slide-down 0.3s ease-out forwards;
        }
      `}</style>
    </ToastContext.Provider>
  );
}

export const useToast = () => useContext(ToastContext);