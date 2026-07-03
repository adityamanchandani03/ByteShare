var __defProp = Object.defineProperty;
var __name = (target, value) => __defProp(target, "name", { value, configurable: true });
import { useState } from "react";
import { useParams, Link, useLocation } from "wouter";
import { Layout } from "@/components/layout";
import {
  useGetClassroom,
  useGetClassroomResources,
  useGetClassroomMembers,
  useGetPendingResources,
  useGetClassroomStats,
  useApproveResource,
  useRejectResource,
  useDownloadResource,
  useRemoveMember,
  useUpdateClassroom,
  getGetClassroomResourcesQueryKey,
  getGetPendingResourcesQueryKey,
  getGetClassroomStatsQueryKey,
  getGetClassroomMembersQueryKey,
  getGetClassroomQueryKey
} from "@workspace/api-client-react";
import { useQueryClient } from "@tanstack/react-query";
import { useAuth } from "@/hooks/use-auth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Loader2, ArrowLeft, Upload, Users, FileText, CheckCircle, XCircle, Eye, Download, Copy, Trash2, ArrowUpRight, BookOpen, Coins } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Skeleton } from "@/components/ui/skeleton";
function ClassroomDetail() {
  const { classroomId } = useParams();
  const [_, setLocation] = useLocation();
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const { user } = useAuth();
  const [rejectReason, setRejectReason] = useState("");
  const [selectedResource, setSelectedResource] = useState(null);
  const [isRejectDialogOpen, setIsRejectDialogOpen] = useState(false);
  const [isViewDialogOpen, setIsViewDialogOpen] = useState(false);
  const [editName, setEditName] = useState("");
  const [editDesc, setEditDesc] = useState("");
  const { data: classroom, isLoading: isLoadingClassroom } = useGetClassroom(classroomId);
  const { data: resources, isLoading: isLoadingResources } = useGetClassroomResources(classroomId);
  const { data: pendingResources } = useGetPendingResources(classroomId, { query: { enabled: !!classroom?.isHost } });
  const { data: members } = useGetClassroomMembers(classroomId, { query: { enabled: !!classroom?.isHost } });
  const { data: stats } = useGetClassroomStats(classroomId, { query: { enabled: !!classroom?.isHost } });
  const approveMutation = useApproveResource();
  const rejectMutation = useRejectResource();
  const downloadMutation = useDownloadResource();
  const removeMemberMutation = useRemoveMember();
  const updateClassroomMutation = useUpdateClassroom();
  const handleApprove = /* @__PURE__ */ __name((resourceId) => {
    approveMutation.mutate(
      { classroomId, resourceId },
      {
        onSuccess: /* @__PURE__ */ __name(() => {
          toast({ title: "Resource approved", description: "Tokens have been awarded to the uploader." });
          queryClient.invalidateQueries({ queryKey: getGetPendingResourcesQueryKey(classroomId) });
          queryClient.invalidateQueries({ queryKey: getGetClassroomResourcesQueryKey(classroomId) });
          queryClient.invalidateQueries({ queryKey: getGetClassroomStatsQueryKey(classroomId) });
        }, "onSuccess")
      }
    );
  }, "handleApprove");
  const handleReject = /* @__PURE__ */ __name(() => {
    if (!selectedResource || rejectReason.length < 5) return;
    rejectMutation.mutate(
      { classroomId, resourceId: selectedResource.id, data: { reason: rejectReason } },
      {
        onSuccess: /* @__PURE__ */ __name(() => {
          toast({ title: "Resource rejected" });
          setIsRejectDialogOpen(false);
          setRejectReason("");
          setSelectedResource(null);
          queryClient.invalidateQueries({ queryKey: getGetPendingResourcesQueryKey(classroomId) });
        }, "onSuccess")
      }
    );
  }, "handleReject");
  const handleDownload = /* @__PURE__ */ __name((resourceId, cost, uploaderId) => {
    const isFree = user?.id === uploaderId;
    if (!isFree && user && user.tokenBalance < cost) {
      toast({ variant: "destructive", title: "Not enough tokens", description: `You need ${cost} tokens to download this.` });
      return;
    }
    if (!isFree && !window.confirm(`This will cost ${cost} tokens. Continue?`)) return;
    downloadMutation.mutate(
      { classroomId, resourceId },
      {
        onSuccess: /* @__PURE__ */ __name((data) => {
          window.open(data.downloadUrl, "_blank");


        }, "onSuccess")
      }
    );
  }, "handleDownload");
  const handleRemoveMember = /* @__PURE__ */ __name((memberId) => {
    if (!window.confirm("Are you sure you want to remove this member?")) return;
    removeMemberMutation.mutate(
      { classroomId, memberId },
      {
        onSuccess: /* @__PURE__ */ __name(() => {
          toast({ title: "Member removed" });
          queryClient.invalidateQueries({ queryKey: getGetClassroomMembersQueryKey(classroomId) });
          queryClient.invalidateQueries({ queryKey: getGetClassroomStatsQueryKey(classroomId) });
        }, "onSuccess")
      }
    );
  }, "handleRemoveMember");
  const handleUpdateClassroom = /* @__PURE__ */ __name(() => {
    if (!editName) return;
    updateClassroomMutation.mutate(
      { classroomId, data: { name: editName, description: editDesc } },
      {
        onSuccess: /* @__PURE__ */ __name(() => {
          toast({ title: "Classroom updated" });
          queryClient.invalidateQueries({ queryKey: getGetClassroomQueryKey(classroomId) });
        }, "onSuccess")
      }
    );
  }, "handleUpdateClassroom");
  if (isLoadingClassroom) {
    return <Layout>
        <div className="p-6 md:p-8 max-w-6xl mx-auto space-y-6">
          <Skeleton className="h-8 w-64" />
          <Skeleton className="h-32 w-full" />
        </div>
      </Layout>;
  }
  if (!classroom) {
    return <Layout>
        <div className="p-6 md:p-8 max-w-6xl mx-auto">Classroom not found.</div>
      </Layout>;
  }
  return <Layout>
      <div className="p-6 md:p-8 max-w-6xl mx-auto space-y-8">
        <Link href="/dashboard" className="inline-flex items-center text-sm font-medium text-muted-foreground hover:text-foreground">
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Dashboard
        </Link>
        
        <div className="bg-card border rounded-2xl p-6 md:p-8 shadow-sm flex flex-col md:flex-row md:items-start justify-between gap-6">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <h1 className="text-3xl font-bold tracking-tight">{classroom.name}</h1>
              {classroom.isHost && <Badge variant="secondary" className="bg-primary/10 text-primary">Host</Badge>}
            </div>
            <p className="text-muted-foreground max-w-2xl mb-4">{classroom.description || "No description provided."}</p>
            <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
              <span className="flex items-center gap-1.5"><BookOpen className="w-4 h-4" /> {classroom.subject}</span>
              <span className="flex items-center gap-1.5"><Users className="w-4 h-4" /> {classroom.department}</span>
              <span>•</span>
              <span>{classroom.semester}</span>
            </div>
          </div>
          
          <div className="flex flex-col gap-3 min-w-[200px]">
            <Link href={`/classrooms/${classroom.id}/upload`}>
              <Button className="w-full gap-2">
                <Upload className="w-4 h-4" />
                Upload Resource
              </Button>
            </Link>
            
            <div className="bg-muted p-3 rounded-lg flex items-center justify-between border">
              <div className="text-xs">
                <span className="block text-muted-foreground font-medium mb-0.5">Invite Code</span>
                <span className="font-mono font-bold text-foreground">{classroom.inviteCode}</span>
              </div>
              <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => {
    navigator.clipboard.writeText(classroom.inviteCode);
    toast({ title: "Copied to clipboard" });
  }}>
                <Copy className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>

        <Tabs defaultValue="resources" className="w-full">
          <TabsList className="w-full justify-start border-b rounded-none h-auto p-0 bg-transparent mb-6">
            <TabsTrigger value="resources" className="rounded-none data-[state=active]:border-b-2 data-[state=active]:border-primary py-3 px-6">
              Resources
            </TabsTrigger>
            {classroom.isHost && <>
                <TabsTrigger value="pending" className="rounded-none data-[state=active]:border-b-2 data-[state=active]:border-primary py-3 px-6">
                  Pending Queue {pendingResources?.length ? <Badge className="ml-2 bg-destructive">{pendingResources.length}</Badge> : null}
                </TabsTrigger>
                <TabsTrigger value="members" className="rounded-none data-[state=active]:border-b-2 data-[state=active]:border-primary py-3 px-6">
                  Members
                </TabsTrigger>
                <TabsTrigger value="stats" className="rounded-none data-[state=active]:border-b-2 data-[state=active]:border-primary py-3 px-6">
                  Stats
                </TabsTrigger>
                <TabsTrigger value="settings" className="rounded-none data-[state=active]:border-b-2 data-[state=active]:border-primary py-3 px-6" onClick={() => {
    setEditName(classroom.name);
    setEditDesc(classroom.description || "");
  }}>
                  Settings
                </TabsTrigger>
              </>}
          </TabsList>

          <TabsContent value="resources" className="space-y-4">
            {isLoadingResources ? <div className="space-y-4">
                {Array.from({ length: 3 }).map((_2, i) => <Skeleton key={i} className="h-24 w-full" />)}
              </div> : resources && resources.length > 0 ? <div className="grid gap-4">
                {resources.map((resource) => <Card key={resource.id} className="overflow-hidden">
                    <div className="flex flex-col md:flex-row">
                      <div className="p-6 flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <Badge variant="outline" className="capitalize">{resource.type.replace(/_/g, " ")}</Badge>
                          <span className="text-xs text-muted-foreground">• Uploaded by {resource.uploaderName}</span>
                        </div>
                        <h3 className="text-lg font-bold mb-1">{resource.title}</h3>
                        {resource.description && <p className="text-muted-foreground text-sm line-clamp-2">{resource.description}</p>}
                      </div>
                      <div className="bg-muted/30 p-6 border-t md:border-t-0 md:border-l flex flex-col justify-center items-center gap-3 min-w-[200px]">
                        <div className="text-sm font-medium text-muted-foreground flex items-center gap-1.5">
                          {user?.id === resource.uploaderId ? <span className="text-emerald-500">Free (Yours)</span> : <>Cost: 5 <Coins className="w-3.5 h-3.5 text-sky-500" /></>}
                        </div>
                        <Button className="w-full" onClick={() => handleDownload(resource.id, 5, resource.uploaderId)} disabled={downloadMutation.isPending}>
                          <Download className="w-4 h-4 mr-2" /> Download
                        </Button>
                      </div>
                    </div>
                  </Card>)}
              </div> : <div className="text-center py-16 border rounded-xl bg-muted/30">
                <FileText className="w-12 h-12 text-muted-foreground mx-auto mb-4 opacity-50" />
                <h3 className="text-lg font-medium">No resources yet</h3>
                <p className="text-muted-foreground mb-4">Be the first to upload and earn tokens!</p>
                <Link href={`/classrooms/${classroom.id}/upload`}>
                  <Button variant="outline">Upload Resource</Button>
                </Link>
              </div>}
          </TabsContent>

          {classroom.isHost && <>
              <TabsContent value="pending" className="space-y-4">
                {!pendingResources?.length ? <div className="text-center py-16 border rounded-xl bg-muted/30">
                    <CheckCircle className="w-12 h-12 text-muted-foreground mx-auto mb-4 opacity-50" />
                    <h3 className="text-lg font-medium">Queue is empty</h3>
                    <p className="text-muted-foreground">All pending resources have been reviewed.</p>
                  </div> : <div className="grid gap-4">
                    {pendingResources.map((resource) => <Card key={resource.id}>
                        <div className="p-6">
                          <div className="flex justify-between items-start mb-4">
                            <div>
                              <Badge variant="outline" className="capitalize mb-2">{resource.type.replace(/_/g, " ")}</Badge>
                              <h3 className="text-lg font-bold">{resource.title}</h3>
                              <p className="text-sm text-muted-foreground">by {resource.uploaderName}</p>
                            </div>
                            <Button variant="outline" size="sm" onClick={() => {
    setSelectedResource(resource);
    setIsViewDialogOpen(true);
  }}>
                              <Eye className="w-4 h-4 mr-2" /> View File
                            </Button>
                          </div>
                          {resource.description && <p className="text-sm bg-muted/50 p-3 rounded-lg mb-4">{resource.description}</p>}
                          
                          <div className="flex items-center gap-3 mt-4 pt-4 border-t">
                            <Button
    className="flex-1 bg-emerald-600 hover:bg-emerald-700"
    onClick={() => handleApprove(resource.id)}
  >
                              <CheckCircle className="w-4 h-4 mr-2" /> Approve & Award
                            </Button>
                            <Button
    variant="destructive"
    className="flex-1"
    onClick={() => {
      setSelectedResource(resource);
      setIsRejectDialogOpen(true);
    }}
  >
                              <XCircle className="w-4 h-4 mr-2" /> Reject
                            </Button>
                          </div>
                        </div>
                      </Card>)}
                  </div>}
              </TabsContent>

              <TabsContent value="members" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Classroom Members ({members?.length || 0})</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="divide-y">
                      {members?.map((member) => <div key={member.id} className="py-4 flex items-center justify-between">
                          <div>
                            <p className="font-medium">{member.name}</p>
                            <p className="text-sm text-muted-foreground">{member.email}</p>
                            <div className="text-xs text-muted-foreground mt-1">
                              Reputation: {member.reputation} • Joined {new Date(member.joinedAt).toLocaleDateString()}
                            </div>
                          </div>
                          {member.id !== classroom.hostId && <Button variant="ghost" size="icon" className="text-destructive hover:bg-destructive/10" onClick={() => handleRemoveMember(member.id)}>
                              <Trash2 className="w-4 h-4" />
                            </Button>}
                        </div>)}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="stats" className="space-y-4">
                {stats && <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                    <Card><CardHeader className="pb-2"><CardTitle className="text-sm font-medium text-muted-foreground">Total Members</CardTitle></CardHeader><CardContent><div className="text-2xl font-bold">{stats.totalMembers}</div></CardContent></Card>
                    <Card><CardHeader className="pb-2"><CardTitle className="text-sm font-medium text-muted-foreground">Approved Resources</CardTitle></CardHeader><CardContent><div className="text-2xl font-bold">{stats.totalApproved}</div></CardContent></Card>
                    <Card><CardHeader className="pb-2"><CardTitle className="text-sm font-medium text-muted-foreground">Pending Review</CardTitle></CardHeader><CardContent><div className="text-2xl font-bold">{stats.totalPending}</div></CardContent></Card>
                    <Card><CardHeader className="pb-2"><CardTitle className="text-sm font-medium text-muted-foreground">Tokens Awarded</CardTitle></CardHeader><CardContent><div className="text-2xl font-bold text-sky-500">{stats.totalTokensAwarded}</div></CardContent></Card>
                  </div>}
                
                {stats?.topContributors && stats.topContributors.length > 0 && <Card className="mt-6">
                    <CardHeader>
                      <CardTitle>Top Contributors</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="divide-y">
                        {stats.topContributors.map((contrib, i) => <div key={contrib.id} className="py-3 flex items-center justify-between">
                            <div className="flex items-center gap-3">
                              <div className="w-8 h-8 rounded-full bg-primary/10 text-primary flex items-center justify-center font-bold text-sm">
                                #{i + 1}
                              </div>
                              <span className="font-medium">{contrib.name}</span>
                            </div>
                            <div className="text-sm font-medium">
                              {contrib.approvedCount} uploads
                            </div>
                          </div>)}
                      </div>
                    </CardContent>
                  </Card>}
              </TabsContent>

              <TabsContent value="settings" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Classroom Settings</CardTitle>
                    <CardDescription>Update classroom details.</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Classroom Name</label>
                      <Input value={editName} onChange={(e) => setEditName(e.target.value)} />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Description</label>
                      <Textarea value={editDesc} onChange={(e) => setEditDesc(e.target.value)} />
                    </div>
                    <Button onClick={handleUpdateClassroom} disabled={updateClassroomMutation.isPending || !editName}>
                      {updateClassroomMutation.isPending ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : null}
                      Save Changes
                    </Button>
                  </CardContent>
                </Card>
              </TabsContent>
            </>}
        </Tabs>
      </div>

      {
    /* Reject Dialog */
  }
      <Dialog open={isRejectDialogOpen} onOpenChange={setIsRejectDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Reject Resource</DialogTitle>
          </DialogHeader>
          <div className="py-4">
            <p className="text-sm text-muted-foreground mb-4">Please provide a reason for rejecting "{selectedResource?.title}". This helps the student improve their submissions.</p>
            <Textarea
    placeholder="e.g., The scan is too blurry to read, or the content is irrelevant."
    value={rejectReason}
    onChange={(e) => setRejectReason(e.target.value)}
    rows={4}
  />
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsRejectDialogOpen(false)}>Cancel</Button>
            <Button variant="destructive" onClick={handleReject} disabled={rejectReason.length < 5 || rejectMutation.isPending}>
              {rejectMutation.isPending ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : null}
              Confirm Rejection
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {
    /* View File Dialog */
  }
      <Dialog open={isViewDialogOpen} onOpenChange={setIsViewDialogOpen}>
        <DialogContent className="max-w-4xl h-[80vh] flex flex-col">
          <DialogHeader className="flex flex-row items-center justify-between pr-8">
            <DialogTitle>{selectedResource?.title}</DialogTitle>
            {selectedResource && <a href={selectedResource.fileUrl} target="_blank" rel="noreferrer" className="text-sm text-primary hover:underline flex items-center gap-1">
                Open in tab <ArrowUpRight className="w-3 h-3" />
              </a>}
          </DialogHeader>
          <div className="flex-1 bg-muted rounded-md overflow-hidden relative">
            {selectedResource?.fileUrl ? <iframe
    src={selectedResource.fileUrl}
    className="w-full h-full border-0"
    title="Resource viewer"
  /> : <div className="flex items-center justify-center h-full text-muted-foreground">No file URL</div>}
          </div>
        </DialogContent>
      </Dialog>
    </Layout>;
}
__name(ClassroomDetail, "ClassroomDetail");
export {
  ClassroomDetail as default
};
