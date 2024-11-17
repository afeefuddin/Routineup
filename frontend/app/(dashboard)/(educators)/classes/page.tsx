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
import useAxios from "@/hooks/use-axios";
import { z } from "zod";
import { lectureSchema } from "@/types/lecture";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import Link from "next/link";

// Mock data for classes

export default function UpcomingClassesPage() {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const monthStart = startOfMonth(currentMonth);
  const monthEnd = endOfMonth(currentMonth);
  const monthDays = eachDayOfInterval({ start: monthStart, end: monthEnd });

  const handlePreviousMonth = () => setCurrentMonth(subMonths(currentMonth, 1));
  const handleNextMonth = () => setCurrentMonth(addMonths(currentMonth, 1));

  const handleDateClick = (day: Date) => {
    setSelectedDate(day);
  };

  const { api } = useAxios();
  const router = useRouter();

  const { data: classes } = useQuery({
    queryKey: ["classes"],
    queryFn: async () => {
      const raw_data = await api.get("/api/lecture");
      const data = z
        .object({ results: z.array(lectureSchema) })
        .parse(raw_data);
      return data.results;
    },
  });

  console.log(classes);

  const classesForSelectedDate = selectedDate
    ? classes?.filter((c) => isSameDay(c.start_time, selectedDate))
    : [];

  return (
    <div className="container mx-auto p-4 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Upcoming Classes</h1>
        <Button onClick={() => router.push("/classes/add")}>
          <Plus className="mr-2 h-4 w-4" /> Schedule Class
        </Button>
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
              {monthDays.map((day) => (
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
                  {classes?.some((c) => isSameDay(c.start_time, day)) && (
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
            {classesForSelectedDate?.length ? (
              <div className="space-y-4">
                {classesForSelectedDate?.map((classItem) => (
                  <Link
                    href={`/classes/${classItem.public_id}`}
                    key={classItem.public_id}
                  >
                    <Card>
                      <CardHeader>
                        <CardTitle>{classItem.topic}</CardTitle>
                      </CardHeader>
                      <CardContent></CardContent>
                    </Card>
                  </Link>
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
          <div className="flex flex-col gap-4">
            {classes?.map((classItem) => (
              <Link
                href={`/classes/${classItem.public_id}`}
                key={classItem.public_id}
              >
                <Card>
                  <CardHeader>
                    <CardTitle>{classItem.topic}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-row justify-between">
                      <div>{classItem.description}</div>
                      <div className="text-muted-foreground">
                        {format(classItem.start_time, "Pp")}
                      </div>
                    </div>
                    <div></div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
