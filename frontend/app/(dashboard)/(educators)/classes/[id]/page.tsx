"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import useAxios from "@/hooks/use-axios";
import useSubjects from "@/hooks/use-subjects";
import { lectureWithSubjectSchema } from "@/types/lecture";
import { useMutation, useQuery } from "@tanstack/react-query";
import { format } from "date-fns";
import { useParams, useRouter } from "next/navigation";
import { useState } from "react";
import { z } from "zod";

type NewClass = {
  topic: string;
  description: string;
  subject: string;
  start_time: string;
  end_time: string;
};

export default function Classes() {
  const [newClass, setNewClass] = useState<NewClass>({
    topic: "",
    description: "",
    subject: "",
    start_time: "",
    end_time: "",
  });

  const params = useParams<{ id: string }>();
  const { api } = useAxios();

  const { data: classData } = useQuery({
    queryKey: ["classes-data", params.id],
    queryFn: async () => {
      const raw_data = await api.get(`/api/lecture/${params.id}`);
      const data = z
        .object({ result: lectureWithSubjectSchema })
        .parse(raw_data);
      const result = data.result;
      if (result) {
        setNewClass({
          description: result.description,
          topic: result.topic,
          subject: result.subject.public_id,
          start_time: format(result.start_time, "yyyy-MM-dd'T'HH:mm"),
          end_time: format(result.end_time!, "yyyy-MM-dd'T'HH:mm"),
        });
      }
      return result;
    },
    enabled: !!params.id,
  });

  const router = useRouter();

  const { subjects } = useSubjects();
  const { mutate: addClass } = useMutation({
    mutationKey: ["update-class"],
    mutationFn: async (data: NewClass) => {
      await api.put("/api/lecture/" + params.id, {
        topic: data.topic,
        description: data.description,
        start_time: data.start_time,
        end_time: data.end_time,
      });
    },
    onSuccess() {
      router.push("/subjects");
      setNewClass({
        topic: "",
        description: "",
        subject: "",
        start_time: "",
        end_time: "",
      });
    },
  });

  const handleAddClass = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("New class:", newClass);
    addClass(newClass);
  };
  console.log(classData);
  if (!classData) {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex flex-col gap-4 p-4">
      <div>
        <div className="text-4xl font-semibold">Update the class</div>
      </div>
      <div>
        <form onSubmit={handleAddClass} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="topic">Topic</Label>
            <Input
              id="topic"
              value={newClass.topic}
              onChange={(e) =>
                setNewClass({ ...newClass, topic: e.target.value })
              }
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Input
              id="description"
              value={newClass.description}
              onChange={(e) =>
                setNewClass({ ...newClass, description: e.target.value })
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
              disabled
            >
              <SelectTrigger id="subjectSelect">
                <SelectValue placeholder="Select a subject" />
              </SelectTrigger>
              <SelectContent>
                {subjects?.map((subject) => (
                  <SelectItem key={subject.public_id} value={subject.public_id}>
                    {subject.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="start_time">Start Time</Label>
            <Input
              id="start_time"
              type="datetime-local"
              value={newClass.start_time}
              onChange={(e) =>
                setNewClass({ ...newClass, start_time: e.target.value })
              }
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="end_time">End Time</Label>
            <Input
              id="end_time"
              type="datetime-local"
              value={newClass.end_time}
              onChange={(e) =>
                setNewClass({ ...newClass, end_time: e.target.value })
              }
            />
          </div>
          <Button type="submit" className="w-full">
            Update Class
          </Button>
        </form>
      </div>
    </div>
  );
}
