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
    onSuccess: (data) => {
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
    <div className="min-h-screen flex items-center w-full bg-teal-200">
      {showOtpPanel && userId.length > 0 ? (
        <Card className="max-w-sm m-auto">
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
        <Card className="max-w-sm m-auto">
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl">Create an account</CardTitle>
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
                <Button className="w-full mt-6" loading={signingUp}>
                  Create account
                </Button>
              </form>
            </Form>
          </CardContent>
          <CardFooter className="flex items-center justify-center">
            <div className="text-sm">
              Already have an account?{" "}
              <Link href="/login" className="text-blue-600">
                Login
              </Link>
            </div>
          </CardFooter>
        </Card>
      )}
    </div>
  );
}

export default Page;
