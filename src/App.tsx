import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Toaster } from '@/components/ui/toaster';
import { TooltipProvider } from '@/components/ui/tooltip';
import NotFound from '@/pages/not-found';
import { Route, Switch, Router as WouterRouter } from 'wouter';
import Home from '@/pages/Home';
import { Cursor } from '@/components/layout/Cursor';
import { ScrollProgress } from '@/components/layout/ScrollProgress';
import { CommandPalette } from '@/components/layout/CommandPalette';
import { Dock } from '@/components/layout/Dock';

const queryClient = new QueryClient();

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        {/* Global Layout Components */}
        <div className="hidden md:block">
          <Cursor />
        </div>
        <ScrollProgress />
        <CommandPalette />
        <Dock />

        {/* Main Router */}
        <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, '')}>
          <Router />
        </WouterRouter>
        
        <Toaster />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
