import { Provider } from 'react-redux';
import { store } from '../app/store';
import { EditorProvider } from '../contexts/EditorContext';  
import { TaskProvider } from '../contexts/TaskContext';
import { useRouter } from 'next/router';
import Head from 'next/head';
import Script from 'next/script';
import { pageview } from '@/utilities/gtag';
import { useEffect } from 'react';

const GA_TRACKING_ID = 'G-968L600ZDF';
 
function MyApp({ Component, pageProps }) {
  const router = useRouter();
  const isDashboardPostsPage = router.pathname.startsWith('/dashboard/posts');
  const isDashboardTasksPage = router.pathname.startsWith('/dashboard/tasks');

  useEffect(() => {
    if (localStorage.getItem('userId')) {
      localStorage.setItem('userId', crypto.randomUUID());
    } else {
      console.log('code didnt run');
    }
  }, []);

  useEffect(() => {
    const handleRouteChange = url => {
      if (typeof window.gtag !== 'undefined') {
        pageview(url, document.title);
      }
    };
    router.events.on('routeChangeComplete', handleRouteChange);
    return () => {
      router.events.off('routeChangeComplete', handleRouteChange);
    };
  }, [router.events]);

  return (
    <Provider store={store}>
      <Head>
        <link rel="icon" href="/image/NoFunMondays.png" type="image/x-icon" />
      </Head>

      <Script
        strategy="afterInteractive"
        src={`https://www.googletagmanager.com/gtag/js?id=${GA_TRACKING_ID}`}
      />
      <Script
        id="google-analytics"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${GA_TRACKING_ID}', {
              page_path: window.location.pathname,
            });
          `,
        }}
      />

      {isDashboardPostsPage ? (
        <EditorProvider>
          <Component {...pageProps} />
        </EditorProvider>
      ) : isDashboardTasksPage ? (
        <TaskProvider>
          <Component {...pageProps} />
        </TaskProvider>
      ) : (
        <Component {...pageProps} />
      )}
    </Provider>
  );
}

export default MyApp;
