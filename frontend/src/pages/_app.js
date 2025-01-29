import { Provider } from 'react-redux';
import { store } from '../app/store';
import { EditorProvider } from '../contexts/EditorContext';  
import { TaskProvider } from '../contexts/TaskContext';
import { useRouter } from 'next/router';

function MyApp({ Component, pageProps }) {
  const router = useRouter();
  const isDashboardPostsPage = router.pathname.startsWith('/dashboard/posts');
  const isDashboardTasksPage = router.pathname.startsWith('/dashboard/tasks');

  return (
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
  );
}

export default MyApp;
