import { isAfter, startOfMonth, subDays, subMonths } from "date-fns";

import { PIPELINE_STATUSES } from "@/lib/constants";
import type { Audition, Plan } from "@/lib/types";

export function getDashboardMetrics(auditions: Audition[], plan: Plan) {
  const now = new Date();
  const thisMonthStart = startOfMonth(now);
  const lastMonthStart = startOfMonth(subMonths(now, 1));

  const submittedThisMonth = auditions.filter((item) =>
    isAfter(new Date(item.submittedAt), thisMonthStart),
  ).length;

  const submittedLastMonth = auditions.filter((item) => {
    const date = new Date(item.submittedAt);
    return isAfter(date, lastMonthStart) && date < thisMonthStart;
  }).length;

  const rateForDays = (days: number) => {
    const boundary = subDays(now, days);
    const inRange = auditions.filter((item) => isAfter(new Date(item.submittedAt), boundary));
    const booked = inRange.filter((item) => item.status === "Booked").length;
    return inRange.length ? (booked / inRange.length) * 100 : 0;
  };

  const statusCounts = PIPELINE_STATUSES.map((status) => ({
    status,
    count: auditions.filter((item) => item.status === status).length,
  }));

  const platformMap = new Map<string, number>();
  const genreMap = new Map<string, { submitted: number; booked: number }>();
  const trendMap = new Map<string, { label: string; submitted: number; booked: number }>();

  auditions.forEach((audition) => {
    platformMap.set(audition.platform, (platformMap.get(audition.platform) ?? 0) + 1);

    const genreEntry = genreMap.get(audition.genre) ?? { submitted: 0, booked: 0 };
    genreEntry.submitted += 1;
    if (audition.status === "Booked") {
      genreEntry.booked += 1;
    }
    genreMap.set(audition.genre, genreEntry);

    const date = new Date(audition.submittedAt);
    const key = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}`;
    const trend = trendMap.get(key) ?? {
      label: date.toLocaleDateString("en-US", { month: "short", year: "2-digit" }),
      submitted: 0,
      booked: 0,
    };
    trend.submitted += 1;
    if (audition.status === "Booked") {
      trend.booked += 1;
    }
    trendMap.set(key, trend);
  });

  const platformBreakdown = [...platformMap.entries()]
    .map(([platform, count]) => ({ platform, count }))
    .sort((a, b) => b.count - a.count);

  const genreBreakdown = [...genreMap.entries()]
    .map(([genre, values]) => ({
      genre,
      bookingRate: values.submitted ? (values.booked / values.submitted) * 100 : 0,
      submitted: values.submitted,
      booked: values.booked,
    }))
    .sort((a, b) => b.bookingRate - a.bookingRate);

  const trend = [...trendMap.values()].sort((a, b) => a.label.localeCompare(b.label));

  return {
    statusCounts,
    submittedThisMonth,
    submittedLastMonth,
    bookingRate30: rateForDays(30),
    bookingRate90: rateForDays(90),
    bookingRate365: rateForDays(365),
    platformBreakdown,
    genreBreakdown,
    trend,
    analyticsLocked: plan === "solo",
  };
}
