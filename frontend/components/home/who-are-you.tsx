import { Card } from "../ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";

export default function WhoAreYou() {
  return (
    <div className="mt-16 flex flex-col gap-4 items-center">
      <div className="text-3xl font-semibold text-center">Who are you</div>
      <Tabs className="flex flex-col items-center" defaultValue="teacher">
        <TabsList className="grid w-80 grid-cols-2 bg-white">
          <TabsTrigger value="teacher">Teacher</TabsTrigger>
          <TabsTrigger value="student">Student</TabsTrigger>
        </TabsList>
        <TabsContent
          value="teacher"
          className="flex flex-col items-center mt-6"
        >
          <Card className="p-4 w-2/3 rounded-none text-lg">
            Welcome Teacher, you'll be interacting most of the time with our
            platform and we look forward to make your experience better
          </Card>
        </TabsContent>
        <TabsContent
          value="student"
          className="flex flex-col items-center mt-0"
        >
          <Card className="p-4 w-2/3 rounded-none text-lg">
            Welcome Student, we'll be interacting most of the time with you,
            giving you updates about your classes and schedule.
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
