"use client";

import { useState } from "react";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import TagInput from "@/components/mutli-data-input";
import { useMutation } from "@tanstack/react-query";
import useAxios from "@/hooks/use-axios";
import useGroup from "@/hooks/use-group";

export default function GroupsPage() {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [newGroup, setNewGroup] = useState<string>("");
  const { api } = useAxios();
  const [emails, setEmails] = useState<string[]>([]);
  const { groups, refetch } = useGroup();
  const { mutate: createGroup, isPending: creatingGroup } = useMutation({
    mutationKey: ["createGroup"],
    mutationFn: async () => {
      const { data } = await api.post("/api/group", {
        group_name: newGroup,
        emails: emails,
      });
      return data;
    },
    onSuccess: () => {
      refetch();
      setNewGroup("");
      setEmails([]);
      setIsDialogOpen(false);
    },
  });

  return (
    <div className="container mx-auto p-4 space-y-6">
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <header className="flex justify-between items-center">
          <h1 className="text-3xl font-bold">Your Groups</h1>
          <DialogTrigger asChild>
            <Button className="bg-primary text-primary-foreground hover:bg-primary/90">
              <Plus className="mr-2 h-4 w-4" /> Add Group
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add New Group</DialogTitle>
              <DialogDescription>
                Enter the details for your new group.
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <Label htmlFor="name">Group Name</Label>
                <Input
                  id="name"
                  name="name"
                  value={newGroup}
                  onChange={(e) => setNewGroup(e.target.value)}
                  required
                />
              </div>
              <div>
                <Label htmlFor="emails">Emails</Label>
                <TagInput tags={emails} setTags={setEmails} />
              </div>
              <Button
                type="submit"
                className="w-full"
                onClick={() => {
                  console.log(emails);
                  if (newGroup && emails) {
                    createGroup();
                  }
                }}
                loading={creatingGroup}
              >
                Add Group
              </Button>
            </div>
          </DialogContent>
        </header>

        {groups?.length === 0 ? (
          <Card className="p-6 text-center">
            <h2 className="text-xl font-semibold mb-2">No groups found</h2>
            <p className="text-muted-foreground mb-4">
              Get started by adding your first groups to your routine.
            </p>
            <DialogTrigger asChild>
              <Button className="bg-primary text-primary-foreground hover:bg-primary/90">
                <Plus className="mr-2 h-4 w-4" /> Add Your First Group
              </Button>
            </DialogTrigger>
          </Card>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {groups?.map((subject) => (
              <Card key={subject.id}>
                <CardHeader className="bg-secondary">
                  <CardTitle className="flex justify-between items-center text-lg">
                    Total Students: 0
                  </CardTitle>
                </CardHeader>
                <CardContent className="pt-4">
                  <h3 className="font-semibold text-lg mb-4">
                    {subject.group_name}
                  </h3>
                  {/* <Link href={`/subjects/${subject.id}`}> */}
                  <Button variant="outline" className="w-full">
                    View Details
                  </Button>
                  {/* </Link> */}
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </Dialog>
    </div>
  );
}
