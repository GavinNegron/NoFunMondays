import { Provider } from 'react-redux';
import { store } from '../app/store';
import { EditorProvider } from '../contexts/EditorContext';  
import { TaskProvider } from '../contexts/TaskContext';
import { useRouter } from 'next/router';
import Head from 'next/head'

function MyApp({ Component, pageProps }) {
  const router = useRouter();
  const isDashboardPostsPage = router.pathname.startsWith('/dashboard/posts');
  const isDashboardTasksPage = router.pathname.startsWith('/dashboard/tasks');

  return (
   <>
      <Head>
        <meta charset="UTF-8"/>
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0" />
        <meta property="og:type" content="website"/>
        <meta property="og:image" content="https://nofunmondays.com/images/NoFunMondays.png"/>
        <meta name="twitter:title" content="NoFunMondays"/>
        <link rel="icon" href="/images/favicon.png" type="image/png" sizes="16x16" />
      </Head>
      <Provider store={store}>
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
    </>
  );
}

export default MyApp;