"use client";

import { useMemo, useState, useTransition } from "react";
import {
  closestCorners,
  DndContext,
  DragEndEvent,
  MouseSensor,
  TouchSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import { SortableContext, useSortable, verticalListSortingStrategy } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { LoaderCircle, Plus, Trash2 } from "lucide-react";

import { RoyaltyCalculator } from "@/components/royalty-calculator";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { GENRE_OPTIONS, PAY_TYPE_OPTIONS, PIPELINE_STATUSES, PLATFORM_OPTIONS } from "@/lib/constants";
import type { Audition, PipelineStatus, Plan } from "@/lib/types";
import { formatDate } from "@/lib/utils";

type Props = {
  initialAuditions: Audition[];
  plan: Plan;
};

type FormState = {
  title: string;
  role: string;
  platform: (typeof PLATFORM_OPTIONS)[number];
  genre: (typeof GENRE_OPTIONS)[number];
  payType: (typeof PAY_TYPE_OPTIONS)[number];
  payDetails: string;
  flatFee: string;
  perFinishedHourRate: string;
  royaltyPercentage: string;
  estimatedFinishedHours: string;
  monthlySalesEstimate: string;
  submittedAt: string;
  notes: string;
};

const emptyForm: FormState = {
  title: "",
  role: "",
  platform: PLATFORM_OPTIONS[0],
  genre: GENRE_OPTIONS[0],
  payType: PAY_TYPE_OPTIONS[0],
  payDetails: "",
  flatFee: "",
  perFinishedHourRate: "",
  royaltyPercentage: "",
  estimatedFinishedHours: "",
  monthlySalesEstimate: "",
  submittedAt: new Date().toISOString().slice(0, 10),
  notes: "",
};

function SortableAudition({
  audition,
  onDelete,
  onStatusChange,
}: {
  audition: Audition;
  onDelete: (id: string) => void;
  onStatusChange: (id: string, status: PipelineStatus) => void;
}) {
  const { attributes, listeners, setNodeRef, transform, transition } = useSortable({
    id: audition.id,
  });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div ref={setNodeRef} style={style} {...attributes} {...listeners}>
      <Card className="cursor-grab active:cursor-grabbing">
        <CardContent className="space-y-4 pt-5">
          <div className="flex items-start justify-between gap-3">
            <div>
              <p className="font-semibold text-[var(--ink)]">{audition.title}</p>
              <p className="text-sm text-[var(--muted-ink)]">
                {audition.platform} • {audition.genre}
              </p>
            </div>
            <Badge variant="accent">{audition.payType}</Badge>
          </div>
          <p className="text-sm leading-6 text-[var(--muted-ink)]">{audition.notes}</p>
          <div className="grid gap-2 text-sm text-[var(--muted-ink)]">
            <p>Role: {audition.role}</p>
            <p>Submitted: {formatDate(audition.submittedAt)}</p>
          </div>
          {audition.payType === "Royalty Share" &&
            (audition.status === "Offered" || audition.status === "Booked") && (
              <div className="rounded-[24px] bg-[var(--paper)] p-3">
                <RoyaltyCalculator
                  initialHours={audition.estimatedFinishedHours ?? 8}
                  initialRoyalty={audition.royaltyPercentage ?? 50}
                  initialSales={audition.monthlySalesEstimate ?? 120}
                />
              </div>
            )}
          <div className="flex items-center gap-2">
            <Select
              value={audition.status}
              onChange={(event) => onStatusChange(audition.id, event.target.value as PipelineStatus)}
            >
              {PIPELINE_STATUSES.map((status) => (
                <option key={status} value={status}>
                  {status}
                </option>
              ))}
            </Select>
            <Button variant="ghost" onClick={() => onDelete(audition.id)} aria-label={`Delete ${audition.title}`}>
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

export function PipelineBoard({ initialAuditions, plan }: Props) {
  const [auditions, setAuditions] = useState(initialAuditions);
  const [form, setForm] = useState(emptyForm);
  const [isPending, startTransition] = useTransition();
  const sensors = useSensors(useSensor(MouseSensor), useSensor(TouchSensor));

  const groups = useMemo(() => {
    return PIPELINE_STATUSES.map((status) => ({
      status,
      items: auditions.filter((audition) => audition.status === status),
    }));
  }, [auditions]);

  async function refreshAuditions() {
    const response = await fetch("/api/auditions");
    const nextAuditions = (await response.json()) as Audition[];
    setAuditions(nextAuditions);
  }

  function handleCreate(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    startTransition(async () => {
      await fetch("/api/auditions", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...form,
          flatFee: form.flatFee ? Number(form.flatFee) : undefined,
          perFinishedHourRate: form.perFinishedHourRate ? Number(form.perFinishedHourRate) : undefined,
          royaltyPercentage: form.royaltyPercentage ? Number(form.royaltyPercentage) : undefined,
          estimatedFinishedHours: form.estimatedFinishedHours
            ? Number(form.estimatedFinishedHours)
            : undefined,
          monthlySalesEstimate: form.monthlySalesEstimate ? Number(form.monthlySalesEstimate) : undefined,
          status: "Submitted",
        }),
      });
      setForm(emptyForm);
      await refreshAuditions();
    });
  }

  function handleDelete(id: string) {
    startTransition(async () => {
      await fetch(`/api/auditions/${id}`, { method: "DELETE" });
      await refreshAuditions();
    });
  }

  function handleStatusChange(id: string, status: PipelineStatus) {
    startTransition(async () => {
      await fetch(`/api/auditions/${id}/status`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status }),
      });
      await refreshAuditions();
    });
  }

  function handleDragEnd(event: DragEndEvent) {
    const activeId = String(event.active.id);
    const overId = event.over?.id ? String(event.over.id) : null;

    if (!overId) {
      return;
    }

    const statusMatch = PIPELINE_STATUSES.find((status) => status === overId);
    if (statusMatch) {
      handleStatusChange(activeId, statusMatch);
      return;
    }

    const overAudition = auditions.find((item) => item.id === overId);
    if (overAudition) {
      handleStatusChange(activeId, overAudition.status);
    }
  }

  return (
    <div className="space-y-6">
      <section className="grid gap-6 xl:grid-cols-[0.72fr_1.28fr]">
        <Card>
          <CardHeader>
            <CardTitle>Add audition</CardTitle>
            <CardDescription>Log the platform, role, economics, and notes the moment an audition goes out.</CardDescription>
          </CardHeader>
          <CardContent>
            <form className="grid gap-4" onSubmit={handleCreate}>
              <div className="grid gap-4 md:grid-cols-2">
                <div className="grid gap-2">
                  <Label htmlFor="title">Title</Label>
                  <Input id="title" value={form.title} onChange={(event) => setForm({ ...form, title: event.target.value })} required />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="role">Role</Label>
                  <Input id="role" value={form.role} onChange={(event) => setForm({ ...form, role: event.target.value })} required />
                </div>
              </div>
              <div className="grid gap-4 md:grid-cols-3">
                <div className="grid gap-2">
                  <Label htmlFor="platform">Platform</Label>
                  <Select id="platform" value={form.platform} onChange={(event) => setForm({ ...form, platform: event.target.value as (typeof PLATFORM_OPTIONS)[number] })}>
                    {PLATFORM_OPTIONS.map((platform) => <option key={platform}>{platform}</option>)}
                  </Select>
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="genre">Genre</Label>
                  <Select id="genre" value={form.genre} onChange={(event) => setForm({ ...form, genre: event.target.value as (typeof GENRE_OPTIONS)[number] })}>
                    {GENRE_OPTIONS.map((genre) => <option key={genre}>{genre}</option>)}
                  </Select>
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="payType">Pay type</Label>
                  <Select id="payType" value={form.payType} onChange={(event) => setForm({ ...form, payType: event.target.value as (typeof PAY_TYPE_OPTIONS)[number] })}>
                    {PAY_TYPE_OPTIONS.map((payType) => <option key={payType}>{payType}</option>)}
                  </Select>
                </div>
              </div>
              <div className="grid gap-4 md:grid-cols-2">
                <div className="grid gap-2">
                  <Label htmlFor="submittedAt">Date submitted</Label>
                  <Input id="submittedAt" type="date" value={form.submittedAt} onChange={(event) => setForm({ ...form, submittedAt: event.target.value })} required />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="payDetails">Rate or royalty terms</Label>
                  <Input id="payDetails" value={form.payDetails} onChange={(event) => setForm({ ...form, payDetails: event.target.value })} required />
                </div>
              </div>
              <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
                <div className="grid gap-2">
                  <Label htmlFor="flatFee">Flat fee</Label>
                  <Input id="flatFee" type="number" value={form.flatFee} onChange={(event) => setForm({ ...form, flatFee: event.target.value })} />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="pfh">PFH rate</Label>
                  <Input id="pfh" type="number" value={form.perFinishedHourRate} onChange={(event) => setForm({ ...form, perFinishedHourRate: event.target.value })} />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="royaltyPercent">Royalty %</Label>
                  <Input id="royaltyPercent" type="number" value={form.royaltyPercentage} onChange={(event) => setForm({ ...form, royaltyPercentage: event.target.value })} />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="finishedHours">Finished hours</Label>
                  <Input id="finishedHours" type="number" value={form.estimatedFinishedHours} onChange={(event) => setForm({ ...form, estimatedFinishedHours: event.target.value })} />
                </div>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="notes">Notes</Label>
                <Textarea id="notes" value={form.notes} onChange={(event) => setForm({ ...form, notes: event.target.value })} />
              </div>
              <div className="flex items-center justify-between gap-4">
                <p className="text-sm text-[var(--muted-ink)]">
                  {plan === "solo"
                    ? "Solo includes the pipeline. Upgrade to Pro for genre analytics and CSV export."
                    : "Trial and Pro accounts unlock analytics and CSV export."}
                </p>
                <Button type="submit" disabled={isPending}>
                  {isPending ? <LoaderCircle className="mr-2 h-4 w-4 animate-spin" /> : <Plus className="mr-2 h-4 w-4" />}
                  Save audition
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>

        <DndContext sensors={sensors} collisionDetection={closestCorners} onDragEnd={handleDragEnd}>
          <div className="grid gap-4 xl:grid-cols-5">
            {groups.map((group) => (
              <div key={group.status} id={group.status} className="rounded-[30px] border border-[var(--line)] bg-white/65 p-4">
                <div className="mb-4 flex items-center justify-between">
                  <div>
                    <p className="font-semibold text-[var(--ink)]">{group.status}</p>
                    <p className="text-sm text-[var(--muted-ink)]">{group.items.length} auditions</p>
                  </div>
                  <Badge variant="neutral">{group.items.length}</Badge>
                </div>
                <SortableContext items={group.items.map((item) => item.id)} strategy={verticalListSortingStrategy}>
                  <div className="grid gap-4">
                    {group.items.map((audition) => (
                      <SortableAudition
                        key={audition.id}
                        audition={audition}
                        onDelete={handleDelete}
                        onStatusChange={handleStatusChange}
                      />
                    ))}
                  </div>
                </SortableContext>
              </div>
            ))}
          </div>
        </DndContext>
      </section>
    </div>
  );
}
