import { QueryClientContextProvider } from './components/QueryClientContextProvider';
import { Quiz } from './components/Quiz';

export default function Home() {
  return (
    <QueryClientContextProvider>
      <Quiz/>
    </QueryClientContextProvider>
  );
}