export function calculateRoyaltyScenarios({
  estimatedFinishedHours,
  royaltyPercentage,
  monthlySalesEstimate,
}: {
  estimatedFinishedHours?: number;
  royaltyPercentage?: number;
  monthlySalesEstimate?: number;
}) {
  const hours = estimatedFinishedHours ?? 0;
  const share = (royaltyPercentage ?? 0) / 100;
  const monthly = monthlySalesEstimate ?? 0;
  const unitRoyalty = 6 * share;

  const lowSales = Math.round(monthly * 0.6);
  const mediumSales = Math.round(monthly);
  const highSales = Math.round(monthly * 1.6);

  const scenario = (sales: number) => {
    const annualIncome = sales * 12 * unitRoyalty;
    return {
      monthlySales: sales,
      annualIncome,
      equivalentFlatFee: hours ? annualIncome / hours : 0,
    };
  };

  return {
    low: scenario(lowSales),
    medium: scenario(mediumSales),
    high: scenario(highSales),
  };
}
