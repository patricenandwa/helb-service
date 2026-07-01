import type {
  AnalyticsData,
  ActivityEvent,
  ApplicationDocument,
  DashboardAgent,
  DashboardApplication,
  DashboardRole,
  DashboardSummary,
  DashboardUser,
} from "./types";

const currentUser: DashboardUser = {
  id: "usr_admin_001",
  name: "Jane Doe",
  email: "jane.doe@helb.co.ke",
  phone: "+254 712 345 678",
  department: "Operations",
  role: "SUPER_ADMIN",
};

const applications: DashboardApplication[] = [
  {
    id: "APP-2026-7842",
    studentName: "Esther Mwangi",
    email: "esther.mwangi@example.com",
    phone: "+254 712 345 678",
    institution: "University of Nairobi",
    course: "Bachelor of Commerce",
    status: "READY",
    priority: "HIGH",
    submittedAt: "2 days ago",
    assignedTo: "Sarah Kimani",
    parentPhone: "+254 700 111 222",
    kcseIndexNumber: "12345678901",
    kcpeIndexNumber: "1234567890",
    familyStatus: "Single parent",
    documentStatus: "COMPLETE",
  },
  {
    id: "APP-2026-7843",
    studentName: "Michael Otieno",
    email: "michael.otieno@example.com",
    phone: "+254 733 123 456",
    institution: "Kenyatta University",
    course: "Bachelor of Education",
    status: "CONTACTING",
    priority: "MEDIUM",
    submittedAt: "1 day ago",
    assignedTo: "Mercy Wanjiku",
    parentPhone: "+254 711 987 654",
    kcseIndexNumber: "22345678901",
    kcpeIndexNumber: "2234567890",
    familyStatus: "Both parents alive",
    documentStatus: "PENDING_REVIEW",
  },
  {
    id: "APP-2026-7844",
    studentName: "Aisha Njeri",
    email: "aisha.njeri@example.com",
    phone: "+254 722 456 789",
    institution: "Moi University",
    course: "Clinical Medicine",
    status: "WAITING_DOCUMENTS",
    priority: "HIGH",
    submittedAt: "5 hours ago",
    parentPhone: "+254 799 000 111",
    kcseIndexNumber: "32345678901",
    kcpeIndexNumber: "3234567890",
    familyStatus: "Parent/parents deceased",
    documentStatus: "MISSING",
  },
  {
    id: "APP-2026-7845",
    studentName: "David Kipchoge",
    email: "david.kipchoge@example.com",
    phone: "+254 701 222 333",
    institution: "Egerton University",
    course: "Agricultural Economics",
    status: "UNASSIGNED",
    priority: "LOW",
    submittedAt: "3 hours ago",
    parentPhone: "+254 710 222 333",
    kcseIndexNumber: "42345678901",
    kcpeIndexNumber: "4234567890",
    familyStatus: "Both parents alive",
    documentStatus: "PENDING_REVIEW",
  },
  {
    id: "APP-2026-7846",
    studentName: "Mary Wambui",
    email: "mary.wambui@example.com",
    phone: "+254 745 010 101",
    institution: "KMTC Nairobi",
    course: "Nursing",
    status: "COMPLETED",
    priority: "MEDIUM",
    submittedAt: "Today",
    assignedTo: "Sarah Kimani",
    parentPhone: "+254 745 010 102",
    kcseIndexNumber: "52345678901",
    kcpeIndexNumber: "5234567890",
    familyStatus: "Adopted",
    documentStatus: "COMPLETE",
  },
];

const agents: DashboardAgent[] = [
  {
    id: "agent_001",
    name: "Sarah Kimani",
    email: "sarah.kimani@helb.co.ke",
    assignedCount: 4,
    capacityPercent: 65,
    status: "available",
    avgProcessingTime: "1.8h",
  },
  {
    id: "agent_002",
    name: "John Mwenda",
    email: "john.mwenda@helb.co.ke",
    assignedCount: 8,
    capacityPercent: 92,
    status: "busy",
    avgProcessingTime: "2.4h",
  },
  {
    id: "agent_003",
    name: "Mercy Wanjiku",
    email: "mercy.wanjiku@helb.co.ke",
    assignedCount: 2,
    capacityPercent: 35,
    status: "available",
    avgProcessingTime: "1.5h",
  },
];

export async function getCurrentDashboardUser(): Promise<DashboardUser> {
  // Backend integration point: replace with authenticated session lookup.
  return currentUser;
}

