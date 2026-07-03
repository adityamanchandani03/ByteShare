var __defProp = Object.defineProperty;
var __name = (target, value) => __defProp(target, "name", { value, configurable: true });
import { Layout } from "@/components/layout";
import { useGetTokenHistory } from "@workspace/api-client-react";
import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Coins, ArrowUpRight, ArrowDownRight } from "lucide-react";
function TokenHistory() {
  const { data: history, isLoading } = useGetTokenHistory();
  return <Layout>
      <div className="p-6 md:p-8 max-w-4xl mx-auto space-y-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight mb-2">Token History</h1>
          <p className="text-muted-foreground">Track your earnings and spendings across all classrooms.</p>
        </div>

        {isLoading ? <div className="space-y-4">
            {Array.from({ length: 5 }).map((_, i) => <Skeleton key={i} className="h-20 w-full" />)}
          </div> : history && history.length > 0 ? <Card>
            <div className="divide-y">
              {history.map((tx) => <div key={tx.id} className="p-4 sm:p-6 flex items-center justify-between">
                  <div className="flex items-start gap-4">
                    <div className={`mt-0.5 w-10 h-10 rounded-full flex items-center justify-center shrink-0 ${tx.type === "earned" ? "bg-emerald-500/10 text-emerald-500" : "bg-destructive/10 text-destructive"}`}>
                      {tx.type === "earned" ? <ArrowDownRight className="w-5 h-5" /> : <ArrowUpRight className="w-5 h-5" />}
                    </div>
                    <div>
                      <p className="font-medium text-lg leading-tight">{tx.description}</p>
                      <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-2 text-sm text-muted-foreground mt-1">
                        <span>{new Date(tx.createdAt).toLocaleDateString()} at {new Date(tx.createdAt).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}</span>
                        {tx.resourceTitle && <>
                            <span className="hidden sm:inline">•</span>
                            <span className="font-medium truncate max-w-[200px] sm:max-w-xs">{tx.resourceTitle}</span>
                          </>}
                        {tx.classroomName && <>
                            <span className="hidden sm:inline">•</span>
                            <span className="truncate max-w-[150px]">{tx.classroomName}</span>
                          </>}
                      </div>
                    </div>
                  </div>
                  <div className={`text-xl font-bold shrink-0 ml-4 ${tx.type === "earned" ? "text-emerald-500" : "text-destructive"}`}>
                    {tx.type === "earned" ? "+" : "-"}{tx.amount} <Coins className="w-5 h-5 inline text-sky-500 ml-1" />
                  </div>
                </div>)}
            </div>
          </Card> : <div className="text-center py-20 border rounded-2xl bg-muted/20">
            <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
              <Coins className="w-8 h-8 text-muted-foreground" />
            </div>
            <h3 className="text-xl font-bold mb-2">No transactions yet</h3>
            <p className="text-muted-foreground">Upload resources to earn tokens, or download to spend them.</p>
          </div>}
      </div>
    </Layout>;
}
__name(TokenHistory, "TokenHistory");
export {
  TokenHistory as default
};
