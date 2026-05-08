"use client";

import { useState, useTransition } from "react";
import { LoaderCircle, PencilLine, Save, Trash2, X } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select } from "@/components/ui/select";
import { Table, TBody, TD, TH, THead, TR } from "@/components/ui/table";
import { Textarea } from "@/components/ui/textarea";
import {
  GENRE_OPTIONS,
  PAY_TYPE_OPTIONS,
  PIPELINE_STATUSES,
  PLATFORM_OPTIONS,
} from "@/lib/constants";
import type { Audition } from "@/lib/types";
import { formatDate } from "@/lib/utils";

type AuditionDraft = {
  title: string;
  role: string;
  platform: Audition["platform"];
  genre: Audition["genre"];
  payType: Audition["payType"];
  payDetails: string;
  flatFee: string;
  perFinishedHourRate: string;
  royaltyPercentage: string;
  estimatedFinishedHours: string;
  monthlySalesEstimate: string;
  status: Audition["status"];
  submittedAt: string;
  notes: string;
};

function createDraft(audition: Audition): AuditionDraft {
  return {
    title: audition.title,
    role: audition.role,
    platform: audition.platform,
    genre: audition.genre,
    payType: audition.payType,
    payDetails: audition.payDetails,
    flatFee: audition.flatFee?.toString() ?? "",
    perFinishedHourRate: audition.perFinishedHourRate?.toString() ?? "",
    royaltyPercentage: audition.royaltyPercentage?.toString() ?? "",
    estimatedFinishedHours: audition.estimatedFinishedHours?.toString() ?? "",
    monthlySalesEstimate: audition.monthlySalesEstimate?.toString() ?? "",
    status: audition.status,
    submittedAt: audition.submittedAt.slice(0, 10),
    notes: audition.notes,
  };
}