export async function getDashboardSummary(
  role: DashboardRole = currentUser.role,
): Promise<DashboardSummary> {
  return {
    role,
    user: currentUser,
    metrics: [
      { title: "Applications Today", value: "248", change: "12%", changeType: "positive" },
      { title: "Pending Assignment", value: "87", change: "3%", changeType: "negative" },
      { title: "Completed Today", value: "164", change: "8%", changeType: "positive" },
      { title: "Avg Processing Time", value: "2.4h", changeType: "neutral" },
      { title: "Active Agents", value: "24", change: "2", changeType: "positive" },
    ],
    recentActivity: [
      {
        id: "evt_001",
        title: "Esther Mwangi moved to Ready",
        actor: "Sarah Kimani",
        time: "2 minutes ago",
      },
      {
        id: "evt_002",
        title: "Michael Otieno assigned to Mercy Wanjiku",
        actor: "System",
        time: "18 minutes ago",
      },
      {
        id: "evt_003",
        title: "Aisha Njeri requested to upload missing documents",
        actor: "John Mwenda",
        time: "34 minutes ago",
      },
    ],
    priorityQueue: applications.filter((application) => application.priority === "HIGH"),
    myQueue: applications.filter((application) => application.assignedTo === "Sarah Kimani"),
  };
}

export async function getApplications(): Promise<DashboardApplication[]> {
  // Backend integration point: query users + user_documents and derive workflow status.
  return applications;
}

export async function getApplicationById(
  id: string,
): Promise<DashboardApplication | null> {
  return applications.find((application) => application.id === id) ?? null;
}

export async function getAgents(): Promise<DashboardAgent[]> {
  // Backend integration point: query internal users/agents and their active assignment counts.
  return agents;
}

export async function getApplicationDocuments(
  applicationId: string,
): Promise<ApplicationDocument[]> {
  if (!applications.some((application) => application.id === applicationId)) {
    return [];
  }

  return [
    { id: "doc_001", name: "KCSE Certificate.pdf", status: "Verified", date: "Jun 28" },
    { id: "doc_002", name: "National ID.pdf", status: "Pending", date: "Jun 29" },
    { id: "doc_003", name: "Birth Certificate.pdf", status: "Verified", date: "Jun 27" },
  ];
}

export async function getApplicationTimeline(
  applicationId: string,
): Promise<ActivityEvent[]> {
  if (!applications.some((application) => application.id === applicationId)) {
    return [];
  }

  return [
    {
      id: "event_001",
      title: "Status changed to Ready",
      actor: "Sarah Kimani",
      time: "2 hours ago",
    },
    {
      id: "event_002",
      title: "Assigned to Sarah Kimani",
      actor: "System",
      time: "Yesterday",
    },
    {
      id: "event_003",
      title: "Documents uploaded",
      actor: "Applicant",
      time: "2 days ago",
    },
  ];
}

export async function getAnalyticsData(): Promise<AnalyticsData> {
  return {
    kpis: [
      { title: "Total Applications", value: "1,284", change: "18%", changeType: "positive" },
      { title: "Completion Rate", value: "87%", change: "4%", changeType: "positive" },
      { title: "Avg Processing Time", value: "1.7h", change: "24min", changeType: "positive" },
      { title: "Active Agents", value: "24", change: "On track", changeType: "neutral" },
    ],
    processingTrend: [
      { day: "Jun 2", time: 3.2 },
      { day: "Jun 5", time: 2.8 },
      { day: "Jun 8", time: 2.9 },
      { day: "Jun 11", time: 2.4 },
      { day: "Jun 14", time: 2.1 },
      { day: "Jun 17", time: 2.3 },
      { day: "Jun 20", time: 1.9 },
      { day: "Jun 23", time: 2.0 },
      { day: "Jun 26", time: 1.8 },
      { day: "Jun 29", time: 1.7 },
    ],
    statusDistribution: [
      { name: "SUBMITTED", label: "Submitted", value: 184, color: "#2563eb" },
      { name: "ASSIGNED", label: "Assigned", value: 97, color: "#f59e0b" },
      { name: "READY", label: "Ready", value: 64, color: "#10b981" },
      { name: "COMPLETED", label: "Completed", value: 312, color: "#22c55e" },
    ],
    agentPerformance: [
      { name: "Sarah K", applications: 68, avgTime: 1.6 },
      { name: "John M", applications: 52, avgTime: 2.1 },
      { name: "Mercy W", applications: 47, avgTime: 1.4 },
    ],
  };
}
