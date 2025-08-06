import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Navbar } from "@/components/navbar";
import { Sidebar } from "@/components/sidebar";
import Home from "@/pages/home";
import Jobs from "@/pages/jobs";
import PostJob from "@/pages/post-job";
import Marketplace from "@/pages/marketplace";
import Events from "@/pages/events";
import Profile from "@/pages/profile";
import Wallet from "@/pages/wallet";
import NotFound from "@/pages/not-found";

function Router() {
  // Mock current user - in real app this would come from auth context
  const currentUser = {
    id: 1,
    firstName: "Sarah",
    lastName: "Kamara",
    profileImage: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face",
    isVerified: true,
    walletBalance: "125000.00",
    completedJobs: 23,
    rating: "4.9",
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar currentUser={currentUser} />
      <div className="flex">
        <Sidebar currentUser={currentUser} />
        <div className="flex-1">
          <Switch>
            <Route path="/" component={Home} />
            <Route path="/jobs" component={Jobs} />
            <Route path="/jobs/post" component={PostJob} />
            <Route path="/marketplace" component={Marketplace} />
            <Route path="/events" component={Events} />
            <Route path="/profile" component={Profile} />
            <Route path="/wallet" component={Wallet} />
            <Route component={NotFound} />
          </Switch>
        </div>
      </div>
    </div>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Router />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
