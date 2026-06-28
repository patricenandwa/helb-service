import type { FormData } from "@/lib/validation";

const API_BASE = "/api/v1";

export async function submitApplication(data: FormData) {
  const response = await fetch(`${API_BASE}/applications`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    const error = await response.json().catch(() => ({
      message: "Submission failed",
    }));
    throw new Error(error.message || "Submission failed");
  }

  return response.json();
}
