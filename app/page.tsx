import Link from "next/link";
import {
  ArrowRight,
  CheckCircle2,
  FileText,
  GraduationCap,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

export default function Home() {
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
        <section className="py-16 text-center sm:py-24">
          <p className="text-sm font-bold uppercase tracking-wide text-primary">
            Application Assistance Portal
          </p>
          <h1 className="mt-4 text-4xl font-extrabold tracking-tight text-text-primary sm:text-5xl">
            Start your HELB & HEF application today
          </h1>
          <p className="mx-auto mt-6 max-w-xl text-lg text-text-secondary">
            Complete your details in about 8 minutes. We will review your
            submission and call you to confirm the next steps.
          </p>

          <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Button
              size="lg"
              className="h-14 px-8 text-base shadow-xl shadow-primary/30 transition-all hover:scale-105 hover:shadow-2xl"
              asChild
            >
              <Link href="/apply">
                Start Application
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
            <Button size="lg" variant="outline" className="h-14 px-8" asChild>
              <Link href="/instructions">
                <FileText className="mr-2 h-5 w-5" />
                View Instructions
              </Link>
            </Button>
          </div>

          <div className="mt-8 flex flex-col items-center justify-center gap-4 text-sm font-medium text-text-secondary sm:flex-row sm:gap-8">
            <span className="flex items-center gap-2">
              <CheckCircle2 className="h-5 w-5 text-success" />
              Secure Application
            </span>
            <span className="flex items-center gap-2">
              <CheckCircle2 className="h-5 w-5 text-success" />
              Professional Assistance
            </span>
            <span className="flex items-center gap-2">
              <CheckCircle2 className="h-5 w-5 text-success" />
              Confirmation Call
            </span>
          </div>
        </section>

        <section className="mb-16">
          <Card className="border-warning/30 bg-warning-light">
            <CardContent className="p-6 sm:p-8">
              <div className="flex items-start gap-4">
                <FileText className="h-8 w-8 shrink-0 text-warning" />
                <div>
                  <h2 className="text-lg font-bold text-[#8f5d02]">
                    Have your details ready
                  </h2>
                  <p className="mt-2 text-sm text-[#8f5d02]/90">
                    You will need accurate student, parent or guardian, school,
                    payment, and document information. Review the instructions
                    first if you are not sure what to prepare.
                  </p>
                  <Button
                    variant="outline"
                    className="mt-5 border-warning/30 bg-white text-[#8f5d02] hover:bg-warning-light"
                    asChild
                  >
                    <Link href="/instructions">Read Instructions</Link>
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>

        <section className="mb-16">
          <h2 className="text-2xl font-bold text-text-primary">
            Choose Your Service
          </h2>

          <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-3">
            <Card className="flex flex-col shadow-sm transition-colors hover:border-primary/50">
              <CardContent className="flex h-full flex-col p-6">
                <h3 className="font-bold text-text-primary">HELB & HEF</h3>
                <p className="mt-4 flex items-baseline gap-1 text-3xl font-extrabold text-text-primary">
                  KSh 750
                </p>
                <ul className="mt-6 flex-1 space-y-3 text-sm text-text-secondary">
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-5 w-5 shrink-0 text-success" />
                    Application Assistance
                  </li>
                </ul>
                <Button
                  variant="outline"
                  className="mt-8 w-full border-primary/20 bg-primary-light/20 text-primary hover:bg-primary hover:text-white"
                  asChild
                >
                  <Link href="/apply">Select</Link>
                </Button>
              </CardContent>
            </Card>

            <Card className="relative flex flex-col border-2 border-primary shadow-xl">
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-primary px-3 py-1 text-xs font-bold text-white">
                Most Popular
              </div>
              <CardContent className="flex h-full flex-col p-6">
                <h3 className="font-bold text-text-primary">
                  HELB + HEF + KRA PIN
                </h3>
                <p className="mt-4 flex items-baseline gap-1 text-3xl font-extrabold text-text-primary">
                  KSh 850
                </p>
                <ul className="mt-6 flex-1 space-y-3 text-sm text-text-secondary">
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-5 w-5 shrink-0 text-success" />
                    Application Assistance
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-5 w-5 shrink-0 text-success" />
                    KRA PIN Assistance
                  </li>
                </ul>
                <Button className="mt-8 w-full shadow-md" asChild>
                  <Link href="/apply">Select</Link>
                </Button>
              </CardContent>
            </Card>

            <Card className="flex flex-col shadow-sm transition-colors hover:border-primary/50">
              <CardContent className="flex h-full flex-col p-6">
                <h3 className="font-bold text-text-primary">
                  HELB + HEF <br />
                  <span className="text-sm font-medium text-text-muted">
                    + Single Parent Cert
                  </span>
                </h3>
                <p className="mt-4 flex items-baseline gap-1 text-3xl font-extrabold text-text-primary">
                  KSh 950
                </p>
                <ul className="mt-6 flex-1 space-y-3 text-sm text-text-secondary">
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-5 w-5 shrink-0 text-success" />
                    Application Assistance
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-5 w-5 shrink-0 text-success" />
                    Certificate Assistance
                  </li>
                </ul>
                <Button
                  variant="outline"
                  className="mt-8 w-full border-primary/20 bg-primary-light/20 text-primary hover:bg-primary hover:text-white"
                  asChild
                >
                  <Link href="/apply">Select</Link>
                </Button>
              </CardContent>
            </Card>
          </div>
        </section>

        <section className="rounded-lg bg-primary px-6 py-14 text-center text-white sm:px-12">
          <h2 className="text-3xl font-extrabold tracking-tight">
            Ready to Apply?
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-lg text-primary-light">
            Start now and we will contact you after your submission.
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
