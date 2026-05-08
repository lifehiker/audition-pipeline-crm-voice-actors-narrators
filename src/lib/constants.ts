export const APP_NAME = "VoiceLog";

export const PLATFORM_OPTIONS = [
  "ACX",
  "Findaway Voices",
  "Voice123",
  "Voices.com",
  "Backstage",
  "Casting Call Club",
  "Direct",
] as const;

export const GENRE_OPTIONS = [
  "Literary Fiction",
  "Thriller",
  "Romance",
  "Self-Help",
  "Business",
  "Children's",
  "Sci-Fi",
  "Fantasy",
  "Other",
] as const;

export const PAY_TYPE_OPTIONS = [
  "Royalty Share",
  "Flat Fee",
  "Per Finished Hour",
  "Unknown",
] as const;

export const PIPELINE_STATUSES = [
  "Submitted",
  "Callback",
  "Offered",
  "Booked",
  "Passed",
] as const;

export const PLAN_OPTIONS = ["trial", "solo", "pro"] as const;

export const DEMO_USER_ID = "demo-user";
export const DEMO_USER_EMAIL = "demo@voicelog.local";
export const DEMO_USER_NAME = "Sarah Brook";
