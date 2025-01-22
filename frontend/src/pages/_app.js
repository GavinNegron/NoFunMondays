import { Provider } from 'react-redux';
import { store } from '../app/store';
import { EditorProvider } from '../contexts/EditorContext';  

function MyApp({ Component, pageProps }) {
  return (
    <Provider store={store}>
      <EditorProvider>  
        <Component {...pageProps} />
      </EditorProvider>
    </Provider>
  );
}

export default MyApp;