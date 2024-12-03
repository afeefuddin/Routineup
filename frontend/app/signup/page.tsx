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

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { SignupForm, SignupSchema, UserDataSchema } from "@/types/auth";
import Link from "next/link";
import React, { useState, useTransition } from "react";
import { useMutation } from "@tanstack/react-query";
import useAxios from "@/hooks/use-axios";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { z } from "zod";
import { useToast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";
import { AxiosError } from "axios";
import { Separator } from "@/components/ui/separator";

function Page() {
  const [, startTransition] = useTransition();
  const [showOtpPanel, setShowOtpPanel] = useState(false);
  const [userId, setUserid] = useState("");
  const [otpValue, setOtpValue] = React.useState("");
  const { toast } = useToast();
  const router = useRouter();
  const { api } = useAxios(true);
  const [signingUp, setSigninUp] = useState(false);
  const { mutate } = useMutation({
    mutationKey: ["signup"],
    mutationFn: async (data: SignupForm) => {
      setSigninUp(true);
      const response = await api?.post("/public/api/signup", data);
      return response;
    },
    onSuccess: (raw_data) => {
      const signupDataSchema = z.object({ result: UserDataSchema });
      const data = signupDataSchema.parse(raw_data);
      setUserid(data.result.public_id);
      setShowOtpPanel(true);
    },
    onError: (error: AxiosError) => {
      setSigninUp(false);
      toast({
        title: error.response?.data?.result.message,
        // message: error.message,
        // type: "error",
      });
    },
  });

  const { mutate: verifyOtp, isPending: isOtpPending } = useMutation({
    mutationKey: ["verify-otp"],
    mutationFn: async (data: { otp: string; userId: string }) => {
      const response = await api.put("/public/api/signup/" + userId, data);
      return response;
    },
    onSuccess: () => {
      toast({
        title: "Account created",
      });
      router.push("/login");
    },
    onError: (error: AxiosError) => {
      toast({
        title: error.response?.data?.result.message,
        // message: error.message,
        // type: "error",
      });
    },
  });
  const form = useForm<SignupForm>({
    resolver: zodResolver(SignupSchema),
    defaultValues: {
      email: "",
      username: "",
      password: "",
    },
  });
  function onSubmit(values: SignupForm) {
    startTransition(() => {
      mutate(values);
    });
  }
  return (
    <div className="h-screen flex flex-col bg-white">
      <Link href="/">
        <div className="p-4 text-xl font-bold">RoutineUp</div>
      </Link>
      <div className="flex w-full h-full">
        {showOtpPanel && userId.length > 0 ? (
          <Card className=" m-auto">
            <CardHeader className="space-y-1">
              <CardTitle>Enter the OTP</CardTitle>
              <CardDescription>
                An OTP has been sent to your email address
              </CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col gap-4">
              <InputOTP
                maxLength={6}
                value={otpValue}
                onChange={(value) => setOtpValue(value)}
              >
                <InputOTPGroup>
                  <InputOTPSlot index={0} />
                  <InputOTPSlot index={1} />
                  <InputOTPSlot index={2} />
                </InputOTPGroup>
                <InputOTPSeparator />
                <InputOTPGroup>
                  <InputOTPSlot index={3} />
                  <InputOTPSlot index={4} />
                  <InputOTPSlot index={5} />
                </InputOTPGroup>
              </InputOTP>
              <Button
                onClick={() => {
                  if (otpValue.length === 6) {
                    verifyOtp({ otp: otpValue, userId });
                  }
                }}
              >
                {isOtpPending ? "Verifying..." : "Verify OTP"}
              </Button>
            </CardContent>
          </Card>
        ) : (
          <Card className="mx-auto border-none shadow-none">
            <CardHeader className="space-y-1">
              <CardTitle className="text-3xl text-center">
                Create an account
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
                      name="username"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Username</FormLabel>
                          <FormControl>
                            <Input
                              id="username"
                              type="text"
                              {...field}
                              placeholder="john_doe"
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
                    className="w-80 md:w-96 py-6 text-md font-bold rounded-xl mt-6"
                    loading={signingUp}
                  >
                    Create account
                  </Button>
                </form>
              </Form>
            </CardContent>
            <div className="px-4 mb-4 flex items-center justify-center">
              <Separator />
            </div>
            <CardFooter className="flex items-center justify-center">
              <div className="text-md font-medium">
                Already have an account?{" "}
                <Link href="/login" className="underline">
                  Login
                </Link>
              </div>
            </CardFooter>
          </Card>
        )}
      </div>
    </div>
  );
}

export default Page;
