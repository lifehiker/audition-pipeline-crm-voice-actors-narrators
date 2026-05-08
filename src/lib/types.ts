import {
  DEMO_USER_EMAIL,
  DEMO_USER_ID,
  DEMO_USER_NAME,
  GENRE_OPTIONS,
  PAY_TYPE_OPTIONS,
  PIPELINE_STATUSES,
  PLATFORM_OPTIONS,
  PLAN_OPTIONS,
} from "@/lib/constants";

export type Platform = (typeof PLATFORM_OPTIONS)[number];
export type Genre = (typeof GENRE_OPTIONS)[number];
export type PayType = (typeof PAY_TYPE_OPTIONS)[number];
export type PipelineStatus = (typeof PIPELINE_STATUSES)[number];
export type Plan = (typeof PLAN_OPTIONS)[number];

export type Audition = {
  id: string;
  title: string;
  role: string;
  platform: Platform;
  genre: Genre;
  payType: PayType;
  payDetails: string;
  flatFee?: number;
  perFinishedHourRate?: number;
  royaltyPercentage?: number;
  estimatedFinishedHours?: number;
  monthlySalesEstimate?: number;
  status: PipelineStatus;
  submittedAt: string;
  notes: string;
  createdAt: string;
  updatedAt: string;
};

export type Subscription = {
  plan: Plan;
  status: "trialing" | "active" | "canceled";
  trialEndsAt: string;
  renewalDate?: string;
  cancelAtPeriodEnd?: boolean;
  source: "demo" | "stripe" | "local";
  invoices: {
    id: string;
    date: string;
    amount: number;
    description: string;
    status: "paid" | "upcoming";
  }[];
};

export type AppUser = {
  id: string;
  name: string;
  email: string;
  image?: string;
  authMode: "demo" | "google";
};

export type AppState = {
  user: AppUser;
  subscription: Subscription;
  auditions: Audition[];
  lastWelcomeEmailSentAt?: string;
  lastTrialReminderSentAt?: string;
};

export const emptyState = (): AppState => ({
  user: {
    id: DEMO_USER_ID,
    name: DEMO_USER_NAME,
    email: DEMO_USER_EMAIL,
    authMode: "demo",
  },
  subscription: {
    plan: "trial",
    status: "trialing",
    trialEndsAt: new Date(Date.now() + 1000 * 60 * 60 * 24 * 26).toISOString(),
    renewalDate: new Date(Date.now() + 1000 * 60 * 60 * 24 * 30).toISOString(),
    source: "demo",
    invoices: [
      {
        id: "trial-start",
        date: new Date().toISOString(),
        amount: 0,
        description: "30-day Pro trial",
        status: "paid",
      },
    ],
  },
  auditions: [],
});
