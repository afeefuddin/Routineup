"use client";

import { useParams, useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useQuery } from "@tanstack/react-query";
import useAxios from "@/hooks/use-axios";
import useGroup from "@/hooks/use-group";

export default function SubjectDetailsPage() {
  const router = useRouter();
  const params = useParams<{ id: string }>();
  const subjectId = params.id;
  const { api } = useAxios();
  const { groups } = useGroup();

  const { data: subjectDetails } = useQuery({
    queryKey: ["subject-data", subjectId],
    queryFn: async () => {
      const data = await api.get(`/api/subjects/${subjectId}`);
      console.log(data);
      return data.result;
    },
  });
 

  return (
    <div className="container mx-auto p-4 space-y-6">
      <Button variant="ghost" onClick={() => router.back()} className="mb-4">
        <ArrowLeft className="mr-2 h-4 w-4" /> Back to Subjects
      </Button>

      <Card>
        <CardHeader className="bg-secondary">
          <CardTitle className="flex justify-between items-center text-2xl">
            <span>{subjectDetails?.code}</span>
            {subjectDetails?.completed && (
              <span className="text-sm bg-green-500 text-white px-2 py-1 rounded-full">
                Completed
              </span>
            )}
          </CardTitle>
        </CardHeader>
        <CardContent className="pt-6 space-y-6">
          <h1 className="text-3xl font-bold">{subjectDetails?.name}</h1>

          <div>
            <h2 className="text-xl font-semibold mb-2">Groups</h2>
            <ul className="list-disc list-inside">
              {subjectDetails?.groups?.map((group) => (
                <li key={group.id}>{group.name}</li>
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
