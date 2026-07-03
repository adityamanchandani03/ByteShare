var __defProp = Object.defineProperty;
var __name = (target, value) => __defProp(target, "name", { value, configurable: true });
import { Switch, Route, Router as WouterRouter } from "wouter";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { AuthProvider } from "@/hooks/use-auth";
import NotFound from "@/pages/not-found";
import Landing from "@/pages/landing";
import Login from "@/pages/auth/login";
import Register from "@/pages/auth/register";
import Dashboard from "@/pages/dashboard";
import CreateClassroom from "@/pages/classrooms/create";
import JoinClassroom from "@/pages/classrooms/join";
import ClassroomDetail from "@/pages/classrooms/detail";
import UploadResource from "@/pages/classrooms/upload";
import TokenHistory from "@/pages/tokens";
import Notifications from "@/pages/notifications";
import Settings from "@/pages/settings";
const queryClient = new QueryClient();
function Router() {
  return <Switch>
      <Route path="/" component={Landing} />
      <Route path="/login" component={Login} />
      <Route path="/register" component={Register} />
      
      {
    /* Protected Routes inside Layout */
  }
      <Route path="/dashboard" component={Dashboard} />
      <Route path="/classrooms/create" component={CreateClassroom} />
      <Route path="/classrooms/join" component={JoinClassroom} />
      <Route path="/classrooms/:classroomId" component={ClassroomDetail} />
      <Route path="/classrooms/:classroomId/upload" component={UploadResource} />
      <Route path="/tokens" component={TokenHistory} />
      <Route path="/notifications" component={Notifications} />
      <Route path="/settings" component={Settings} />

      <Route component={NotFound} />
    </Switch>;
}
__name(Router, "Router");
function App() {
  return <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <TooltipProvider>
          <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, "")}>
            <Router />
          </WouterRouter>
          <Toaster />
        </TooltipProvider>
      </AuthProvider>
    </QueryClientProvider>;
}
__name(App, "App");
var stdin_default = App;
export {
  stdin_default as default
};
