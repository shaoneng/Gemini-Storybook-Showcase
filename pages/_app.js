// 文件路径: /pages/_app.js
import '../styles/globals.css';
import { appWithTranslation } from 'next-i18next';
import Layout from '../components/Layout';
import Script from 'next/script';
import { useEffect } from 'react';
import { useReportWebVitals } from 'next/web-vitals';

const MyApp = ({ Component, pageProps }) => {
  // Web Vitals 监控
  useReportWebVitals((metric) => {
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', 'web_vital', {
        event_category: 'Web Vitals',
        event_label: metric.name,
        value: Math.round(metric.value),
        non_interaction: true,
      });
    }
  });

  // 初始化Google Analytics
  useEffect(() => {
    if (typeof window !== 'undefined') {
      window.dataLayer = window.dataLayer || [];
      function gtag() {
        window.dataLayer.push(arguments);
      }
      gtag('js', new Date());
      gtag('config', 'G-49WRVFC2QQ');
      
      // 将gtag函数设为全局可用
      window.gtag = gtag;
    }
  }, []);

  return (
    <>
      {/* Google Analytics Script */}
      <Script
        src="https://www.googletagmanager.com/gtag/js?id=G-49WRVFC2QQ"
        strategy="afterInteractive"
      />
      
      {/* Google AdSense Script */}
      <Script
        src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-9886602787991072"
        strategy="afterInteractive"
        crossOrigin="anonymous"
      />
      
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </>
  );
};

// 恢复为标准用法，不带第二个参数
export default appWithTranslation(MyApp);