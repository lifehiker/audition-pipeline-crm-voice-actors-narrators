import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";

import { createDemoState } from "@/lib/demo-data";
import type { AppState, Audition, PipelineStatus, Plan } from "@/lib/types";

const DATA_DIR = path.join(process.cwd(), ".data");
const STATE_FILE = path.join(DATA_DIR, "voicelog-state.json");
const EMAIL_LOG_FILE = path.join(DATA_DIR, "email-events.json");

async function ensureStateFile() {
  await mkdir(DATA_DIR, { recursive: true });

  try {
    await readFile(STATE_FILE, "utf8");
  } catch {
    await writeFile(STATE_FILE, JSON.stringify(createDemoState(), null, 2), "utf8");
  }
}

async function readState(): Promise<AppState> {
  await ensureStateFile();
  const raw = await readFile(STATE_FILE, "utf8");
  return JSON.parse(raw) as AppState;
}

async function saveState(state: AppState) {
  await writeFile(STATE_FILE, JSON.stringify(state, null, 2), "utf8");
}

export async function getAppState() {
  return readState();
}

export async function listAuditions() {
  const state = await getAppState();
  return [...state.auditions].sort((a, b) => {
    return new Date(b.submittedAt).getTime() - new Date(a.submittedAt).getTime();
  });
}

export async function getSubscription() {
  const state = await getAppState();
  return state.subscription;
}

export async function createAudition(input: Omit<Audition, "id" | "createdAt" | "updatedAt">) {
  const state = await getAppState();
  const timestamp = new Date().toISOString();
  const audition: Audition = {
    ...input,
    id: crypto.randomUUID(),
    createdAt: timestamp,
    updatedAt: timestamp,
  };

  state.auditions.unshift(audition);
  await saveState(state);
  return audition;
}

export async function updateAudition(id: string, input: Partial<Audition>) {
  const state = await getAppState();
  state.auditions = state.auditions.map((audition) =>
    audition.id === id
      ? { ...audition, ...input, updatedAt: new Date().toISOString() }
      : audition,
  );
  await saveState(state);
  return state.auditions.find((audition) => audition.id === id) ?? null;
}

export async function updateAuditionStatus(id: string, status: PipelineStatus) {
  return updateAudition(id, { status });
}

export async function deleteAudition(id: string) {
  const state = await getAppState();
  state.auditions = state.auditions.filter((audition) => audition.id !== id);
  await saveState(state);
}

export async function updatePlan(plan: Plan) {
  const state = await getAppState();
  const isTrial = plan === "trial";

  state.subscription = {
    ...state.subscription,
    plan,
    status: isTrial ? "trialing" : "active",
    source: "local",
    renewalDate: new Date(Date.now() + 1000 * 60 * 60 * 24 * 30).toISOString(),
  };

  if (plan === "solo") {
    state.subscription.invoices = [
      {
        id: `solo-${Date.now()}`,
        date: new Date().toISOString(),
        amount: 19,
        description: "Solo monthly subscription",
        status: "paid",
      },
    ];
  }

  if (plan === "pro") {
    state.subscription.invoices = [
      {
        id: `pro-${Date.now()}`,
        date: new Date().toISOString(),
        amount: 29,
        description: "Pro monthly subscription",
        status: "paid",
      },
    ];
  }

  await saveState(state);
  return state.subscription;
}

export async function logEmailEvent(event: Record<string, unknown>) {
  await mkdir(DATA_DIR, { recursive: true });
  let events: Record<string, unknown>[] = [];

  try {
    events = JSON.parse(await readFile(EMAIL_LOG_FILE, "utf8")) as Record<string, unknown>[];
  } catch {
    events = [];
  }

  events.push({
    ...event,
    createdAt: new Date().toISOString(),
  });

  await writeFile(EMAIL_LOG_FILE, JSON.stringify(events, null, 2), "utf8");
}
