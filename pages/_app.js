// 文件路径: /pages/_app.js
import '../styles/globals.css';
import { appWithTranslation } from 'next-i18next';
import Layout from '../components/Layout';
// *** 关键修改：导入 i18next 配置文件 ***
import nextI18NextConfig from '../next-i18next.config.js';

const MyApp = ({ Component, pageProps }) => {
  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  );
};

// *** 关键修改：将配置文件作为参数传递给 appWithTranslation ***
export default appWithTranslation(MyApp, nextI18NextConfig);