export type DashboardRole = "SUPER_ADMIN" | "CUSTOMER_CARE_AGENT";

export type ApplicationStatus =
  | "DRAFT"
  | "SUBMITTED"
  | "UNASSIGNED"
  | "ASSIGNED"
  | "CONTACTING"
  | "WAITING_DOCUMENTS"
  | "WAITING_PARENT"
  | "READY"
  | "PROCESSING"
  | "COMPLETED"
  | "ON_HOLD"
  | "REJECTED";

export type Priority = "HIGH" | "MEDIUM" | "LOW";

export interface DashboardUser {
  id: string;
  name: string;
  email: string;
  phone: string;
  department: string;
  role: DashboardRole;
}

export interface DashboardMetric {
  title: string;
  value: string;
  change?: string;
  changeType?: "positive" | "negative" | "neutral";
}

export interface DashboardApplication {
  id: string;
  studentName: string;
  email: string;
  phone: string;
  institution: string;
  course: string;
  status: ApplicationStatus;
  priority: Priority;
  submittedAt: string;
  assignedTo?: string;
  parentPhone?: string;
  kcseIndexNumber?: string;
  kcpeIndexNumber?: string;
  familyStatus?: string;
  documentStatus: "COMPLETE" | "MISSING" | "PENDING_REVIEW";
}

export interface DashboardAgent {
  id: string;
  name: string;
  email: string;
  assignedCount: number;
  capacityPercent: number;
  status: "available" | "busy" | "offline";
  avgProcessingTime: string;
}

export interface ActivityEvent {
  id: string;
  title: string;
  actor: string;
  time: string;
}

export interface ApplicationDocument {
  id: string;
  name: string;
  status: "Verified" | "Pending" | "Rejected";
  date: string;
  url?: string;
}

export interface DashboardSummary {
  role: DashboardRole;
  user: DashboardUser;
  metrics: DashboardMetric[];
  recentActivity: ActivityEvent[];
  priorityQueue: DashboardApplication[];
  myQueue: DashboardApplication[];
}

export interface AnalyticsData {
  kpis: DashboardMetric[];
  processingTrend: Array<{ day: string; time: number }>;
  statusDistribution: Array<{
    name: ApplicationStatus;
    label: string;
    value: number;
    color: string;
  }>;
  agentPerformance: Array<{ name: string; applications: number; avgTime: number }>;
}
