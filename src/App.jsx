import {ReactQueryDevtools} from '@tanstack/react-query-devtools';
import Router from './shared/Router';
import {GlobalStyles} from './styles/Globalstyles';
import {QueryClient, QueryClientProvider} from '@tanstack/react-query';

const queryClient = new QueryClient();
function App() {
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <ReactQueryDevtools initialIsOpen={false} />
        <GlobalStyles />
        <Router />
      </QueryClientProvider>
    </>
  );
}

export default App;
