import { useState } from 'react';

const AlertsList = ({ alerts, title = "Active Alerts" }) => {
  const [filter, setFilter] = useState('all'); // all, high, medium, resolved

  if (!alerts || alerts.length === 0) {
    return (
      <div className="bg-white dark:bg-primary rounded-xl p-6 shadow-lg border dark:border-gray-700">
        <h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">{title}</h3>
        <div className="flex items-center justify-center h-32">
          <div className="text-center">
            <div className="w-16 h-16 bg-success/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-success" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <p className="text-success font-medium">All systems normal</p>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">No active alerts or faults detected</p>
          </div>
        </div>
      </div>
    );
  }

  const filteredAlerts = alerts.filter(alert => {
    if (filter === 'all') return true;
    if (filter === 'resolved') return alert.resolved;
    if (filter === 'high') return alert.severity === 'High' && !alert.resolved;
    if (filter === 'medium') return alert.severity === 'Medium' && !alert.resolved;
    return true;
  });

  const getSeverityColor = (severity, resolved) => {
    if (resolved) return 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400';
    
    switch (severity) {
      case 'High':
        return 'bg-error text-white';
      case 'Medium':
        return 'bg-warning text-white';
      case 'Low':
        return 'bg-blue-500 text-white';
      default:
        return 'bg-gray-500 text-white';
    }
  };

  const getSeverityIcon = (severity, resolved) => {
    if (resolved) {
      return (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
        </svg>
      );
    }

    switch (severity) {
      case 'High':
        return (
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
          </svg>
        );
      case 'Medium':
        return (
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
          </svg>
        );
      default:
        return (
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
          </svg>
        );
    }
  };

  const getAlertTypeIcon = (type) => {
    switch (type) {
      case 'Overheat':
        return (
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 18.657A8 8 0 016.343 7.343S7 9 9 10c0-2 .5-5 2.986-7C14 5 16.09 5.777 17.656 7.343A7.975 7.975 0 0120 13a7.975 7.975 0 01-2.343 5.657z" />
          </svg>
        );
      case 'Overvoltage':
      case 'Undervoltage':
        return (
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
          </svg>
        );
      case 'Short Circuit':
        return (
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        );
      default:
        return (
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        );
    }
  };

  return (
    <div className="bg-white dark:bg-primary rounded-xl shadow-lg border dark:border-gray-700">
      {/* Header with filters */}
      <div className="p-6 border-b dark:border-gray-700">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 sm:mb-0">
            {title} ({filteredAlerts.length})
          </h3>
          
          <div className="flex space-x-2">
            {['all', 'high', 'medium', 'resolved'].map((filterType) => (
              <button
                key={filterType}
                onClick={() => setFilter(filterType)}
                className={`px-3 py-1 text-sm rounded-full transition-colors ${
                  filter === filterType
                    ? 'bg-accent text-white'
                    : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600'
                }`}
              >
                {filterType.charAt(0).toUpperCase() + filterType.slice(1)}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Alerts list */}
      <div className="p-6">
        {filteredAlerts.length === 0 ? (
          <p className="text-center text-gray-500 dark:text-gray-400 py-8">
            No alerts match the current filter
          </p>
        ) : (
          <div className="space-y-4">
            {filteredAlerts.map((alert, index) => (
              <div
                key={alert.id || index}
                className={`p-4 rounded-lg border-l-4 ${
                  alert.resolved
                    ? 'border-gray-400 bg-gray-50 dark:bg-gray-800'
                    : alert.severity === 'High'
                    ? 'border-error bg-error/5 dark:bg-error/10'
                    : alert.severity === 'Medium'
                    ? 'border-warning bg-warning/5 dark:bg-warning/10'
                    : 'border-blue-500 bg-blue-50 dark:bg-blue-900/20'
                } transition-all duration-200 hover:shadow-md`}
              >
                <div className="flex items-start space-x-4">
                  <div className={`p-2 rounded-full ${getSeverityColor(alert.severity, alert.resolved)}`}>
                    {getSeverityIcon(alert.severity, alert.resolved)}
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <h4 className="text-sm font-semibold text-gray-900 dark:text-white">
                          {alert.type}
                        </h4>
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getSeverityColor(alert.severity, alert.resolved)}`}>
                          {alert.resolved ? 'Resolved' : alert.severity}
                        </span>
                      </div>
                      <div className="text-gray-400">
                        {getAlertTypeIcon(alert.type)}
                      </div>
                    </div>
                    
                    <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                      {alert.message}
                    </p>
                    
                    <div className="flex items-center justify-between mt-3">
                      <p className="text-xs text-gray-500 dark:text-gray-500">
                        {alert.timestamp}
                      </p>
                      
                      {!alert.resolved && (
                        <button className="text-xs text-accent hover:text-accent/80 font-medium">
                          Mark as Resolved
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default AlertsList;
