import Link from "next/link";
import {
  ArrowLeft,
  ArrowRight,
  Building,
  Camera,
  CheckCircle2,
  FileText,
  GraduationCap,
  IdCard,
  School,
  Smartphone,
  Star,
  Stethoscope,
  TriangleAlert,
  Users,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

export default function InstructionsPage() {
  return (
    <main className="min-h-screen bg-background pb-20">
      <nav className="sticky top-0 z-50 border-b border-border bg-white/80 backdrop-blur-md">
        <div className="mx-auto flex max-w-4xl items-center justify-between px-6 py-4">
          <Link href="/" className="flex items-center gap-3">
            <GraduationCap className="h-6 w-6 text-primary" />
            <span className="text-xl font-bold text-text-primary">
              HELB & HEF
            </span>
          </Link>
          <Button asChild>
            <Link href="/apply">Start Application</Link>
          </Button>
        </div>
      </nav>

      <div className="mx-auto max-w-3xl px-6">
        <section className="py-12 sm:py-16">
          <Button variant="ghost" className="-ml-4 mb-8" asChild>
            <Link href="/">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back Home
            </Link>
          </Button>

          <p className="text-sm font-bold uppercase tracking-wide text-primary">
            Application Guide
          </p>
          <h1 className="mt-3 text-4xl font-extrabold tracking-tight text-text-primary sm:text-5xl">
            Instructions before you apply
          </h1>
          <p className="mt-5 max-w-2xl text-lg text-text-secondary">
            Prepare these details and documents before starting your HELB & HEF
            application. Accurate information helps avoid delays.
          </p>
          <div className="mt-8">
            <Button size="lg" className="h-14 px-8 text-base" asChild>
              <Link href="/apply">
                Start Application
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          </div>
        </section>

        <section className="mb-16">
          <h2 className="text-2xl font-bold text-text-primary">
            Who Can Apply?
          </h2>
          <p className="mt-2 text-text-secondary">
            This service is for students who completed KCSE 2025 and have been
            placed to pursue:
          </p>

          <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-3">
            {[
              { icon: GraduationCap, label: "Degree" },
              { icon: School, label: "TVET" },
              { icon: Stethoscope, label: "KMTC" },
            ].map((item) => (
              <Card
                key={item.label}
                className="transition-all hover:border-primary/30 hover:shadow-md"
              >
                <CardContent className="flex flex-col items-center justify-center gap-2 p-6">
                  <item.icon className="h-10 w-10 text-primary" />
                  <span className="font-bold text-text-primary">
                    {item.label}
                  </span>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        <section className="mb-16">
          <Card className="border-warning/30 bg-warning-light">
            <CardContent className="p-6 sm:p-8">
              <div className="flex items-start gap-4">
                <TriangleAlert className="h-8 w-8 shrink-0 text-warning" />
                <div>
                  <h3 className="text-lg font-bold text-[#8f5d02]">
                    Important
                  </h3>
                  <p className="mt-2 text-sm text-[#8f5d02]/90">
                    Please provide only accurate and truthful information.
                    <br />
                    <br />
                    Even a small mistake when entering your details may delay or
                    affect your HELB & HEF application.
                    <br />
                    <br />
                    <strong>Double-check all information before submitting.</strong>
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>

        <section className="mb-16">
          <h2 className="text-2xl font-bold text-text-primary">
            What Happens After Submission
          </h2>

          <div className="mt-8 space-y-6">
            {[
              "Fill in the application",
              "Submit your information",
              "Receive a confirmation call",
              "Provide any additional documents if requested",
              "We assist you throughout the application process",
            ].map((text, index, arr) => (
              <div key={text} className="relative flex items-center gap-6">
                {index !== arr.length - 1 && (
                  <div className="absolute left-[1.15rem] top-10 h-10 w-0.5 bg-gray-200" />
                )}
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-gray-50 text-sm font-bold text-text-primary shadow-sm ring-1 ring-gray-200">
                  {index + 1}
                </div>
                <p className="font-medium text-text-primary">{text}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="mb-16">
          <h2 className="text-2xl font-bold text-text-primary">
            Before You Begin
          </h2>
          <p className="mt-2 text-text-secondary">Make sure you have:</p>

          <div className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-2">
            {[
              { icon: Camera, text: "Passport-sized photo / clear selfie" },
              {
                icon: IdCard,
                text: "National ID / Waiting Card / Birth Certificate",
              },
              { icon: FileText, text: "Supporting documents" },
              { icon: Smartphone, text: "Active phone number" },
              { icon: Building, text: "Bank or M-Pesa account (if applicable)" },
            ].map((item) => (
              <Card key={item.text} className="shadow-sm">
                <CardContent className="flex items-center gap-4 p-4">
                  <item.icon className="h-6 w-6 text-primary" />
                  <span className="text-sm font-medium text-text-primary">
                    {item.text}
                  </span>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        <section className="mb-16">
          <Card className="border-2 border-primary/20 bg-primary-light/10">
            <CardContent className="p-6 sm:p-8">
              <div className="flex items-start gap-4">
                <FileText className="h-10 w-10 shrink-0 text-primary" />
                <div>
                  <h3 className="text-xl font-bold text-text-primary">
                    Single Parent Certificate
                  </h3>
                  <p className="mt-2 font-medium text-text-secondary">
                    Don&apos;t have one? No problem.
                  </p>
                  <div className="mt-4 space-y-2 text-sm text-text-muted">
                    <p>Download the form</p>
                    <p>Print it</p>
                    <p>Fill it together with your parent</p>
                    <p>Have it signed</p>
                    <p>Upload it during the application</p>
                  </div>
                  <Button variant="outline" className="mt-6">
                    Download Certificate Form
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>

        <section className="mb-16">
          <h2 className="text-2xl font-bold text-text-primary">
            Required Documents
          </h2>

          <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-3">
            <Card className="text-center shadow-sm">
              <CardContent className="flex flex-col items-center p-6">
                <Camera className="mb-4 h-10 w-10 text-primary" />
                <h4 className="font-bold text-text-primary">Passport Photo</h4>
                <p className="mt-2 text-xs text-text-muted">
                  Clear selfie
                  <br />
                  Plain background
                </p>
              </CardContent>
            </Card>

            <Card className="text-center shadow-sm">
              <CardContent className="flex flex-col items-center p-6">
                <IdCard className="mb-4 h-10 w-10 text-primary" />
                <h4 className="font-bold text-text-primary">National ID</h4>
                <p className="mt-2 text-xs text-text-muted">
                  or Waiting Card
                  <br />
                  or Birth Certificate
                </p>
              </CardContent>
            </Card>

            <Card className="text-center shadow-sm">
              <CardContent className="flex flex-col items-center p-6">
                <FileText className="mb-4 h-10 w-10 text-primary" />
                <h4 className="font-bold text-text-primary">
                  Supporting Documents
                </h4>
                <p className="mt-2 text-xs text-text-muted">
                  Upload each document on a flat surface.
                </p>
              </CardContent>
            </Card>
          </div>
        </section>

        <section className="mb-16">
          <Card className="bg-gray-50">
            <CardContent className="p-6 sm:p-8">
              <div className="flex items-center gap-3">
                <Users className="h-8 w-8 text-primary" />
                <h2 className="text-2xl font-bold text-text-primary">
                  Guarantors
                </h2>
              </div>

              <div className="mt-6 grid grid-cols-1 gap-8 sm:grid-cols-2">
                <div>
                  <p className="font-semibold text-text-primary">
                    If both parents are available
                  </p>
                  <ul className="mt-3 space-y-2 text-sm text-text-secondary">
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="h-4 w-4 text-success" />
                      Parent
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="h-4 w-4 text-success" />
                      Parent
                    </li>
                  </ul>
                </div>
                <div>
                  <p className="font-semibold text-text-primary">
                    If only one parent is available
                  </p>
                  <ul className="mt-3 space-y-2 text-sm text-text-secondary">
                    {["Parent", "Uncle", "Aunt", "Sibling", "Responsible Adult"].map(
                      (person) => (
                        <li key={person} className="flex items-center gap-2">
                          <CheckCircle2 className="h-4 w-4 text-success" />
                          {person}
                        </li>
                      ),
                    )}
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>

        <section className="mb-16">
          <Card className="shadow-sm">
            <CardContent className="p-6 sm:p-8">
              <div className="flex items-center gap-3">
                <Building className="h-8 w-8 text-primary" />
                <h2 className="text-2xl font-bold text-text-primary">
                  Bank / M-Pesa
                </h2>
              </div>

              <div className="mt-6 space-y-6">
                <div>
                  <p className="font-semibold text-text-primary">
                    If you have a National ID
                  </p>
                  <ul className="mt-3 space-y-3 text-sm text-text-secondary">
                    <li className="flex items-center gap-3 rounded-lg bg-gray-50 p-3">
                      <CheckCircle2 className="h-4 w-4 text-success" />
                      Open a bank account in your own name
                    </li>
                    <li className="flex items-center gap-3 rounded-lg bg-gray-50 p-3">
                      <CheckCircle2 className="h-4 w-4 text-success" />
                      Register M-Pesa in your own name
                    </li>
                  </ul>
                </div>

                <div className="border-t border-border pt-6">
                  <p className="font-semibold text-text-primary">
                    If you only have a Birth Certificate or Waiting Card
                  </p>
                  <p className="mt-2 text-sm text-text-secondary">
                    Visit the bank with your parent or guardian.
                  </p>
                  <div className="mt-4 inline-flex items-center gap-2 rounded-lg bg-warning-light/50 px-4 py-2 text-sm font-medium text-warning">
                    <Star className="h-4 w-4 fill-warning" />
                    Recommended: PostBank Junior Account
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>

        <section className="mb-16">
          <Card className="border-0 bg-[#0f172a] text-white">
            <CardContent className="p-6 sm:p-8">
              <div className="flex flex-col items-center text-center sm:flex-row sm:gap-6 sm:text-left">
                <Smartphone className="mb-4 h-12 w-12 text-primary sm:mb-0" />
                <div>
                  <h3 className="text-xl font-bold">Parent Verification</h3>
                  <p className="mt-2 text-sm text-gray-300">
                    After submitting, your parent will receive a verification
                    request.
                    <br />
                    <br />
                    <strong>
                      Please remain available together with your parent to
                      provide any verification codes if requested.
                    </strong>
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>

        <section className="rounded-lg bg-primary px-6 py-14 text-center text-white sm:px-12">
          <h2 className="text-3xl font-extrabold tracking-tight">
            Ready to Apply?
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-lg text-primary-light">
            Once your documents and details are ready, start the application.
          </p>
          <div className="mt-8">
            <Button
              size="lg"
              className="h-14 bg-white px-8 text-lg font-bold text-primary shadow-xl transition-all hover:scale-105 hover:bg-gray-50"
              asChild
            >
              <Link href="/apply">
                Start Application
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          </div>
        </section>
      </div>
    </main>
  );
}
