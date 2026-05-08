import { subDays } from "date-fns";

import { emptyState, type AppState } from "@/lib/types";

export function createDemoState(): AppState {
  const state = emptyState();
  const now = new Date();

  state.auditions = [
    {
      id: "acx-thriller",
      title: "Night Passage",
      role: "Lead Narrator",
      platform: "ACX",
      genre: "Thriller",
      payType: "Royalty Share",
      payDetails: "50/50 royalty split with marketing clause",
      royaltyPercentage: 50,
      estimatedFinishedHours: 8.5,
      monthlySalesEstimate: 180,
      status: "Offered",
      submittedAt: subDays(now, 7).toISOString(),
      notes: "Author requested a callback on pacing and dialogue differentiation.",
      createdAt: subDays(now, 7).toISOString(),
      updatedAt: subDays(now, 2).toISOString(),
    },
    {
      id: "voice123-selfhelp",
      title: "Executive Focus",
      role: "Audiobook Narrator",
      platform: "Voice123",
      genre: "Business",
      payType: "Per Finished Hour",
      payDetails: "$275 PFH for 6-hour business title",
      perFinishedHourRate: 275,
      estimatedFinishedHours: 6,
      status: "Booked",
      submittedAt: subDays(now, 23).toISOString(),
      notes: "Strong fit for corporate author. Closed after live directed callback.",
      createdAt: subDays(now, 23).toISOString(),
      updatedAt: subDays(now, 12).toISOString(),
    },
    {
      id: "findaway-romance",
      title: "Second Summer",
      role: "Dual POV Narrator",
      platform: "Findaway Voices",
      genre: "Romance",
      payType: "Flat Fee",
      payDetails: "$1,800 buyout",
      flatFee: 1800,
      estimatedFinishedHours: 10,
      status: "Callback",
      submittedAt: subDays(now, 5).toISOString(),
      notes: "Producer asked for alt take with softer energy.",
      createdAt: subDays(now, 5).toISOString(),
      updatedAt: subDays(now, 3).toISOString(),
    },
    {
      id: "backstage-kids",
      title: "Rocket Camp",
      role: "Character Voices",
      platform: "Backstage",
      genre: "Children's",
      payType: "Flat Fee",
      payDetails: "$650 session fee",
      flatFee: 650,
      status: "Submitted",
      submittedAt: subDays(now, 2).toISOString(),
      notes: "Need to follow up on remote-directed session timing.",
      createdAt: subDays(now, 2).toISOString(),
      updatedAt: subDays(now, 2).toISOString(),
    },
    {
      id: "acx-fantasy-passed",
      title: "The Frost Archive",
      role: "Narrator",
      platform: "ACX",
      genre: "Fantasy",
      payType: "Unknown",
      payDetails: "Terms not posted",
      status: "Passed",
      submittedAt: subDays(now, 41).toISOString(),
      notes: "Author closed title after revising rights terms.",
      createdAt: subDays(now, 41).toISOString(),
      updatedAt: subDays(now, 38).toISOString(),
    },
  ];

  return state;
}