export function AuditionsTable({ initialAuditions }: { initialAuditions: Audition[] }) {
  const [auditions, setAuditions] = useState(initialAuditions);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [draft, setDraft] = useState<AuditionDraft | null>(null);
  const [isPending, startTransition] = useTransition();

  function beginEdit(audition: Audition) {
    setEditingId(audition.id);
    setDraft(createDraft(audition));
  }

  function cancelEdit() {
    setEditingId(null);
    setDraft(null);
  }

  function updateLocal(updated: Audition) {
    setAuditions((current) =>
      current
        .map((item) => (item.id === updated.id ? updated : item))
        .sort(
          (a, b) =>
            new Date(b.submittedAt).getTime() - new Date(a.submittedAt).getTime(),
        ),
    );
  }

  function handleDelete(id: string) {
    startTransition(async () => {
      await fetch(`/api/auditions/${id}`, { method: "DELETE" });
      setAuditions((current) => current.filter((item) => item.id !== id));
      if (editingId === id) {
        cancelEdit();
      }
    });
  }

  function handleSave() {
    if (!editingId || !draft) {
      return;
    }

    startTransition(async () => {
      const response = await fetch(`/api/auditions/${editingId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...draft,
          flatFee: draft.flatFee ? Number(draft.flatFee) : undefined,
          perFinishedHourRate: draft.perFinishedHourRate
            ? Number(draft.perFinishedHourRate)
            : undefined,
          royaltyPercentage: draft.royaltyPercentage
            ? Number(draft.royaltyPercentage)
            : undefined,
          estimatedFinishedHours: draft.estimatedFinishedHours
            ? Number(draft.estimatedFinishedHours)
            : undefined,
          monthlySalesEstimate: draft.monthlySalesEstimate
            ? Number(draft.monthlySalesEstimate)
            : undefined,
          submittedAt: new Date(draft.submittedAt).toISOString(),
        }),
      });

      const updated = (await response.json()) as Audition;
      updateLocal(updated);
      cancelEdit();
    });
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Auditions</CardTitle>
          <CardDescription>
            Review every saved audition in one table, then open inline edit mode to revise details or update terms.
          </CardDescription>
        </CardHeader>
        <CardContent className="overflow-x-auto">
          <Table>
            <THead>
              <TR>
                <TH>Title</TH>
                <TH>Platform</TH>
                <TH>Genre</TH>
                <TH>Status</TH>
                <TH>Pay type</TH>
                <TH>Submitted</TH>
                <TH>Actions</TH>
              </TR>
            </THead>
            <TBody>
              {auditions.map((audition) => (
                <TR key={audition.id}>
                  <TD>
                    <div>
                      <p className="font-medium">{audition.title}</p>
                      <p className="text-xs text-[var(--muted-ink)]">{audition.role}</p>
                    </div>
                  </TD>
                  <TD>{audition.platform}</TD>
                  <TD>{audition.genre}</TD>
                  <TD>
                    <Badge variant="neutral">{audition.status}</Badge>
                  </TD>
                  <TD>{audition.payType}</TD>
                  <TD>{formatDate(audition.submittedAt)}</TD>
                  <TD>
                    <div className="flex gap-2">
                      <Button
                        variant="ghost"
                        onClick={() => beginEdit(audition)}
                        aria-label={`Edit ${audition.title}`}
                      >
                        <PencilLine className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        onClick={() => handleDelete(audition.id)}
                        aria-label={`Delete ${audition.title}`}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </TD>
                </TR>
              ))}
            </TBody>
          </Table>
        </CardContent>
      </Card>

      {draft ? (
        <Card>
          <CardHeader>
            <CardTitle>Edit audition</CardTitle>
            <CardDescription>
              Adjust the status, economics, or notes for the selected audition.
            </CardDescription>
          </CardHeader>
          <CardContent className="grid gap-4">
            <div className="grid gap-4 md:grid-cols-2">
              <div className="grid gap-2">
                <Label htmlFor="edit-title">Title</Label>
                <Input
                  id="edit-title"
                  value={draft.title}
                  onChange={(event) =>
                    setDraft({ ...draft, title: event.target.value })
                  }
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="edit-role">Role</Label>
                <Input
                  id="edit-role"
                  value={draft.role}
                  onChange={(event) =>
                    setDraft({ ...draft, role: event.target.value })
                  }
                />
              </div>
            </div>
            <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
              <div className="grid gap-2">
                <Label htmlFor="edit-platform">Platform</Label>
                <Select
                  id="edit-platform"
                  value={draft.platform}
                  onChange={(event) =>
                    setDraft({
                      ...draft,
                      platform: event.target.value as Audition["platform"],
                    })
                  }
                >
                  {PLATFORM_OPTIONS.map((platform) => (
                    <option key={platform}>{platform}</option>
                  ))}
                </Select>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="edit-genre">Genre</Label>
                <Select
                  id="edit-genre"
                  value={draft.genre}
                  onChange={(event) =>
                    setDraft({
                      ...draft,
                      genre: event.target.value as Audition["genre"],
                    })
                  }
                >
                  {GENRE_OPTIONS.map((genre) => (
                    <option key={genre}>{genre}</option>
                  ))}
                </Select>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="edit-pay-type">Pay type</Label>
                <Select
                  id="edit-pay-type"
                  value={draft.payType}
                  onChange={(event) =>
                    setDraft({
                      ...draft,
                      payType: event.target.value as Audition["payType"],
                    })
                  }
                >
                  {PAY_TYPE_OPTIONS.map((payType) => (
                    <option key={payType}>{payType}</option>
                  ))}
                </Select>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="edit-status">Status</Label>
                <Select
                  id="edit-status"
                  value={draft.status}
                  onChange={(event) =>
                    setDraft({
                      ...draft,
                      status: event.target.value as Audition["status"],
                    })
                  }
                >
                  {PIPELINE_STATUSES.map((status) => (
                    <option key={status}>{status}</option>
                  ))}
                </Select>
              </div>
            </div>
            <div className="grid gap-4 md:grid-cols-2">
              <div className="grid gap-2">
                <Label htmlFor="edit-submitted-at">Submitted</Label>
                <Input
                  id="edit-submitted-at"
                  type="date"
                  value={draft.submittedAt}
                  onChange={(event) =>
                    setDraft({ ...draft, submittedAt: event.target.value })
                  }
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="edit-pay-details">Rate or royalty terms</Label>
                <Input
                  id="edit-pay-details"
                  value={draft.payDetails}
                  onChange={(event) =>
                    setDraft({ ...draft, payDetails: event.target.value })
                  }
                />
              </div>
            </div>
            <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-5">
              <div className="grid gap-2">
                <Label htmlFor="edit-flat-fee">Flat fee</Label>
                <Input
                  id="edit-flat-fee"
                  type="number"
                  value={draft.flatFee}
                  onChange={(event) =>
                    setDraft({ ...draft, flatFee: event.target.value })
                  }
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="edit-pfh">PFH rate</Label>
                <Input
                  id="edit-pfh"
                  type="number"
                  value={draft.perFinishedHourRate}
                  onChange={(event) =>
                    setDraft({
                      ...draft,
                      perFinishedHourRate: event.target.value,
                    })
                  }
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="edit-royalty">Royalty %</Label>
                <Input
                  id="edit-royalty"
                  type="number"
                  value={draft.royaltyPercentage}
                  onChange={(event) =>
                    setDraft({
                      ...draft,
                      royaltyPercentage: event.target.value,
                    })
                  }
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="edit-hours">Finished hours</Label>
                <Input
                  id="edit-hours"
                  type="number"
                  value={draft.estimatedFinishedHours}
                  onChange={(event) =>
                    setDraft({
                      ...draft,
                      estimatedFinishedHours: event.target.value,
                    })
                  }
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="edit-sales">Monthly sales</Label>
                <Input
                  id="edit-sales"
                  type="number"
                  value={draft.monthlySalesEstimate}
                  onChange={(event) =>
                    setDraft({
                      ...draft,
                      monthlySalesEstimate: event.target.value,
                    })
                  }
                />
              </div>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="edit-notes">Notes</Label>
              <Textarea
                id="edit-notes"
                value={draft.notes}
                onChange={(event) =>
                  setDraft({ ...draft, notes: event.target.value })
                }
              />
            </div>
            <div className="flex flex-wrap justify-end gap-3">
              <Button variant="ghost" onClick={cancelEdit}>
                <X className="mr-2 h-4 w-4" />
                Cancel
              </Button>
              <Button onClick={handleSave} disabled={isPending}>
                {isPending ? (
                  <LoaderCircle className="mr-2 h-4 w-4 animate-spin" />
                ) : (
                  <Save className="mr-2 h-4 w-4" />
                )}
                Save changes
              </Button>
            </div>
          </CardContent>
        </Card>
      ) : null}
    </div>
  );
}
