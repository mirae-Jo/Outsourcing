import {QueryClient, QueryClientProvider} from '@tanstack/react-query';
import Router from './shared/Router';
import {GlobalStyles} from './styles/Globalstyles';

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <GlobalStyles />
      <Router />
    </QueryClientProvider>
  );
}

export default App;
