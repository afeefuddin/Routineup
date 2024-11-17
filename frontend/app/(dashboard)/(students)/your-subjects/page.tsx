"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import useSubjects from "@/hooks/use-subjects";

export default function SubjectsPage() {
  const { subjects } = useSubjects();

  return (
    <div className="container mx-auto p-4 space-y-6">
      {!subjects || subjects?.length === 0 ? (
        <Card className="p-6 text-center">
          <h2 className="text-xl font-semibold mb-2">No subjects found</h2>
          <p className="text-muted-foreground mb-4">
            Get started by adding your first subject to your routine.
          </p>
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
    </div>
  );
}
