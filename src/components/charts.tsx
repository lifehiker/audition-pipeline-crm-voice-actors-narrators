"use client";

import { Bar, BarChart, CartesianGrid, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";

type PlatformChartProps = {
  data: { platform: string; count: number }[];
};

type TrendChartProps = {
  data: { label: string; submitted: number; booked: number }[];
};

function ChartFrame({ children }: { children: React.ReactNode }) {
  const isServer = typeof window === "undefined";

  return (
    <div className="h-72 min-w-0">
      {isServer ? (
        <div className="h-full w-full animate-pulse rounded-[24px] bg-[var(--paper)]" />
      ) : (
        children
      )}
    </div>
  );
}

export function PlatformChart({ data }: PlatformChartProps) {
  return (
    <ChartFrame>
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data}>
          <CartesianGrid vertical={false} stroke="#e5ddd0" />
          <XAxis dataKey="platform" tickLine={false} axisLine={false} fontSize={12} />
          <YAxis tickLine={false} axisLine={false} fontSize={12} />
          <Tooltip />
          <Bar dataKey="count" radius={[12, 12, 0, 0]} fill="#d66e43" />
        </BarChart>
      </ResponsiveContainer>
    </ChartFrame>
  );
}

export function TrendChart({ data }: TrendChartProps) {
  return (
    <ChartFrame>
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data}>
          <CartesianGrid vertical={false} stroke="#e5ddd0" />
          <XAxis dataKey="label" tickLine={false} axisLine={false} fontSize={12} />
          <YAxis tickLine={false} axisLine={false} fontSize={12} />
          <Tooltip />
          <Line type="monotone" dataKey="submitted" stroke="#16324f" strokeWidth={3} dot={false} />
          <Line type="monotone" dataKey="booked" stroke="#78c4bb" strokeWidth={3} dot={false} />
        </LineChart>
      </ResponsiveContainer>
    </ChartFrame>
  );
}
