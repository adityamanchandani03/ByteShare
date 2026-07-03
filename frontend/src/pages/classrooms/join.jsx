var __defProp = Object.defineProperty;
var __name = (target, value) => __defProp(target, "name", { value, configurable: true });
import { useLocation } from "wouter";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useJoinClassroom, getGetMyClassroomsQueryKey } from "@workspace/api-client-react";
import { useQueryClient } from "@tanstack/react-query";
import { Layout } from "@/components/layout";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { InputOTP, InputOTPGroup, InputOTPSlot } from "@/components/ui/input-otp";
import { Loader2, ArrowLeft } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Link } from "wouter";
const joinClassroomSchema = z.object({
  inviteCode: z.string().length(6, "Invite code must be exactly 6 characters")
});
function JoinClassroom() {
  const [_, setLocation] = useLocation();
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const form = useForm({
    resolver: zodResolver(joinClassroomSchema),
    defaultValues: { inviteCode: "" }
  });
  const joinMutation = useJoinClassroom();
  const onSubmit = /* @__PURE__ */ __name((values) => {
    joinMutation.mutate(
      { data: values },
      {
        onSuccess: /* @__PURE__ */ __name((data) => {
          queryClient.invalidateQueries({ queryKey: getGetMyClassroomsQueryKey() });
          toast({ title: "Successfully joined", description: `You are now a member of ${data.name}.` });
          setLocation(`/classrooms/${data.id}`);
        }, "onSuccess"),
        onError: /* @__PURE__ */ __name((err) => {
          toast({
            variant: "destructive",
            title: "Failed to join",
            description: err.error?.error || "Invalid invite code or you're already a member."
          });
        }, "onError")
      }
    );
  }, "onSubmit");
  return <Layout>
      <div className="p-6 md:p-8 max-w-xl mx-auto space-y-6">
        <Link href="/dashboard" className="inline-flex items-center text-sm font-medium text-muted-foreground hover:text-foreground">
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Dashboard
        </Link>
        
        <Card className="text-center">
          <CardHeader>
            <CardTitle className="text-2xl">Join a Classroom</CardTitle>
            <CardDescription>Enter the 6-character invite code provided by your instructor or peer.</CardDescription>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 flex flex-col items-center">
                <FormField
    control={form.control}
    name="inviteCode"
    render={({ field }) => <FormItem>
                      <FormLabel className="sr-only">Invite Code</FormLabel>
                      <FormControl>
                        <InputOTP maxLength={6} {...field}>
                          <InputOTPGroup>
                            <InputOTPSlot index={0} />
                            <InputOTPSlot index={1} />
                            <InputOTPSlot index={2} />
                            <InputOTPSlot index={3} />
                            <InputOTPSlot index={4} />
                            <InputOTPSlot index={5} />
                          </InputOTPGroup>
                        </InputOTP>
                      </FormControl>
                      <FormMessage />
                    </FormItem>}
  />

                <Button type="submit" className="w-full max-w-xs" disabled={joinMutation.isPending}>
                  {joinMutation.isPending ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : null}
                  Join Classroom
                </Button>
              </form>
            </Form>
          </CardContent>
        </Card>
      </div>
    </Layout>;
}
__name(JoinClassroom, "JoinClassroom");
export {
  JoinClassroom as default
};
