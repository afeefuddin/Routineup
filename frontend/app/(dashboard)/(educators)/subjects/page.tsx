"use client";

import { useState } from "react";
import Link from "next/link";
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
import { useMutation } from "@tanstack/react-query";
import useAxios from "@/hooks/use-axios";
import useSubjects from "@/hooks/use-subjects";

export default function SubjectsPage() {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [newSubject, setNewSubject] = useState({ name: "", code: "" });
  const { api } = useAxios();
  const { subjects, refetch } = useSubjects();

  const { mutate: AddSubject, isPending: addingSubject } = useMutation({
    mutationKey: ["AddSubject"],
    mutationFn: async () => {
      const { data } = await api.post("/api/subjects", {
        name: newSubject.name,
        subject_code: newSubject.code,
      });
      return data.result;
    },
    onSuccess: () => {
      refetch();
    },
  });
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewSubject({ ...newSubject, [e.target.name]: e.target.value });
  };


  return (
    <div className="container mx-auto p-4 space-y-6">
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold">Your Subjects</h1>
          <DialogTrigger asChild>
            <Button className="bg-primary text-primary-foreground hover:bg-primary/90">
              <Plus className="mr-2 h-4 w-4" /> Add Subject
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add New Subject</DialogTitle>
              <DialogDescription>
                Enter the details for your new subject.
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <Label htmlFor="name">Subject Name</Label>
                <Input
                  id="name"
                  name="name"
                  value={newSubject.name}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div>
                <Label htmlFor="code">Subject Code</Label>
                <Input
                  id="code"
                  name="code"
                  value={newSubject.code}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <Button
                type="submit"
                className="w-full"
                onClick={() => {
                  if (newSubject.name && newSubject.code) {
                    AddSubject();
                  }
                }}
                loading={addingSubject}
              >
                Add Subject
              </Button>
            </div>
          </DialogContent>
        </div>

        {!subjects || subjects?.length === 0 ? (
          <Card className="p-6 text-center">
            <h2 className="text-xl font-semibold mb-2">No subjects found</h2>
            <p className="text-muted-foreground mb-4">
              Get started by adding your first subject to your routine.
            </p>
            <DialogTrigger asChild>
              <Button className="bg-primary text-primary-foreground hover:bg-primary/90">
                <Plus className="mr-2 h-4 w-4" /> Add Your First Subject
              </Button>
            </DialogTrigger>
          </Card>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {subjects.map((subject) => (
              <Card key={subject.public_id}>
                <CardHeader className="bg-secondary">
                  <CardTitle className="flex justify-between items-center text-lg">
                    <span>{subject.subject_code}</span>
                    {subject.completed && (
                      <span className="text-xs bg-green-500 text-white px-2 py-1 rounded-full">
                        Completed
                      </span>
                    )}
                  </CardTitle>
                </CardHeader>
                <CardContent className="pt-4">
                  <h3 className="font-semibold text-lg mb-4">{subject.name}</h3>
                  <Link href={`/subjects/${subject.public_id}`}>
                    <Button variant="outline" className="w-full">
                      View Details
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </Dialog>
    </div>
  );
}
