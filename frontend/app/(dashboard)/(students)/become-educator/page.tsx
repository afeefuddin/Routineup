"use client";

import { useState } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import useAxios from "@/hooks/use-axios";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export default function BecomeEducatorPage() {
  const [institutionName, setInstitutionName] = useState("");
  const { api } = useAxios();
  const queryClient = useQueryClient();
  const { mutate } = useMutation({
    mutationKey: ["become-educator"],
    mutationFn: async () => {
      const response = await api.post("/api/educator", {
        institution_name: institutionName,
      });
      return response;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["user"] });
    },
  });

  return (
    <div className="container mx-auto p-4 space-y-8">
      <h1 className="text-4xl font-bold text-center mb-8">
        Become an Educator
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
        <Card className="w-full max-w-md mx-auto">
          <CardHeader>
            <CardTitle>Join Our Educator Community</CardTitle>
            <CardDescription>
              Enter your institution details to get started
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col gap-2">
              <div className="space-y-2">
                <Label htmlFor="institutionName">Institution Name</Label>
                <Input
                  id="institutionName"
                  value={institutionName}
                  onChange={(e) => setInstitutionName(e.target.value)}
                  placeholder="Enter your institution name"
                  required
                />
              </div>
              <Button
                type="submit"
                className="w-full"
                onClick={() => !!institutionName && mutate()}
              >
                Become an Educator
              </Button>
            </div>
          </CardContent>
        </Card>

        <div className="space-y-4 mx-auto md:mx-0 ">
          <Image
            src="/educator1.jpeg"
            alt="Educator teaching students"
            width={400}
            height={200}
            className="rounded-lg shadow-md"
          />
        </div>
      </div>

      <div className="mt-12 text-center">
        <h2 className="text-2xl font-semibold mb-4">Why Become an Educator?</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Inspire Students</CardTitle>
            </CardHeader>
            <CardContent>
              <Image
                src="/educator2.jpeg"
                alt="Inspiration icon"
                width={100}
                height={100}
                className="mx-auto mb-4"
              />
              <p>
                Shape the future by inspiring and guiding the next generation of
                learners.
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Flexible Teaching</CardTitle>
            </CardHeader>
            <CardContent>
              <Image
                src="/educator3.jpeg"
                alt="Flexibility icon"
                width={100}
                height={100}
                className="mx-auto mb-4"
              />
              <p>
                Enjoy the flexibility of creating your own schedule and
                curriculum.
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Grow Your Network</CardTitle>
            </CardHeader>
            <CardContent>
              <Image
                src="/educator4.jpeg"
                alt="Network icon"
                width={100}
                height={100}
                className="mx-auto mb-4"
              />
              <p>
                Connect with other educators and expand your professional
                network.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
