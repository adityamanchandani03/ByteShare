var __defProp = Object.defineProperty;
var __name = (target, value) => __defProp(target, "name", { value, configurable: true });
import { Link } from "wouter";
import { useGetDashboardSummary, useGetMyClassrooms } from "@workspace/api-client-react";
import { Layout } from "@/components/layout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus, Users, Search, Coins, Award, ArrowUpRight } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
function Dashboard() {
  const { data: summary, isLoading: isLoadingSummary } = useGetDashboardSummary();
  const { data: classrooms, isLoading: isLoadingClassrooms } = useGetMyClassrooms();
  return <Layout>
      <div className="p-6 md:p-8 max-w-6xl mx-auto space-y-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold tracking-tight mb-2">Dashboard</h1>
            <p className="text-muted-foreground">Here's your academic progress at a glance.</p>
          </div>
          <div className="flex gap-3">
            <Link href="/classrooms/join">
              <Button variant="outline" className="gap-2">
                <Search className="w-4 h-4" />
                Join Classroom
              </Button>
            </Link>
            <Link href="/classrooms/create">
              <Button className="gap-2">
                <Plus className="w-4 h-4" />
                Create Classroom
              </Button>
            </Link>
          </div>
        </div>

        {
    /* Stats Grid */
  }
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {isLoadingSummary ? Array.from({ length: 4 }).map((_, i) => <Skeleton key={i} className="h-32 rounded-xl" />) : <>
              <Card className="bg-primary/5 border-primary/20">
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                    <Coins className="w-4 h-4 text-primary" />
                    Token Balance
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-foreground">{summary?.tokenBalance || 0}</div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                    <Award className="w-4 h-4 text-sky-500" />
                    Reputation
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-foreground">{summary?.reputation || 0}</div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium text-muted-foreground">Active Classrooms</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-foreground">{summary?.classroomCount || 0}</div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium text-muted-foreground">Resources Approved</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-foreground">{summary?.approvedCount || 0}</div>
                  <p className="text-xs text-muted-foreground mt-1">Out of {summary?.uploadedCount || 0} uploaded</p>
                </CardContent>
              </Card>
            </>}
        </div>

        {
    /* Classrooms List */
  }
        <div>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold">Your Classrooms</h2>
          </div>
          
          {isLoadingClassrooms ? <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {Array.from({ length: 3 }).map((_, i) => <Skeleton key={i} className="h-40 rounded-xl" />)}
            </div> : classrooms && classrooms.length > 0 ? <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {classrooms.map((classroom) => <Link key={classroom.id} href={`/classrooms/${classroom.id}`}>
                  <Card className="hover:border-primary/50 hover:shadow-md transition-all cursor-pointer h-full flex flex-col group">
                    <CardHeader className="pb-3">
                      <div className="flex justify-between items-start gap-4">
                        <div>
                          <CardTitle className="text-lg leading-tight mb-1 group-hover:text-primary transition-colors">{classroom.name}</CardTitle>
                          <CardDescription>{classroom.subject}</CardDescription>
                        </div>
                        {classroom.isHost && <span className="bg-primary/10 text-primary text-[10px] font-bold px-2 py-1 rounded-sm uppercase tracking-wider whitespace-nowrap">
                            Host
                          </span>}
                      </div>
                    </CardHeader>
                    <CardContent className="mt-auto">
                      <div className="flex items-center gap-4 text-sm text-muted-foreground">
                        <div className="flex items-center gap-1.5">
                          <Users className="w-4 h-4" />
                          <span>{classroom.memberCount} members</span>
                        </div>
                        <div className="flex items-center gap-1.5">
                          <span>{classroom.semester}</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </Link>)}
            </div> : <div className="text-center py-16 px-6 bg-muted/30 border rounded-2xl border-dashed">
              <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="w-8 h-8 text-muted-foreground" />
              </div>
              <h3 className="text-lg font-bold mb-2">No classrooms yet</h3>
              <p className="text-muted-foreground mb-6 max-w-sm mx-auto">
                Join an existing classroom with an invite code or create your own to start sharing resources.
              </p>
              <div className="flex justify-center gap-3">
                <Link href="/classrooms/join">
                  <Button variant="outline">Join Classroom</Button>
                </Link>
                <Link href="/classrooms/create">
                  <Button>Create Classroom</Button>
                </Link>
              </div>
            </div>}
        </div>

        {
    /* Recent Transactions */
  }
        {summary?.recentTransactions && summary.recentTransactions.length > 0 && <div>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold">Recent Tokens</h2>
              <Link href="/tokens" className="text-sm font-medium text-primary flex items-center hover:underline">
                View all <ArrowUpRight className="w-4 h-4 ml-1" />
              </Link>
            </div>
            <Card>
              <div className="divide-y">
                {summary.recentTransactions.map((tx) => <div key={tx.id} className="p-4 flex items-center justify-between">
                    <div>
                      <p className="font-medium">{tx.description}</p>
                      <div className="flex gap-2 text-xs text-muted-foreground mt-1">
                        <span>{new Date(tx.createdAt).toLocaleDateString()}</span>
                        {tx.resourceTitle && <>
                            <span>•</span>
                            <span className="truncate max-w-[200px]">{tx.resourceTitle}</span>
                          </>}
                      </div>
                    </div>
                    <div className={`font-bold ${tx.type === "earned" ? "text-emerald-500" : "text-destructive"}`}>
                      {tx.type === "earned" ? "+" : "-"}{tx.amount}
                    </div>
                  </div>)}
              </div>
            </Card>
          </div>}
      </div>
    </Layout>;
}
__name(Dashboard, "Dashboard");
export {
  Dashboard as default
};
