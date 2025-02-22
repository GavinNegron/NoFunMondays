import { Provider } from 'react-redux';
import { store } from '../app/store';
import { EditorProvider } from '../contexts/EditorContext';  
import { useRouter } from 'next/router';
import Head from 'next/head';

function MyApp({ Component, pageProps }) {
  const router = useRouter();
  const isDashboardPostsPage = router.pathname.startsWith('/dashboard/posts');

  return (
    <>
      <Head>
        <meta charSet="UTF-8"/>
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0" />
        <meta property="og:type" content="website"/>
        <meta name="twitter:title" content="NoFunMondays"/>
        <link rel="icon" href="https://nofunmondays.com/images/NoFunMondays.png" />
      </Head>
      <Provider store={store}>
        {isDashboardPostsPage ? (
          <EditorProvider>
            <Component {...pageProps} />
          </EditorProvider>
        ) : (
          <Component {...pageProps} />
        )}
      </Provider>
    </>
  );
}

export default MyApp;
