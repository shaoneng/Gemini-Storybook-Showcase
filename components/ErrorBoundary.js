import React from 'react';
import { useTranslation } from 'next-i18next';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error('Error caught by boundary:', error, errorInfo);
    
    // 发送错误报告到 Google Analytics
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', 'exception', {
        description: error.toString(),
        fatal: false,
        errorInfo: JSON.stringify(errorInfo)
      });
    }
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50">
          <div className="max-w-md w-full bg-white rounded-lg shadow-lg p-6 text-center">
            <div className="text-red-500 text-6xl mb-4">⚠️</div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">
              {this.props.locale === 'en' ? 'Something went wrong' : '出现了一些问题'}
            </h2>
            <p className="text-gray-600 mb-4">
              {this.props.locale === 'en' 
                ? 'We apologize for the inconvenience. Please try refreshing the page.'
                : '很抱歉给您带来不便，请尝试刷新页面。'
              }
            </p>
            <button
              onClick={() => window.location.reload()}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              {this.props.locale === 'en' ? 'Refresh Page' : '刷新页面'}
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;