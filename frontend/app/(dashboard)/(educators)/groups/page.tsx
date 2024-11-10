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
import TagInput from "@/components/mutli-data-input";

// This would typically come from your database or API
const subjects = [];

export default function GroupsPage() {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [newSubject, setNewSubject] = useState({ name: "", code: "" });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewSubject({ ...newSubject, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Here you would typically send the new subject data to your backend
    console.log("New subject:", newSubject);
    setIsDialogOpen(false);
    setNewSubject({ name: "", code: "" });
  };

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
            <div  className="space-y-4">
              <div>
                <Label htmlFor="name">Group Name</Label>
                <Input
                  id="name"
                  name="name"
                  value={newSubject.name}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div>
                <Label htmlFor="emails">Emails</Label>
                <TagInput />
              </div>
              <Button type="submit" className="w-full">
                Add Subject
              </Button>
            </div>
          </DialogContent>
        </header>

        {subjects.length === 0 ? (
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
            {subjects.map((subject) => (
              <Card key={subject.id}>
                <CardHeader className="bg-secondary">
                  <CardTitle className="flex justify-between items-center text-lg">
                    <span>{subject.code}</span>
                    {subject.completed && (
                      <span className="text-xs bg-green-500 text-white px-2 py-1 rounded-full">
                        Completed
                      </span>
                    )}
                  </CardTitle>
                </CardHeader>
                <CardContent className="pt-4">
                  <h3 className="font-semibold text-lg mb-4">{subject.name}</h3>
                  <Link href={`/subjects/${subject.id}`}>
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
