var __defProp = Object.defineProperty;
var __name = (target, value) => __defProp(target, "name", { value, configurable: true });
import { Layout } from "@/components/layout";
import { useGetNotifications, useMarkAllNotificationsRead, useMarkNotificationRead, getGetNotificationsQueryKey, getGetDashboardSummaryQueryKey } from "@workspace/api-client-react";
import { useQueryClient } from "@tanstack/react-query";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Bell, CheckCircle, XCircle, UserMinus, CheckCheck } from "lucide-react";
function Notifications() {
  const queryClient = useQueryClient();
  const { data: notifications, isLoading } = useGetNotifications();
  const markAllMutation = useMarkAllNotificationsRead();
  const markOneMutation = useMarkNotificationRead();
  const handleMarkAllRead = /* @__PURE__ */ __name(() => {
    markAllMutation.mutate(void 0, {
      onSuccess: /* @__PURE__ */ __name(() => {
        queryClient.invalidateQueries({ queryKey: getGetNotificationsQueryKey() });
        queryClient.invalidateQueries({ queryKey: getGetDashboardSummaryQueryKey() });
      }, "onSuccess")
    });
  }, "handleMarkAllRead");
  const handleMarkRead = /* @__PURE__ */ __name((id) => {
    markOneMutation.mutate(
      { notificationId: id },
      {
        onSuccess: /* @__PURE__ */ __name(() => {
          queryClient.invalidateQueries({ queryKey: getGetNotificationsQueryKey() });
          queryClient.invalidateQueries({ queryKey: getGetDashboardSummaryQueryKey() });
        }, "onSuccess")
      }
    );
  }, "handleMarkRead");
  const getIcon = /* @__PURE__ */ __name((type) => {
    switch (type) {
      case "resource_approved":
        return <CheckCircle className="w-5 h-5 text-emerald-500" />;
      case "resource_rejected":
        return <XCircle className="w-5 h-5 text-destructive" />;
      case "removed_from_classroom":
        return <UserMinus className="w-5 h-5 text-sky-500" />;
      default:
        return <Bell className="w-5 h-5 text-primary" />;
    }
  }, "getIcon");
  const unreadCount = notifications?.filter((n) => !n.isRead).length || 0;
  return <Layout>
      <div className="p-6 md:p-8 max-w-3xl mx-auto space-y-6">
        <div className="flex items-end justify-between mb-2">
          <div>
            <h1 className="text-3xl font-bold tracking-tight mb-2">Notifications</h1>
            <p className="text-muted-foreground">Stay updated on your resources and classrooms.</p>
          </div>
          {unreadCount > 0 && <Button variant="outline" size="sm" onClick={handleMarkAllRead} disabled={markAllMutation.isPending}>
              <CheckCheck className="w-4 h-4 mr-2" /> Mark all as read
            </Button>}
        </div>

        {isLoading ? <div className="space-y-3">
            {Array.from({ length: 4 }).map((_, i) => <Skeleton key={i} className="h-24 w-full" />)}
          </div> : notifications && notifications.length > 0 ? <div className="space-y-3">
            {notifications.map((notif) => <Card
    key={notif.id}
    className={`transition-colors ${!notif.isRead ? "border-primary/40 bg-primary/5" : "bg-card opacity-80"} hover:opacity-100 cursor-pointer`}
    onClick={() => !notif.isRead && handleMarkRead(notif.id)}
  >
                <div className="p-4 sm:p-5 flex items-start gap-4">
                  <div className="mt-1 shrink-0 bg-background p-2 rounded-full border shadow-sm">
                    {getIcon(notif.type)}
                  </div>
                  <div className="flex-1">
                    <div className="flex justify-between items-start gap-4">
                      <p className={`font-medium ${!notif.isRead ? "text-foreground" : "text-muted-foreground"}`}>
                        {notif.message}
                      </p>
                      <span className="text-xs text-muted-foreground whitespace-nowrap">
                        {new Date(notif.createdAt).toLocaleDateString()}
                      </span>
                    </div>
                    
                    {notif.type === "resource_rejected" && notif.rejectionReason && <div className="mt-3 p-3 bg-destructive/10 text-destructive text-sm rounded-md border border-destructive/20">
                        <span className="font-semibold block mb-1">Reason for rejection:</span>
                        {notif.rejectionReason}
                      </div>}
                    
                    <div className="flex gap-2 text-xs text-muted-foreground mt-2">
                      {notif.resourceTitle && <span>Resource: {notif.resourceTitle}</span>}
                      {notif.resourceTitle && notif.classroomName && <span>•</span>}
                      {notif.classroomName && <span>Classroom: {notif.classroomName}</span>}
                    </div>
                  </div>
                </div>
              </Card>)}
          </div> : <div className="text-center py-20 border rounded-2xl bg-muted/20">
            <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
              <Bell className="w-8 h-8 text-muted-foreground" />
            </div>
            <h3 className="text-xl font-bold mb-2">You're all caught up</h3>
            <p className="text-muted-foreground">No new notifications at this time.</p>
          </div>}
      </div>
    </Layout>;
}
__name(Notifications, "Notifications");
export {
  Notifications as default
};
