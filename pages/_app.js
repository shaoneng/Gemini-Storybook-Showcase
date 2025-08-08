// 文件路径: /pages/_app.js
import '../styles/globals.css';
import { appWithTranslation } from 'next-i18next';
import Layout from '../components/Layout';
// *** 关键修改：从新的 .mjs 文件导入 ***
import nextI18NextConfig from '../next-i18next.config.mjs';

const MyApp = ({ Component, pageProps }) => {
  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  );
};

// 将配置文件作为参数传递，确保客户端能正确初始化
export default appWithTranslation(MyApp, nextI18NextConfig);