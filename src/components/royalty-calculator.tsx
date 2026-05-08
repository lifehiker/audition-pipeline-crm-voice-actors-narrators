"use client";

import { useMemo, useState } from "react";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { calculateRoyaltyScenarios } from "@/lib/royalty";
import { formatCurrency } from "@/lib/utils";

export function RoyaltyCalculator({
  initialHours = 8,
  initialRoyalty = 50,
  initialSales = 120,
}: {
  initialHours?: number;
  initialRoyalty?: number;
  initialSales?: number;
}) {
  const [estimatedFinishedHours, setEstimatedFinishedHours] = useState(initialHours);
  const [royaltyPercentage, setRoyaltyPercentage] = useState(initialRoyalty);
  const [monthlySalesEstimate, setMonthlySalesEstimate] = useState(initialSales);

  const scenarios = useMemo(
    () =>
      calculateRoyaltyScenarios({
        estimatedFinishedHours,
        royaltyPercentage,
        monthlySalesEstimate,
      }),
    [estimatedFinishedHours, monthlySalesEstimate, royaltyPercentage],
  );

  const scenarioCards = [
    { label: "Low", scenario: scenarios.low },
    { label: "Medium", scenario: scenarios.medium },
    { label: "High", scenario: scenarios.high },
  ];

  return (
    <div className="grid gap-6 lg:grid-cols-[0.8fr_1.2fr]">
      <Card>
        <CardHeader>
          <CardTitle>Royalty-share calculator</CardTitle>
          <CardDescription>
            Compare estimated annual royalty income against flat-fee equivalence before you accept the offer.
          </CardDescription>
        </CardHeader>
        <CardContent className="grid gap-4">
          <div className="grid gap-2">
            <Label htmlFor="hours">Estimated finished hours</Label>
            <Input
              id="hours"
              type="number"
              min="0"
              step="0.5"
              value={estimatedFinishedHours}
              onChange={(event) => setEstimatedFinishedHours(Number(event.target.value))}
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="royalty">Royalty percentage</Label>
            <Input
              id="royalty"
              type="number"
              min="0"
              max="100"
              value={royaltyPercentage}
              onChange={(event) => setRoyaltyPercentage(Number(event.target.value))}
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="sales">Estimated monthly sales</Label>
            <Input
              id="sales"
              type="number"
              min="0"
              value={monthlySalesEstimate}
              onChange={(event) => setMonthlySalesEstimate(Number(event.target.value))}
            />
          </div>
        </CardContent>
      </Card>

      <div className="grid gap-4 md:grid-cols-3">
        {scenarioCards.map(({ label, scenario }) => (
          <Card key={label} className="bg-white/85">
            <CardHeader>
              <CardTitle>{label} sales case</CardTitle>
              <CardDescription>{scenario.monthlySales} monthly sales</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <p className="text-xs uppercase tracking-[0.18em] text-[var(--muted-ink)]">Annual royalty income</p>
                <p className="mt-2 text-3xl font-semibold text-[var(--ink)]">
                  {formatCurrency(scenario.annualIncome)}
                </p>
              </div>
              <div>
                <p className="text-xs uppercase tracking-[0.18em] text-[var(--muted-ink)]">Equivalent PFH value</p>
                <p className="mt-2 text-xl font-semibold text-[var(--ink)]">
                  {formatCurrency(scenario.equivalentFlatFee)}
                </p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
