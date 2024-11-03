import { Button } from "./ui/button";

export default function Header() {
  return (
    <div className="p-6 flex justify-between items-center ">
      <div className="text-2xl font-bold text-primary-foreground">
        RoutineUp
      </div>
      <div className="gap-x-12 flex">
        <div>Features</div>
        <div>About</div>
        <div>For Educators</div>
      </div>
      <div className="flex gap-4 items-center">
        <div>Login</div>
        <Button> Signup </Button>
      </div>
    </div>
  );
}
