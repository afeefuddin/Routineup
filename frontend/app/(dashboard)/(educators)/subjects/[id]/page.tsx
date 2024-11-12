"use client";

import { useParams, useRouter } from "next/navigation";
import { ArrowLeft, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useMutation, useQuery } from "@tanstack/react-query";
import useAxios from "@/hooks/use-axios";
import useGroup from "@/hooks/use-group";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useState } from "react";
import { Label } from "@radix-ui/react-label";

export default function SubjectDetailsPage() {
  const router = useRouter();
  const params = useParams<{ id: string }>();
  const subjectId = params.id;
  const { api } = useAxios();
  const { groups } = useGroup();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedGroup, setSelectedGroup] = useState<string | undefined>(
    undefined
  );

  const { data: subjectDetails } = useQuery({
    queryKey: ["subject-data", subjectId],
    queryFn: async () => {
      const data = await api.get(`/api/subjects/${subjectId}`);
      console.log(data);
      return data.result;
    },
  });

  const { mutate: addGroupToSubject, isPending } = useMutation({
    mutationKey: ["add-group-to-subject"],
    mutationFn: async () => {
      const { data } = await api.put(`/api/subjects/${subjectId}`, {
        group_id: selectedGroup,
      });
      return data;
    },
    onSuccess: () => {},
  });

  const remainingGroups = groups?.filter(
    (group) =>
      !subjectDetails?.groups?.map((g) => g.public_id).includes(group.public_id)
  );

  console.log(remainingGroups);

  return (
    <div className="container mx-auto p-4 space-y-6">
      <Button variant="ghost" onClick={() => router.back()} className="mb-4">
        <ArrowLeft className="mr-2 h-4 w-4" /> Back to Subjects
      </Button>

      <Card>
        <CardHeader className="bg-secondary">
          <CardTitle className="flex justify-between items-center text-2xl">
            <span>{subjectDetails?.subject_code}</span>
            {subjectDetails?.completed && (
              <span className="text-sm bg-green-500 text-white px-2 py-1 rounded-full">
                Completed
              </span>
            )}
          </CardTitle>
        </CardHeader>
        <CardContent className="pt-6 space-y-6">
          <h1 className="text-3xl font-bold">{subjectDetails?.name}</h1>

          <div className="flex flex-col gap-4">
            <div className="flex flex-row justify-between">
              <h2 className="text-xl font-semibold mb-2">Groups</h2>
              <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                <DialogTrigger asChild>
                  <Button size="sm" disabled={remainingGroups?.length === 0}>
                    <Plus className="mr-2 h-4 w-4" /> Add Group
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Add Group to Subject</DialogTitle>
                    <DialogDescription>
                      Select a group to add to this subject.
                    </DialogDescription>
                  </DialogHeader>
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="groupSelect">Select Group</Label>
                      <Select
                        value={selectedGroup}
                        onValueChange={setSelectedGroup}
                      >
                        <SelectTrigger id="groupSelect">
                          <SelectValue placeholder="Select a group" />
                        </SelectTrigger>
                        <SelectContent>
                          {remainingGroups?.map((group) => (
                            <SelectItem
                              key={group.public_id}
                              value={group.public_id}
                            >
                              {group.group_name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <Button
                      type="submit"
                      className="w-full"
                      disabled={!selectedGroup || isPending}
                      onClick={() => addGroupToSubject()}
                    >
                      Add Group
                    </Button>
                  </div>
                </DialogContent>
              </Dialog>
            </div>
            <ul className="list-disc list-inside">
              {subjectDetails?.groups?.map((group) => (
                <Card key={group.public_id} className="bg-muted p-3 rounded-md">
                  {group.group_name}
                </Card>
              ))}
            </ul>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card>
              <CardHeader>
                <CardTitle>Classes Conducted</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-4xl font-bold">
                  {subjectDetails?.classesConducted}
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Total Students</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-4xl font-bold">
                  {subjectDetails?.totalStudents}
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Average Attendance</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-4xl font-bold">
                  {subjectDetails?.averageAttendance}%
                </p>
              </CardContent>
            </Card>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
