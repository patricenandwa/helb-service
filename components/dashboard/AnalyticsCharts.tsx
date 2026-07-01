"use client";

import { Card } from "@/components/ui/card";
import { StatusBadge } from "@/components/dashboard/StatusBadge";
import type { AnalyticsData } from "@/lib/dashboard/types";
import {
    Bar,
    BarChart,
    CartesianGrid,
    Cell,
    Line,
    LineChart,
    Pie,
    PieChart,
    ResponsiveContainer,
    Tooltip,
    XAxis,
    YAxis,
} from "recharts";

export function AnalyticsCharts({ data }: { data: AnalyticsData }) {
    return (
        <>
            <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
                <Card className="p-8">
                    <h3 className="mb-6 font-semibold">Avg Processing Time Trend</h3>
                    <div className="h-80">
                        <ResponsiveContainer width="100%" height="100%">
                            <LineChart data={data.processingTrend}>
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="day" />
                                <YAxis />
                                <Tooltip />
                                <Line
                                    type="natural"
                                    dataKey="time"
                                    stroke="#2563eb"
                                    strokeWidth={3}
                                    dot={{ r: 4 }}
                                />
                            </LineChart>
                        </ResponsiveContainer>
                    </div>
                </Card>

                <Card className="p-8">
                    <h3 className="mb-6 font-semibold">Current Pipeline</h3>
                    <div className="flex h-80 items-center">
                        <ResponsiveContainer width="100%" height="100%">
                            <PieChart>
                                <Pie
                                    data={data.statusDistribution}
                                    cx="50%"
                                    cy="50%"
                                    innerRadius={80}
                                    outerRadius={120}
                                    dataKey="value"
                                >
                                    {data.statusDistribution.map((entry) => (
                                        <Cell key={entry.name} fill={entry.color} />
                                    ))}
                                </Pie>
                                <Tooltip />
                            </PieChart>
                        </ResponsiveContainer>
                    </div>

                    <div className="mt-6 grid grid-cols-2 gap-4">
                        {data.statusDistribution.map((item) => (
                            <div key={item.name} className="flex items-center gap-3">
                                <div
                                    className="h-3 w-3 rounded-full"
                                    style={{ backgroundColor: item.color }}
                                />
                                <div className="min-w-0 flex-1">
                                    <p className="text-sm">{item.label}</p>
                                    <p className="font-semibold">{item.value}</p>
                                </div>
                                <StatusBadge status={item.name} />
                            </div>
                        ))}
                    </div>
                </Card>
            </div>

            <Card className="p-8">
                <h3 className="mb-6 font-semibold">Agent Performance</h3>
                <div className="h-96">
                    <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={data.agentPerformance}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="name" />
                            <YAxis />
                            <Tooltip />
                            <Bar dataKey="applications" fill="#2563eb" radius={8} />
                        </BarChart>
                    </ResponsiveContainer>
                </div>
            </Card>
        </>
    );
}
