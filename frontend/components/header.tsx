"use client";
import Link from "next/link";
import { Button } from "./ui/button";
import useUser from "@/hooks/use-user";

export default function Header() {
  const { user } = useUser();
  return (
    <div className="p-6 flex justify-between items-center border border-x-0 border-t-0">
      <div className="text-2xl font-bold text-primary-foreground">
        RoutineUp
      </div>
      <div className="gap-x-12 flex">
        <div>Features</div>
        <div>About</div>
        <div>For Educators</div>
      </div>
      <div className="flex gap-4 items-center">
        {!!user ? (
          <>
            <Link href="/home">
              <Button>Profile</Button>
            </Link>
          </>
        ) : (
          <>
            <Link href="/login">
              <div>Login</div>
            </Link>
            <Link href="/signup">
              <Button> Signup </Button>
            </Link>
          </>
        )}
      </div>
    </div>
  );
}
