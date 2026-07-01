import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { getCurrentDashboardUser } from "@/lib/dashboard/data";
import { saveProfileSettings } from "../actions";

export default async function SettingsPage() {
    const user = await getCurrentDashboardUser();
    const initials = user.name
        .split(" ")
        .map((name) => name[0])
        .join("");

    return (
        <div className="mx-auto max-w-4xl space-y-10">
            <div>
                <h1 className="text-3xl font-semibold tracking-tight">Settings</h1>
                <p className="text-muted-foreground">
                    Manage admin profile details and backend-controlled account settings.
                </p>
            </div>

            <Tabs defaultValue="profile" className="w-full">
                <TabsList className="grid w-full grid-cols-3">
                    <TabsTrigger value="profile">Profile</TabsTrigger>
                    <TabsTrigger value="notifications">Notifications</TabsTrigger>
                    <TabsTrigger value="security">Security</TabsTrigger>
                </TabsList>

                <TabsContent value="profile" className="mt-8 space-y-8">
                    <Card className="p-8">
                        <div className="flex items-center gap-6">
                            <Avatar className="h-24 w-24">
                                <AvatarFallback className="text-4xl">{initials}</AvatarFallback>
                            </Avatar>
                            <div>
                                <p className="font-medium">{user.name}</p>
                                <p className="mt-1 text-sm text-muted-foreground">{user.role.replace("_", " ")}</p>
                            </div>
                        </div>

                        <Separator className="my-8" />

                        <form action={saveProfileSettings}>
                            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                                <div className="space-y-2">
                                    <Label htmlFor="fullName">Full Name</Label>
                                    <Input id="fullName" name="fullName" defaultValue={user.name} />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="email">Email Address</Label>
                                    <Input id="email" name="email" type="email" defaultValue={user.email} />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="phone">Phone Number</Label>
                                    <Input id="phone" name="phone" defaultValue={user.phone} />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="department">Department</Label>
                                    <Input id="department" name="department" defaultValue={user.department} />
                                </div>
                            </div>

                            <Button type="submit" className="mt-8">Save Profile</Button>
                        </form>
                    </Card>
                </TabsContent>

                <TabsContent value="notifications" className="mt-8">
                    <Card className="p-8">
                        <h2 className="text-lg font-semibold">Notification Events</h2>
                        <p className="mt-2 text-sm text-muted-foreground">
                            These events are ready to connect to email, SMS, WhatsApp, or in-app notifications.
                        </p>
                        <div className="mt-6 space-y-4 text-sm">
                            {[
                                "New application submitted",
                                "Application assigned to an agent",
                                "Applicant uploads requested documents",
                                "Application status changes",
                            ].map((event) => (
                                <div key={event} className="rounded-lg border p-4">
                                    {event}
                                </div>
                            ))}
                        </div>
                    </Card>
                </TabsContent>

                <TabsContent value="security" className="mt-8">
                    <Card className="space-y-8 p-8">
                        <div>
                            <h3 className="mb-2 font-semibold">Authentication</h3>
                            <p className="text-sm text-muted-foreground">
                                Connect this section to the selected auth provider for password reset,
                                role management, and session revocation.
                            </p>
                        </div>

                        <Separator />

                        <div>
                            <h3 className="mb-4 font-semibold">Current Session</h3>
                            <div className="rounded-lg border p-4 text-sm">
                                Dashboard session for {user.email}
                            </div>
                        </div>
                    </Card>
                </TabsContent>
            </Tabs>
        </div>
    );
}
