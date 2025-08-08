// 文件路径: /pages/_app.js
import '../styles/globals.css';
import { appWithTranslation } from 'next-i18next';
import Layout from '../components/Layout';

const MyApp = ({ Component, pageProps }) => {
  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  );
};

// 恢复为标准用法，不带第二个参数
export default appWithTranslation(MyApp);