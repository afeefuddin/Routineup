import Header from "@/components/header";
import FeatureCard from "@/components/home/feature-card";
import WhoAreYou from "@/components/home/who-are-you";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Home() {
  return (
    <>
      <Header />
      <div className="max-w-5xl mx-auto w-full gap-6 bg-background">
        <div className="py-24 flex flex-col gap-8 items-center ">
          <div className="text-7xl font-bold text-center text-text">
            Manage your <span>class schedules</span> with ease, in few clicks.
          </div>
          <div className="text-xl">
            Simplify class routine management online with <span>RoutineUp</span>
          </div>
          <div>
            <Link href="/home">
              <Button className="px-16 py-6 text-text rounded-2xl text-xl font-bold">
                {" "}
                Try Now
              </Button>
            </Link>
          </div>
        </div>
        <FeatureCard />
        <WhoAreYou />
      </div>
    </>
  );
}
