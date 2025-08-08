// 文件路径: /pages/about.js
import Head from 'next/head';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import storiesData from '../data/stories.json';

const SectionTitle = ({ children }) => <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">{children}</h2>;
const FeatureCard = ({ title, description }) => (
  <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-xl transition-shadow">
    <h3 className="text-xl font-semibold text-gray-900 mb-2">{title}</h3>
    <p className="text-gray-600">{description}</p>
  </div>
);

const AboutPage = () => {
  const { t } = useTranslation(['about', 'common']);

  return (
    <>
      <Head>
        <title>{t('about:page_title')} - {t('common:site_title')}</title>
        <meta name="description" content={t('about:meta_description')} />
      </Head>
      <div className="bg-white rounded-xl shadow-lg p-8 sm:p-12 max-w-4xl mx-auto">
        <div className="text-center border-b pb-10 mb-10">
          <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-400" dangerouslySetInnerHTML={{ __html: t('about:hero_title') }} />
          <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto" dangerouslySetInnerHTML={{ __html: t('about:hero_subtitle') }} />
          <div className="mt-8">
            <a href="https://gemini.google.com/gem/storybook" target="_blank" rel="noopener noreferrer" className="inline-block px-8 py-4 text-lg font-bold text-white bg-blue-600 rounded-full shadow-lg hover:bg-blue-700 transform hover:scale-105 transition-all">
              {t('about:cta_button')}
            </a>
          </div>
        </div>
        <div className="mb-12">
          <SectionTitle>{t('about:how_it_works_title')}</SectionTitle>
          <div className="grid md:grid-cols-3 gap-8 text-center">
            <div>
              <div className="text-3xl font-bold text-blue-600 mb-2">1</div>
              <h3 className="text-lg font-semibold mb-2">{t('about:step_1_title')}</h3>
              <p className="text-sm text-gray-500">{t('about:step_1_desc')}</p>
            </div>
            <div>
              <div className="text-3xl font-bold text-blue-600 mb-2">2</div>
              <h3 className="text-lg font-semibold mb-2">{t('about:step_2_title')}</h3>
              <p className="text-sm text-gray-500">{t('about:step_2_desc')}</p>
            </div>
            <div>
              <div className="text-3xl font-bold text-blue-600 mb-2">3</div>
              <h3 className="text-lg font-semibold mb-2">{t('about:step_3_title')}</h3>
              <p className="text-sm text-gray-500">{t('about:step_3_desc')}</p>
            </div>
          </div>
        </div>
        <div className="mb-12">
          <SectionTitle>{t('about:features_title')}</SectionTitle>
          <div className="grid md:grid-cols-2 gap-6">
            <FeatureCard title={t('about:feature_1_title')} description={t('about:feature_1_desc')} />
            <FeatureCard title={t('about:feature_2_title')} description={t('about:feature_2_desc')} />
            <FeatureCard title={t('about:feature_3_title')} description={t('about:feature_3_desc')} />
            <FeatureCard title={t('about:feature_4_title')} description={t('about:feature_4_desc')} />
          </div>
        </div>
        <div>
          <SectionTitle>{t('about:faq_title')}</SectionTitle>
          <div className="space-y-4 max-w-2xl mx-auto">
            <div>
              <h4 className="font-semibold text-lg">{t('about:faq_1_q')}</h4>
              <p className="text-gray-600 mt-1">{t('about:faq_1_a')}</p>
            </div>
            <div>
              <h4 className="font-semibold text-lg">{t('about:faq_2_q')}</h4>
              <p className="text-gray-600 mt-1">{t('about:faq_2_a')}</p>
            </div>
            <div>
              <h4 className="font-semibold text-lg">{t('about:faq_3_q')}</h4>
              <p className="text-gray-600 mt-1">{t('about:faq_3_a')}</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export async function getStaticProps({ locale }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ['about', 'common'])),
    },
  };
}

export default AboutPage;