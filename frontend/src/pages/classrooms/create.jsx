var __defProp = Object.defineProperty;
var __name = (target, value) => __defProp(target, "name", { value, configurable: true });
import { useLocation } from "wouter";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useCreateClassroom, getGetMyClassroomsQueryKey } from "@workspace/api-client-react";
import { useQueryClient } from "@tanstack/react-query";
import { Layout } from "@/components/layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Loader2, ArrowLeft } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Link } from "wouter";
const createClassroomSchema = z.object({
  name: z.string().min(3, "Name must be at least 3 characters"),
  subject: z.string().min(2, "Subject is required"),
  department: z.string().min(2, "Department is required"),
  semester: z.string().min(1, "Semester is required"),
  description: z.string().optional()
});
function CreateClassroom() {
  const [_, setLocation] = useLocation();
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const form = useForm({
    resolver: zodResolver(createClassroomSchema),
    defaultValues: { name: "", subject: "", department: "", semester: "", description: "" }
  });
  const createMutation = useCreateClassroom();
  const onSubmit = /* @__PURE__ */ __name((values) => {
    createMutation.mutate(
      { data: values },
      {
        onSuccess: /* @__PURE__ */ __name((data) => {
          queryClient.invalidateQueries({ queryKey: getGetMyClassroomsQueryKey() });
          toast({ title: "Classroom created", description: "Your classroom is ready." });
          setLocation(`/classrooms/${data.id}`);
        }, "onSuccess"),
        onError: /* @__PURE__ */ __name((err) => {
          toast({
            variant: "destructive",
            title: "Failed to create classroom",
            description: err.error?.error || "Please try again."
          });
        }, "onError")
      }
    );
  }, "onSubmit");
  return <Layout>
      <div className="p-6 md:p-8 max-w-2xl mx-auto space-y-6">
        <Link href="/dashboard" className="inline-flex items-center text-sm font-medium text-muted-foreground hover:text-foreground">
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Dashboard
        </Link>
        
        <Card>
          <CardHeader>
            <CardTitle className="text-2xl">Create Classroom</CardTitle>
            <CardDescription>Set up a new space to share resources and collaborate.</CardDescription>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <FormField
    control={form.control}
    name="name"
    render={({ field }) => <FormItem>
                      <FormLabel>Classroom Name</FormLabel>
                      <FormControl>
                        <Input placeholder="e.g. CS101 Fall 2023" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>}
  />
                
                <div className="grid md:grid-cols-2 gap-6">
                  <FormField
    control={form.control}
    name="subject"
    render={({ field }) => <FormItem>
                        <FormLabel>Subject</FormLabel>
                        <FormControl>
                          <Input placeholder="e.g. Data Structures" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>}
  />
                  
                  <FormField
    control={form.control}
    name="department"
    render={({ field }) => <FormItem>
                        <FormLabel>Department</FormLabel>
                        <FormControl>
                          <Input placeholder="e.g. Computer Science" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>}
  />
                </div>

                <FormField
    control={form.control}
    name="semester"
    render={({ field }) => <FormItem>
                      <FormLabel>Semester</FormLabel>
                      <FormControl>
                        <Input placeholder="e.g. Fall 2023" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>}
  />

                <FormField
    control={form.control}
    name="description"
    render={({ field }) => <FormItem>
                      <FormLabel>Description (Optional)</FormLabel>
                      <FormControl>
                        <Textarea placeholder="What is this classroom for?" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>}
  />

                <Button type="submit" className="w-full" disabled={createMutation.isPending}>
                  {createMutation.isPending ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : null}
                  Create Classroom
                </Button>
              </form>
            </Form>
          </CardContent>
        </Card>
      </div>
    </Layout>;
}
__name(CreateClassroom, "CreateClassroom");
export {
  CreateClassroom as default
};
