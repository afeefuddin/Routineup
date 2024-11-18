"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import React from "react";
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

function Page() {
  const [isPending, startTransition] = useTransition();
  const { api: axios, refetchToken } = useAxios(true);
  const router = useRouter();
  const { toast } = useToast();
  const { mutate: login, isPending: loggingIn } = useMutation({
    mutationKey: ["login"],
    mutationFn: async (data: LoginForm) => {
      const response = await axios?.post("/public/api/login", data);
      return response;
    },
    onSuccess: (values) => {
      console.log(values.result);
      localStorage.setItem("token", values.result.token);
      refetchToken();
      console.log("Logged in");
      router.push("/home");
    },
    onError: () => {
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
      console.log(values);
      login(values);
    });
  };

  return (
    <div className="h-screen flex items-center w-full bg-teal-200">
      <Card className="max-w-sm m-auto">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl">Login to your account</CardTitle>
          <CardDescription>
            Enter your email below to create your account
          </CardDescription>
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
                className="w-full mt-6"
              >
                Login
              </Button>
            </form>
          </Form>
        </CardContent>
        <CardFooter className="flex items-center justify-center">
          <div className="text-sm">
            Don&apos;t have an account?{" "}
            <Link href="/signup" className="text-blue-600">
              Signup
            </Link>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
}

export default Page;
