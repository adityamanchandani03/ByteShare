var __defProp = Object.defineProperty;
var __name = (target, value) => __defProp(target, "name", { value, configurable: true });
import { Layout } from "@/components/layout";
import { useAuth } from "@/hooks/use-auth";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
function Settings() {
  const { user } = useAuth();
  return <Layout>
      <div className="p-6 md:p-8 max-w-2xl mx-auto space-y-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight mb-2">Settings</h1>
          <p className="text-muted-foreground">Manage your account preferences.</p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Profile Information</CardTitle>
            <CardDescription>Your personal details are currently read-only.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-medium text-muted-foreground">Full Name</label>
              <Input value={user?.name || ""} disabled readOnly />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-muted-foreground">Email Address</label>
              <Input value={user?.email || ""} disabled readOnly />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Account Status</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-muted p-4 rounded-lg">
                <p className="text-sm text-muted-foreground mb-1">Reputation Score</p>
                <p className="text-2xl font-bold">{user?.reputation || 0}</p>
              </div>
              <div className="bg-muted p-4 rounded-lg">
                <p className="text-sm text-muted-foreground mb-1">Joined Date</p>
                <p className="text-lg font-medium">{user?.createdAt ? new Date(user.createdAt).toLocaleDateString() : "N/A"}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </Layout>;
}
__name(Settings, "Settings");
export {
  Settings as default
};
