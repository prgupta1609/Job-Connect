import React, { useState, useEffect } from 'react';
import Icon from '../AppIcon';

const NotificationToast = ({ 
  notifications = [], 
  onDismiss = () => {},
  position = 'top-right',
  autoHideDuration = 5000 
}) => {
  const [visibleNotifications, setVisibleNotifications] = useState([]);

  useEffect(() => {
    setVisibleNotifications(notifications);
  }, [notifications]);

  const handleDismiss = (id) => {
    setVisibleNotifications(prev => prev?.filter(notification => notification?.id !== id));
    onDismiss(id);
  };

  const getPositionClasses = () => {
    switch (position) {
      case 'top-left':
        return 'top-4 left-4';
      case 'top-center':
        return 'top-4 left-1/2 transform -translate-x-1/2';
      case 'top-right':
        return 'top-4 right-4';
      case 'bottom-left':
        return 'bottom-4 left-4';
      case 'bottom-center':
        return 'bottom-4 left-1/2 transform -translate-x-1/2';
      case 'bottom-right':
        return 'bottom-4 right-4';
      default:
        return 'top-4 right-4';
    }
  };

  const getTypeStyles = (type) => {
    switch (type) {
      case 'success':
        return {
          bg: 'bg-success',
          text: 'text-success-foreground',
          icon: 'CheckCircle'
        };
      case 'warning':
        return {
          bg: 'bg-warning',
          text: 'text-warning-foreground',
          icon: 'AlertTriangle'
        };
      case 'error':
        return {
          bg: 'bg-error',
          text: 'text-error-foreground',
          icon: 'AlertCircle'
        };
      case 'info':
      default:
        return {
          bg: 'bg-primary',
          text: 'text-primary-foreground',
          icon: 'Info'
        };
    }
  };

  if (visibleNotifications?.length === 0) return null;

  return (
    <div className={`fixed z-[1300] ${getPositionClasses()}`}>
      <div className="space-y-2 w-80 max-w-sm">
        {visibleNotifications?.map((notification) => {
          const styles = getTypeStyles(notification?.type);
          
          return (
            <ToastItem
              key={notification?.id}
              notification={notification}
              styles={styles}
              onDismiss={handleDismiss}
              autoHideDuration={autoHideDuration}
            />
          );
        })}
      </div>
    </div>
  );
};

const ToastItem = ({ notification, styles, onDismiss, autoHideDuration }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [isExiting, setIsExiting] = useState(false);

  useEffect(() => {
    // Trigger entrance animation
    const timer = setTimeout(() => setIsVisible(true), 10);
    
    // Auto-hide timer
    const autoHideTimer = setTimeout(() => {
      handleExit();
    }, autoHideDuration);

    return () => {
      clearTimeout(timer);
      clearTimeout(autoHideTimer);
    };
  }, [autoHideDuration]);

  const handleExit = () => {
    setIsExiting(true);
    setTimeout(() => {
      onDismiss(notification?.id);
    }, 300);
  };

  const handleClick = () => {
    if (notification?.onClick) {
      notification?.onClick();
    }
    handleExit();
  };

  return (
    <div
      className={`
        ${styles?.bg} ${styles?.text} rounded-lg shadow-modal border border-border
        transform transition-all duration-300 ease-out cursor-pointer
        ${isVisible && !isExiting 
          ? 'translate-x-0 opacity-100 scale-100' :'translate-x-full opacity-0 scale-95'
        }
        hover:scale-105 hover:shadow-lg
      `}
      onClick={handleClick}
    >
      <div className="p-4">
        <div className="flex items-start">
          <div className="flex-shrink-0">
            <Icon name={styles?.icon} size={20} />
          </div>
          
          <div className="ml-3 flex-1">
            {notification?.title && (
              <h4 className="text-sm font-semibold mb-1">
                {notification?.title}
              </h4>
            )}
            
            <p className="text-sm opacity-90">
              {notification?.message}
            </p>
            
            {notification?.timestamp && (
              <p className="text-xs opacity-70 mt-1">
                {new Date(notification.timestamp)?.toLocaleTimeString()}
              </p>
            )}
          </div>
          
          <button
            onClick={(e) => {
              e?.stopPropagation();
              handleExit();
            }}
            className="flex-shrink-0 ml-2 opacity-70 hover:opacity-100 transition-opacity duration-200"
          >
            <Icon name="X" size={16} />
          </button>
        </div>
        
        {notification?.actions && notification?.actions?.length > 0 && (
          <div className="mt-3 flex space-x-2">
            {notification?.actions?.map((action, index) => (
              <button
                key={index}
                onClick={(e) => {
                  e?.stopPropagation();
                  action?.onClick();
                  handleExit();
                }}
                className="text-xs px-3 py-1 rounded bg-white bg-opacity-20 hover:bg-opacity-30 transition-colors duration-200"
              >
                {action?.label}
              </button>
            ))}
          </div>
        )}
      </div>
      {/* Progress bar for auto-hide */}
      <div className="h-1 bg-black bg-opacity-20 rounded-b-lg overflow-hidden">
        <div 
          className="h-full bg-white bg-opacity-30 rounded-b-lg animate-progress"
          style={{
            animation: `progress ${autoHideDuration}ms linear`
          }}
        />
      </div>
    </div>
  );
};

export default NotificationToast;