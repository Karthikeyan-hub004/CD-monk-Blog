import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import BlogDashboard from './pages/BlogDashboard'

const queryClient = new QueryClient()

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <BlogDashboard />
    </QueryClientProvider>
  )
}

export default App
