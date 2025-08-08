// 文件路径: /pages/_app.js
import '../styles/globals.css';
import { appWithTranslation } from 'next-i18next';
import Layout from '../components/Layout';
// *** 关键修改：确保从 .js 文件导入 ***
import nextI18NextConfig from '../next-i18next.config.js';

const MyApp = ({ Component, pageProps }) => {
  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  );
};

export default appWithTranslation(MyApp, nextI18NextConfig);