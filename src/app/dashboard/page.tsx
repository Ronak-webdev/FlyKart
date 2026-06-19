import { auth } from "@/auth";
import { PrismaClient } from "@prisma/client";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const prisma = new PrismaClient();

export default async function DashboardPage() {
  const session = await auth();
  
  if (!session?.user?.email) return null;

  const user = await prisma.user.findUnique({
    where: { email: session.user.email },
    include: {
      loyalty: true,
      addresses: { take: 1 }
    }
  });

  if (!user) return null;

  const phone = user.addresses?.[0]?.phone || "Not provided";
  const tier = user.loyalty?.tier || "BRONZE";
  const points = user.loyalty?.points || 0;

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold tracking-tight">My Profile</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle>Personal Information</CardTitle>
            <CardDescription>Manage your personal details here.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium text-muted-foreground">Full Name</label>
                <p className="font-medium mt-1">{user.name}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-muted-foreground">Email Address</label>
                <p className="font-medium mt-1">{user.email}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-muted-foreground">Phone Number</label>
                <p className="font-medium mt-1">{phone}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-muted-foreground">Member Since</label>
                <p className="font-medium mt-1">{new Date(user.createdAt).toLocaleDateString()}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-primary/5 border-primary/20">
          <CardHeader>
            <CardTitle className="text-primary flex items-center justify-between">
              Rewards
              <Badge variant="outline" className="bg-primary text-primary-foreground border-none">
                {tier}
              </Badge>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <p className="text-4xl font-bold text-primary">{points}</p>
              <p className="text-sm font-medium text-muted-foreground mt-1">FlyKart Points available</p>
            </div>
            <div className="pt-4 border-t border-primary/10">
              <label className="text-sm font-medium text-muted-foreground block mb-1">Your Loyalty ID</label>
              <code className="bg-background px-3 py-1.5 rounded-md border font-mono text-lg tracking-wider text-foreground select-all">
                {user.id.substring(0, 8).toUpperCase()}
              </code>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
