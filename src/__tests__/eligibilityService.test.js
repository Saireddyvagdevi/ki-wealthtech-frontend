import { describe, expect, test } from "vitest";
import { checkEligibility } from "../services/eligibilityService";

const opportunity = {
  Opportunity_ID: "OPP-1001",
  Minimum_Amount_INR: "200000",
  Maximum_Amount_INR: "5000000",
  Tenure_Months: "12-36",
  Risk_Profile: "Moderate",
};

describe("checkEligibility", () => {
  test("returns eligible when all requirements match", async () => {
    const result = await checkEligibility({
      opportunity,
      amount: 500000,
      tenure: 12,
      risk: "Moderate",
      securityType: "Equity Shares",
    });

    expect(result.status).toBe("eligible");
    expect(result.reasons).toHaveLength(0);
  });

  test("returns not eligible when amount exceeds maximum", async () => {
    const result = await checkEligibility({
      opportunity,
      amount: 6000000,
      tenure: 12,
      risk: "Moderate",
      securityType: "Equity Shares",
    });

    expect(result.status).toBe("not_eligible");
    expect(result.reasons.length).toBeGreaterThan(0);
  });
});