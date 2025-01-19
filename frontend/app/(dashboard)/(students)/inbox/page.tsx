"use client";

import { Check, X } from "lucide-react";
import { Button } from "@/components/ui/button";
// import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { useMutation, useQuery } from "@tanstack/react-query";
import useAxios from "@/hooks/use-axios";
import { z } from "zod";
import { groupSchema } from "@/types/group";

const inviteSchema = z.object({
  results: z.array(
    z.object({
      public_id: z.string(),
      group: groupSchema,
      created_at: z.string().optional(),
      invited_by: z.object({
        public_id: z.string(),
        username: z.string(),
        email: z.string(),
      }),
    })
  ),
});

export default function InvitesPage() {
  //   const [invites, setInvites] = useState(initialInvites);
  const { api } = useAxios();
  const { data: invites, refetch } = useQuery({
    queryKey: ["invites"],
    queryFn: async () => {
      const raw_data = await api.get("/api/invite");
      const data = inviteSchema.parse(raw_data);
      return data.results;
    },
  });

  const { mutate } = useMutation({
    mutationKey: ["update-invite"],
    mutationFn: async (data: {
      status: "accepted" | "declined";
      id: string;
    }) => {
      await api.put("/api/invite/" + data.id, {
        status: data.status,
      });
    },
    onSuccess() {
      refetch();
    },
  });

  const handleAccept = (id: string) => {
    mutate({ status: "accepted", id });
  };

  const handleDecline = (id: string) => {
    mutate({ status: "declined", id });
  };

  return (
    <div className=" p-4">
      <Card className="bg-background border-muted">
        <CardHeader>
          <CardTitle className="text-4xl">Recent Invites</CardTitle>
          <p className=" text-muted-foreground">
            Your latest group invitations
          </p>
        </CardHeader>
        <CardContent className="space-y-1">
          {invites?.length ? (
            invites.map((invite, index) => (
              <div key={invite.public_id}>
                <div className="flex items-center justify-between py-3">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <h3 className="font-medium">{invite.group.group_name}</h3>
                    </div>
                    <p className="text-muted-foreground">
                      Invited by {invite.invited_by.username}
                    </p>
                    <p className="text-muted-foreground">{invite.created_at}</p>
                  </div>
                  <div className="flex gap-2">
                    <Button
                      size="sm"
                      variant="outline"
                      className="text-green-500 border-green-500/20 hover:bg-green-500/10 hover:text-green-500"
                      onClick={() => handleAccept(invite.public_id)}
                    >
                      <Check className="w-4 h-4 mr-1" />
                      Accept
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      className="text-red-500 border-red-500/20 hover:bg-red-500/10 hover:text-red-500"
                      onClick={() => handleDecline(invite.public_id)}
                    >
                      <X className="w-4 h-4 mr-1" />
                      Decline
                    </Button>
                  </div>
                </div>
                {index < invites.length - 1 && <Separator />}
              </div>
            ))
          ) : (
            <p className="text-center py-6 text-muted-foreground">
              No pending invites
            </p>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
