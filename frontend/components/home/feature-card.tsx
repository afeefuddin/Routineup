import { Card } from "../ui/card";

export default function FeatureCard() {
  return (
    <div className="flex flex-col items-center gap-8">
      <div className="text-4xl font-bold">With us scheduling is easy</div>
      <div className="grid grid-cols-3 gap-4">
        <Card className="flex flex-col gap-2 bg-white p-4">
          <div className="p-1 bg-muted w-fit rounded">01</div>
          <div className="font-bold text-lg">Create a group </div>
          <div>
            You can create a group of students, by inviting them via emails to
            join you group
          </div>
        </Card>
        <Card className="flex flex-col gap-2 bg-white p-4">
          <div className="p-1 bg-muted w-fit rounded">02</div>
          <div className="font-bold text-lg">Add a subject </div>
          <div>
            Create a new subject from your account, add students group to that
            subject
          </div>
        </Card>
        <Card className="flex flex-col gap-2 bg-white p-4">
          <div className="p-1 bg-muted w-fit rounded">03</div>
          <div className="font-bold text-lg">Schedule a class </div>
          <div>
            Schedule a class for a subject whenever you want, and all student
            groups will be invited.
          </div>
        </Card>
      </div>
    </div>
  );
}
