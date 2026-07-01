export type UserRole = "SUPER_ADMIN" | "CUSTOMER_CARE_AGENT";

export interface Metric {
    title: string;
    value: string;
    change?: string;
    changeType?: "positive" | "negative";
}

export interface Application {
    id: string;
    studentName: string;
    institution: string;
    status: string;
    priority: "HIGH" | "MEDIUM" | "LOW";
    submittedAt: string;
    assignedTo?: string;
}