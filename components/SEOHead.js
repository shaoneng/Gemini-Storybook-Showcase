import Head from 'next/head';
import { useRouter } from 'next/router';

const SEOHead = ({ title, description, ogImage, children }) => {
  const router = useRouter();
  const locale = router.asPath.startsWith('/en') ? 'en' : 'zh';
  const baseUrl = 'https://geministorybook.online';
  const currentUrl = `${baseUrl}${router.asPath}`;

  return (
    <Head>
      <title>{title}</title>
      <meta name="description" content={description} />
      
      {/* Open Graph */}
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={currentUrl} />
      <meta property="og:type" content="website" />
      <meta property="og:locale" content={locale === 'en' ? 'en_US' : 'zh_CN'} />
      {ogImage && <meta property="og:image" content={`${baseUrl}${ogImage}`} />}
      
      {/* Twitter Card */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      {ogImage && <meta name="twitter:image" content={`${baseUrl}${ogImage}`} />}
      
      {/* Language alternatives */}
      <link rel="alternate" hrefLang="zh" href={`${baseUrl}${router.asPath.replace('/en', '') || '/'}`} />
      <link rel="alternate" hrefLang="en" href={`${baseUrl}/en${router.asPath === '/' ? '' : router.asPath}`} />
      <link rel="alternate" hrefLang="x-default" href={`${baseUrl}${router.asPath.replace('/en', '') || '/'}`} />
      
      {/* Schema.org structured data */}
      <script type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "WebSite",
          "name": "Gemini Storybook Showcase",
          "url": "https://geministorybook.online",
          "description": "Explore amazing AI stories created with Google Gemini Storybook, discover the magic prompts behind them, and share your own creative works.",
          "inLanguage": ["zh-CN", "en-US"],
          "potentialAction": {
            "@type": "SearchAction",
            "target": "https://geministorybook.online/?search={search_term_string}",
            "query-input": "required name=search_term_string"
          }
        })}
      </script>
      
      {children}
    </Head>
  );
};

export default SEOHead;