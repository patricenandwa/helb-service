
import Link from "next/link";
import {
  GraduationCap,
  School,
  Stethoscope,
  TriangleAlert,
  Camera,
  IdCard,
  FileText,
  Smartphone,
  Building,
  Users,
  Star,
  CheckCircle2,
  ArrowRight
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";

export default function Home() {
  return (
    <main className="min-h-screen bg-background pb-20">
      {/* Navigation Bar */}
      <nav className="sticky top-0 z-50 border-b border-border bg-white/80 backdrop-blur-md">
        <div className="mx-auto flex max-w-4xl items-center justify-between px-6 py-4">
          <div className="flex items-center gap-3">
            <GraduationCap className="h-6 w-6 text-primary" />
            <span className="text-xl font-bold text-text-primary">
              HELB & HEF
            </span>
          </div>
          <Button asChild>
            <Link href="/apply">
              Start Application
            </Link>
          </Button>
        </div>
      </nav>

      <div className="mx-auto max-w-3xl px-6">
        {/* 1. Hero Section */}
        <section className="py-16 text-center sm:py-24">
          <h1 className="text-4xl font-extrabold tracking-tight text-text-primary sm:text-5xl">
            HELB & HEF
            <br />
            <span className="text-primary">Application Assistance Portal</span>
          </h1>
          <p className="mx-auto mt-6 max-w-xl text-lg text-text-secondary">
            We help students complete and submit their HELB & HEF applications
            accurately and on time.
          </p>

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

          <div className="mt-10">
            <Button size="lg" className="h-14 px-8 text-base shadow-xl shadow-primary/30 transition-all hover:scale-105 hover:shadow-2xl" asChild>
              <Link href="/apply">
                Start Application
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
            <p className="mt-4 text-xs font-medium text-text-muted">
              Takes approximately 8 minutes
            </p>
          </div>
        </section>

        {/* 2. Eligibility Section */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold text-text-primary">Who Can Apply?</h2>
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
              <Card key={item.label} className="transition-all hover:border-primary/30 hover:shadow-md">
                <CardContent className="flex flex-col items-center justify-center gap-2 p-6">
                  <item.icon className="h-10 w-10 text-primary" />
                  <span className="font-bold text-text-primary">{item.label}</span>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* 3. Important Notice */}
        <section className="mb-16">
          <Card className="border-warning/30 bg-warning-light">
            <CardContent className="p-6 sm:p-8">
              <div className="flex items-start gap-4">
                <TriangleAlert className="h-8 w-8 shrink-0 text-warning" />
                <div>
                  <h3 className="text-lg font-bold text-[#8f5d02]">Important</h3>
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

        {/* 4. Timeline */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold text-text-primary">
            What Happens After Submission
          </h2>

          <div className="mt-8 space-y-6">
            {[
              { num: "1", text: "Fill in the application" },
              { num: "2", text: "Submit your information" },
              { num: "3", text: "Receive a confirmation call" },
              { num: "4", text: "Provide any additional documents if requested" },
              { num: "5", text: "We assist you throughout the application process" },
            ].map((step, index, arr) => (
              <div key={index} className="relative flex items-center gap-6">
                {/* Connector Line */}
                {index !== arr.length - 1 && (
                  <div className="absolute left-[1.15rem] top-10 h-10 w-0.5 bg-gray-200" />
                )}
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-gray-50 text-sm font-bold text-text-primary shadow-sm ring-1 ring-gray-200">
                  {step.num}
                </div>
                <p className="font-medium text-text-primary">{step.text}</p>
              </div>
            ))}
          </div>
        </section>

        {/* 5. Before You Start Checklist */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold text-text-primary">
            Before You Begin
          </h2>
          <p className="mt-2 text-text-secondary">Make sure you have:</p>

          <div className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-2">
            {[
              { icon: Camera, text: "Passport-sized photo / clear selfie" },
              { icon: IdCard, text: "National ID / Waiting Card / Birth Certificate" },
              { icon: FileText, text: "Supporting documents" },
              { icon: Smartphone, text: "Active phone number" },
              { icon: Building, text: "Bank or M-Pesa account (if applicable)" },
            ].map((item, i) => (
              <Card key={i} className="shadow-sm">
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

        {/* 6. Single Parent Certificate */}
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
                    <p>Download the form ↓</p>
                    <p>Print it ↓</p>
                    <p>Fill it together with your parent ↓</p>
                    <p>Have it signed ↓</p>
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

        {/* 7. Required Documents Grid */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold text-text-primary">
            Required Documents
          </h2>

          <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-3">
            <Card className="shadow-sm text-center">
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

            <Card className="shadow-sm text-center">
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

            <Card className="shadow-sm text-center">
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

        {/* 8. Guarantors */}
        <section className="mb-16">
          <Card className="bg-gray-50">
            <CardContent className="p-6 sm:p-8">
              <div className="flex items-center gap-3">
                <Users className="h-8 w-8 text-primary" />
                <h2 className="text-2xl font-bold text-text-primary">Guarantors</h2>
              </div>

              <div className="mt-6 grid grid-cols-1 gap-8 sm:grid-cols-2">
                <div>
                  <p className="font-semibold text-text-primary">
                    If both parents are available
                  </p>
                  <ul className="mt-3 space-y-2 text-sm text-text-secondary">
                    <li className="flex items-center gap-2">
                      <span className="text-success">✔</span> Parent
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="text-success">✔</span> Parent
                    </li>
                  </ul>
                </div>
                <div>
                  <p className="font-semibold text-text-primary">
                    If only one parent is available
                  </p>
                  <ul className="mt-3 space-y-2 text-sm text-text-secondary">
                    <li className="flex items-center gap-2">
                      <span className="text-success">✔</span> Parent
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="text-success">✔</span> Uncle
                    </li>
                    <li className="text-xs text-text-muted">or</li>
                    <li className="flex items-center gap-2">
                      <span className="text-success">✔</span> Aunt
                    </li>
                    <li className="text-xs text-text-muted">or</li>
                    <li className="flex items-center gap-2">
                      <span className="text-success">✔</span> Sibling
                    </li>
                    <li className="text-xs text-text-muted">or</li>
                    <li className="flex items-center gap-2">
                      <span className="text-success">✔</span> Responsible Adult
                    </li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* 9. Bank Information */}
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
                      <span className="text-success">✔</span>
                      Open a bank account in your own name
                    </li>
                    <li className="pl-8 text-xs text-text-muted">or</li>
                    <li className="flex items-center gap-3 rounded-lg bg-gray-50 p-3">
                      <span className="text-success">✔</span>
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

        {/* 10. Parent Verification */}
        <section className="mb-16">
          <Card className="border-0 bg-[#0f172a] text-white">
            <CardContent className="p-6 sm:p-8">
              <div className="flex flex-col items-center text-center sm:flex-row sm:text-left sm:gap-6">
                <Smartphone className="mb-4 h-12 w-12 text-primary sm:mb-0" />
                <div>
                  <h3 className="text-xl font-bold">Parent Verification</h3>
                  <p className="mt-2 text-sm text-gray-300">
                    After submitting, your parent will receive a verification request.
                    <br />
                    <br />
                    <strong>
                      Please remain available together with your parent to provide any
                      verification codes if requested.
                    </strong>
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* 11. Pricing */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold text-text-primary">
            Choose Your Service
          </h2>

          <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-3">
            {/* Card 1 */}
            <Card className="flex flex-col shadow-sm hover:border-primary/50 transition-colors">
              <CardContent className="flex flex-col h-full p-6">
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
                <Button variant="outline" className="mt-8 w-full border-primary/20 bg-primary-light/20 text-primary hover:bg-primary hover:text-white" asChild>
                  <Link href="/apply">Select</Link>
                </Button>
              </CardContent>
            </Card>

            {/* Card 2 */}
            <Card className="relative flex flex-col border-2 border-primary shadow-xl">
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-primary px-3 py-1 text-xs font-bold text-white">
                Most Popular
              </div>
              <CardContent className="flex flex-col h-full p-6">
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

            {/* Card 3 */}
            <Card className="flex flex-col shadow-sm hover:border-primary/50 transition-colors">
              <CardContent className="flex flex-col h-full p-6">
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
                <Button variant="outline" className="mt-8 w-full border-primary/20 bg-primary-light/20 text-primary hover:bg-primary hover:text-white" asChild>
                  <Link href="/apply">Select</Link>
                </Button>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* 12. Final CTA */}
        <section className="rounded-3xl bg-primary px-6 py-16 text-center text-white sm:px-12 sm:py-20">
          <h2 className="text-3xl font-extrabold tracking-tight sm:text-4xl">
            Ready to Apply?
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-lg text-primary-light">
            Make sure you have all the required documents before proceeding. Your
            application takes approximately 8 minutes.
          </p>
          <div className="mt-10">
            <Button size="lg" className="h-14 px-8 text-lg font-bold bg-white text-primary hover:bg-gray-50 shadow-xl hover:scale-105 transition-all" asChild>
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
