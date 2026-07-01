import { notFound } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { StatusBadge } from "@/components/dashboard/StatusBadge";
import { DocumentPanel } from "@/components/dashboard/DocumentPanel";
import { Timeline } from "@/components/dashboard/Timeline";
import {
  getApplicationById,
  getApplicationDocuments,
  getApplicationTimeline,
} from "@/lib/dashboard/data";
import { saveApplicationNote, updateApplicationStatus } from "../../actions";

export default async function ApplicationDetailsPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const [application, documents, timeline] = await Promise.all([
    getApplicationById(id),
    getApplicationDocuments(id),
    getApplicationTimeline(id),
  ]);

  if (!application) {
    notFound();
  }

  return (
    <div className="mx-auto max-w-7xl">
      <div className="mb-8 flex flex-col justify-between gap-5 lg:flex-row lg:items-start">
        <div>
          <div className="flex flex-wrap items-center gap-4">
            <h1 className="text-3xl font-semibold tracking-tight">
              {application.studentName}
            </h1>
            <StatusBadge status={application.status} />
          </div>
          <p className="mt-1 text-muted-foreground">
            Application ID: {application.id} • {application.institution}
          </p>
        </div>

        <div className="flex flex-wrap gap-3">
          <form action={updateApplicationStatus}>
            <input type="hidden" name="applicationId" value={application.id} />
            <input type="hidden" name="status" value="ON_HOLD" />
            <Button type="submit" variant="outline">
              Hold Application
            </Button>
          </form>
          <form action={updateApplicationStatus}>
            <input type="hidden" name="applicationId" value={application.id} />
            <input type="hidden" name="status" value="COMPLETED" />
            <Button type="submit">Mark as Completed</Button>
          </form>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-12">
        <div className="space-y-8 lg:col-span-8">
          <Accordion
            type="multiple"
            defaultValue={["personal", "education"]}
            className="w-full"
          >
            <AccordionItem value="personal" className="card">
              <AccordionTrigger className="px-6 py-5 text-lg font-medium">
                Personal Information
              </AccordionTrigger>
              <AccordionContent className="space-y-4 px-6 pb-6 text-sm">
                <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                  <div>
                    <span className="text-muted-foreground">KCSE Index:</span>{" "}
                    {application.kcseIndexNumber ?? "Not provided"}
                  </div>
                  <div>
                    <span className="text-muted-foreground">KCPE Index:</span>{" "}
                    {application.kcpeIndexNumber ?? "Not provided"}
                  </div>
                  <div>
                    <span className="text-muted-foreground">Phone:</span>{" "}
                    {application.phone}
                  </div>
                  <div>
                    <span className="text-muted-foreground">Email:</span>{" "}
                    {application.email}
                  </div>
                </div>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="education" className="card">
              <AccordionTrigger className="px-6 py-5 text-lg font-medium">
                Education Details
              </AccordionTrigger>
              <AccordionContent className="space-y-2 px-6 pb-6 text-sm">
                <p>Institution: {application.institution}</p>
                <p>Programme: {application.course}</p>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="parents" className="card">
              <AccordionTrigger className="px-6 py-5 text-lg font-medium">
                Parents &amp; Guarantors
              </AccordionTrigger>
              <AccordionContent className="space-y-4 px-6 pb-6 text-sm">
                <p>
                  <span className="text-muted-foreground">Parent phone:</span>{" "}
                  {application.parentPhone ?? "Not provided"}
                </p>
                <p>
                  <span className="text-muted-foreground">Family status:</span>{" "}
                  {application.familyStatus ?? "Not provided"}
                </p>
              </AccordionContent>
            </AccordionItem>
          </Accordion>

          <Card className="p-6">
            <h3 className="mb-4 font-semibold">Internal Notes</h3>
            <form action={saveApplicationNote}>
              <input type="hidden" name="applicationId" value={application.id} />
              <textarea
                name="note"
                className="min-h-[120px] w-full resize-y rounded-xl border bg-background p-4"
                placeholder="Add notes visible to other agents..."
              />
              <Button type="submit" className="mt-4">
                Save Note
              </Button>
            </form>
          </Card>
        </div>

        <div className="space-y-6 lg:col-span-4">
          <Card className="p-6">
            <h3 className="mb-4 font-semibold">Operational Summary</h3>
            <div className="space-y-4 text-sm">
              <div className="flex justify-between gap-4">
                <span className="text-muted-foreground">Priority</span>
                <span className="font-medium">{application.priority}</span>
              </div>
              <Separator />
              <div className="flex justify-between gap-4">
                <span className="text-muted-foreground">Assigned to</span>
                <span className="font-medium">
                  {application.assignedTo ?? "Unassigned"}
                </span>
              </div>
              <Separator />
              <div className="flex justify-between gap-4">
                <span className="text-muted-foreground">Documents</span>
                <span className="font-medium">
                  {application.documentStatus.replace("_", " ")}
                </span>
              </div>
            </div>
          </Card>

          <DocumentPanel documents={documents} />
          <Timeline events={timeline} />
        </div>
      </div>
    </div>
  );
}
