var __defProp = Object.defineProperty;
var __name = (target, value) => __defProp(target, "name", { value, configurable: true });
import { Link, useLocation } from "wouter";
import { useAuth } from "@/hooks/use-auth";
import { useGetDashboardSummary } from "@workspace/api-client-react";
import {
  BookOpen,
  LayoutDashboard,
  Coins,
  Bell,
  Settings,
  LogOut,
  Menu
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
function Layout({ children }) {
  const { user, logout, isLoading } = useAuth();
  const [location, setLocation] = useLocation();
  const { data: summary } = useGetDashboardSummary({
    query: {
      enabled: !!user
    }
  });
  if (!isLoading && !user) {
    setLocation("/login");
    return null;
  }
  const navItems = [
    { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
    { href: "/tokens", label: "Token History", icon: Coins },
    { href: "/notifications", label: "Notifications", icon: Bell, badge: summary?.unreadNotificationCount },
    { href: "/settings", label: "Settings", icon: Settings }
  ];
  const NavLinks = /* @__PURE__ */ __name(() => <>
      {navItems.map((item) => {
    const Icon = item.icon;
    const isActive = location === item.href || location.startsWith(`${item.href}/`);
    return <Link key={item.href} href={item.href}>
            <div className={`flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors cursor-pointer ${isActive ? "bg-primary/10 text-primary font-medium" : "text-muted-foreground hover:bg-muted hover:text-foreground"}`}>
              <Icon className="w-5 h-5" />
              <span>{item.label}</span>
              {item.badge ? <span className="ml-auto bg-destructive text-destructive-foreground text-xs font-bold px-2 py-0.5 rounded-full">
                  {item.badge}
                </span> : null}
            </div>
          </Link>;
  })}
    </>, "NavLinks");
  return <div className="min-h-screen bg-background flex flex-col md:flex-row">
      {
    /* Mobile Header */
  }
      <div className="md:hidden flex items-center justify-between p-4 border-b bg-card">
        <Link href="/dashboard" className="flex items-center gap-2 text-primary">
          <BookOpen className="w-6 h-6" />
          <span className="font-display font-bold text-xl tracking-tight text-foreground">ByteShare</span>
        </Link>
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon">
              <Menu className="w-6 h-6" />
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="w-64 p-0">
            <div className="flex flex-col h-full">
              <div className="p-6 border-b">
                <Link href="/dashboard" className="flex items-center gap-2 text-primary">
                  <BookOpen className="w-6 h-6" />
                  <span className="font-display font-bold text-xl tracking-tight text-foreground">ByteShare</span>
                </Link>
              </div>
              <div className="p-4 flex-1 space-y-1">
                <NavLinks />
              </div>
              <div className="p-4 border-t">
                <Button variant="ghost" className="w-full justify-start text-muted-foreground" onClick={logout}>
                  <LogOut className="w-5 h-5 mr-3" />
                  Log out
                </Button>
              </div>
            </div>
          </SheetContent>
        </Sheet>
      </div>

      {
    /* Desktop Sidebar */
  }
      <div className="hidden md:flex flex-col w-64 border-r bg-card h-screen sticky top-0 shrink-0">
        <div className="p-6 border-b">
          <Link href="/dashboard" className="flex items-center gap-2 text-primary hover:opacity-80 transition-opacity">
            <BookOpen className="w-6 h-6" />
            <span className="font-display font-bold text-xl tracking-tight text-foreground">ByteShare</span>
          </Link>
        </div>
        
        <div className="p-4 flex-1 space-y-1 overflow-y-auto">
          <NavLinks />
        </div>

        {user && <div className="p-4 border-t">
            <div className="flex items-center gap-3 mb-4 px-2">
              <Avatar className="w-10 h-10 border border-primary/20">
                <AvatarFallback className="bg-primary/10 text-primary font-medium">
                  {user.name.charAt(0).toUpperCase()}
                </AvatarFallback>
              </Avatar>
              <div className="overflow-hidden">
                <p className="text-sm font-medium truncate">{user.name}</p>
                <div className="flex items-center gap-1.5 text-xs text-muted-foreground mt-0.5">
                  <span className="flex items-center gap-0.5"><Coins className="w-3 h-3 text-sky-500" /> {user.tokenBalance}</span>
                  <span>•</span>
                  <span>Rep: {user.reputation}</span>
                </div>
              </div>
            </div>
            <Button variant="ghost" className="w-full justify-start text-muted-foreground hover:text-foreground" onClick={logout}>
              <LogOut className="w-5 h-5 mr-3" />
              Log out
            </Button>
          </div>}
      </div>

      {
    /* Main Content */
  }
      <main className="flex-1 w-full overflow-x-hidden relative">
        {children}
      </main>
    </div>;
}
__name(Layout, "Layout");
export {
  Layout
};
