"use client";

import { useState } from "react";
import {
  format,
  startOfMonth,
  endOfMonth,
  eachDayOfInterval,
  isSameMonth,
  isSameDay,
  addMonths,
  subMonths,
} from "date-fns";
import { ChevronLeft, ChevronRight, Plus } from "lucide-react";
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

// Mock data for classes
const classes = [
  {
    id: 1,
    name: "Mathematics",
    date: new Date(2023, 5, 15, 10, 0),
    subject: "MATH101",
  },
  {
    id: 2,
    name: "Physics",
    date: new Date(2023, 5, 15, 14, 0),
    subject: "PHYS201",
  },
  {
    id: 3,
    name: "Chemistry",
    date: new Date(2023, 5, 18, 11, 0),
    subject: "CHEM301",
  },
  {
    id: 4,
    name: "Biology",
    date: new Date(2023, 5, 20, 9, 0),
    subject: "BIO101",
  },
];

// Mock data for subjects
const subjects = [
  { id: 1, code: "MATH101", name: "Introduction to Calculus" },
  { id: 2, code: "PHYS201", name: "Classical Mechanics" },
  { id: 3, code: "CHEM301", name: "Organic Chemistry" },
  { id: 4, code: "BIO101", name: "General Biology" },
];

export default function UpcomingClassesPage() {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [newClass, setNewClass] = useState({
    name: "",
    subject: "",
    date: "",
    time: "",
  });

  const monthStart = startOfMonth(currentMonth);
  const monthEnd = endOfMonth(currentMonth);
  const monthDays = eachDayOfInterval({ start: monthStart, end: monthEnd });

  const handlePreviousMonth = () => setCurrentMonth(subMonths(currentMonth, 1));
  const handleNextMonth = () => setCurrentMonth(addMonths(currentMonth, 1));

  const handleDateClick = (day: Date) => {
    setSelectedDate(day);
    setNewClass((prev) => ({ ...prev, date: format(day, "yyyy-MM-dd") }));
  };

  const handleAddClass = (e: React.FormEvent) => {
    e.preventDefault();
    // Here you would typically send the new class data to your backend
    console.log("New class:", newClass);
    setIsDialogOpen(false);
    setNewClass({ name: "", subject: "", date: "", time: "" });
  };

  const classesForSelectedDate = selectedDate
    ? classes.filter((c) => isSameDay(c.date, selectedDate))
    : [];

  return (
    <div className="container mx-auto p-4 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Upcoming Classes</h1>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="mr-2 h-4 w-4" /> Schedule Class
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Schedule New Class</DialogTitle>
              <DialogDescription>
                Enter the details for the new class.
              </DialogDescription>
            </DialogHeader>
            <form onSubmit={handleAddClass} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="className">Class Name</Label>
                <Input
                  id="className"
                  value={newClass.name}
                  onChange={(e) =>
                    setNewClass({ ...newClass, name: e.target.value })
                  }
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="subjectSelect">Subject</Label>
                <Select
                  value={newClass.subject}
                  onValueChange={(value) =>
                    setNewClass({ ...newClass, subject: value })
                  }
                >
                  <SelectTrigger id="subjectSelect">
                    <SelectValue placeholder="Select a subject" />
                  </SelectTrigger>
                  <SelectContent>
                    {subjects.map((subject) => (
                      <SelectItem key={subject.id} value={subject.code}>
                        {subject.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="classDate">Date</Label>
                <Input
                  id="classDate"
                  type="date"
                  value={newClass.date}
                  onChange={(e) =>
                    setNewClass({ ...newClass, date: e.target.value })
                  }
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="classTime">Time</Label>
                <Input
                  id="classTime"
                  type="time"
                  value={newClass.time}
                  onChange={(e) =>
                    setNewClass({ ...newClass, time: e.target.value })
                  }
                  required
                />
              </div>
              <Button type="submit" className="w-full">
                Schedule Class
              </Button>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-md font-medium">
              {format(currentMonth, "MMMM yyyy")}
            </CardTitle>
            <div className="space-x-2">
              <Button
                variant="outline"
                size="icon"
                onClick={handlePreviousMonth}
              >
                <span className="sr-only">Previous month</span>
                <ChevronLeft className="h-4 w-4" />
              </Button>
              <Button variant="outline" size="icon" onClick={handleNextMonth}>
                <span className="sr-only">Next month</span>
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-7 gap-2 text-center">
              {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
                <div key={day} className="font-medium text-muted-foreground">
                  {day}
                </div>
              ))}
            </div>
            <div className="grid grid-cols-7 gap-2 mt-2">
              {monthDays.map((day, dayIdx) => (
                <div
                  key={day.toString()}
                  className={`aspect-square flex flex-col items-center justify-center p-2 rounded-md cursor-pointer ${
                    isSameMonth(day, currentMonth)
                      ? "hover:bg-primary hover:text-primary-foreground"
                      : "text-muted-foreground"
                  } ${
                    isSameDay(day, selectedDate || new Date())
                      ? "bg-primary text-primary-foreground"
                      : isSameMonth(day, currentMonth)
                      ? "bg-secondary"
                      : "bg-muted"
                  }`}
                  onClick={() => handleDateClick(day)}
                >
                  <span className="text-sm">{format(day, "d")}</span>
                  {classes.some((c) => isSameDay(c.date, day)) && (
                    <div className="w-1 h-1 bg-primary-foreground rounded-full mt-1" />
                  )}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>
              {selectedDate
                ? `Classes for ${format(selectedDate, "MMMM d, yyyy")}`
                : "Select a date to view classes"}
            </CardTitle>
          </CardHeader>
          <CardContent>
            {classesForSelectedDate.length > 0 ? (
              <div className="space-y-4">
                {classesForSelectedDate.map((classItem) => (
                  <Card key={classItem.id}>
                    <CardHeader>
                      <CardTitle>{classItem.name}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p>
                        <strong>Subject:</strong> {classItem.subject}
                      </p>
                      <p>
                        <strong>Time:</strong>{" "}
                        {format(classItem.date, "h:mm a")}
                      </p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : selectedDate ? (
              <p className="text-muted-foreground">
                No classes scheduled for this date.
              </p>
            ) : (
              <p className="text-muted-foreground">
                Select a date to view scheduled classes.
              </p>
            )}
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>All Upcoming Classes</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {classes.map((classItem) => (
              <Card key={classItem.id}>
                <CardHeader>
                  <CardTitle>{classItem.name}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p>
                    <strong>Subject:</strong> {classItem.subject}
                  </p>
                  <p>
                    <strong>Date:</strong>{" "}
                    {format(classItem.date, "MMMM d, yyyy")}
                  </p>
                  <p>
                    <strong>Time:</strong> {format(classItem.date, "h:mm a")}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
