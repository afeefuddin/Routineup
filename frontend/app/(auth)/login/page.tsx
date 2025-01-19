"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import React, { useState } from "react";
import { LoginForm, LoginSchema } from "@/types/auth";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useTransition } from "react";
import { useMutation } from "@tanstack/react-query";
import useAxios from "@/hooks/use-axios";
import { useRouter } from "next/navigation";
import { useToast } from "@/hooks/use-toast";
import { Separator } from "@/components/ui/separator";
import useUser from "@/hooks/use-user";

function Page() {
  const [isPending, startTransition] = useTransition();
  const [loggingIn, isLogginIn] = useState(false);
  const { api: axios, refetchToken } = useAxios(true);
  const { refetch: refetchUser } = useUser();
  const router = useRouter();
  const { toast } = useToast();
  const { mutate: login } = useMutation({
    mutationKey: ["login"],
    mutationFn: async (data: LoginForm) => {
      isLogginIn(true);
      const response = await axios?.post("/public/api/login", data);
      return response;
    },
    onSuccess: (values) => {
      localStorage.setItem("token", values.result.token);
      refetchToken();
      refetchUser();
      router.push("/home");
    },
    onError: () => {
      isLogginIn(false);
      toast({
        title: "Invalid credintials",
      });
    },
  });
  const form = useForm<LoginForm>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });
  const onSubmit = (values: LoginForm) => {
    startTransition(() => {
      login(values);
    });
  };

  return (
    <div className="h-screen flex flex-col bg-white">
      <Link href="/">
        <div className="w-full p-4 text-text text-xl font-semibold">
          RoutineUp
        </div>
      </Link>
      <div className=" flex  w-full h-full">
        <Card className=" mx-auto border-none shadow-none ">
          <CardHeader className="space-y-1">
            <CardTitle className="text-3xl text-center text-text">
              Welcome back
            </CardTitle>
          </CardHeader>
          <CardContent className="grid gap-4">
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="flex flex-col gap-2"
              >
                <div className="grid gap-2">
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email</FormLabel>
                        <FormControl>
                          <Input
                            id="email"
                            type="email"
                            {...field}
                            placeholder="m@example.com"
                            className="bg-zinc-100 border-none focus:bg-background focus-visible:ring-black focus-visible:ring-2 h-12 px-4 font-semibold"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <div className="grid gap-2">
                  <FormField
                    control={form.control}
                    name="password"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Password</FormLabel>
                        <FormControl>
                          <Input
                            id="password"
                            type="password"
                            {...field}
                            placeholder="Your Password"
                            className="bg-zinc-100 border-none focus:bg-background focus-visible:ring-black focus-visible:ring-2 h-12 px-4 font-semibold"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <Button
                  type="submit"
                  disabled={isPending}
                  className="w-80 md:w-96 py-6 rounded-xl font-bold text-md mt-6"
                  loading={loggingIn}
                >
                  Login
                </Button>
              </form>
            </Form>
          </CardContent>
          <div className="px-4 mb-4 flex items-center justify-center">
            <Separator />
          </div>
          <CardFooter className="flex items-center justify-center">
            <div className="text-md font-medium">
              Don&apos;t have an account?{" "}
              <Link href="/signup" className="underline">
                Signup
              </Link>
            </div>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}

export default Page;
