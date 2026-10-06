import { describe, expect, test } from "vitest";
import { getMatchingOpportunities } from "../utils/opportunityUtils";

describe("getMatchingOpportunities", () => {
  test("returns opportunities matching amount, tenure, and risk", () => {
    const opportunities = [
      {
        Opportunity_ID: "OPP-1001",
        Minimum_Amount_INR: "200000",
        Maximum_Amount_INR: "5000000",
        Tenure_Months: "12-36",
        Risk_Profile: "Moderate",
      },
      {
        Opportunity_ID: "OPP-1002",
        Minimum_Amount_INR: "500000",
        Maximum_Amount_INR: "7500000",
        Tenure_Months: "12-48",
        Risk_Profile: "Moderate",
      },
    ];

    const requirements = {
      amount: 500000,
      tenure: 12,
      risk: "Moderate",
    };

    const result = getMatchingOpportunities(
      opportunities,
      requirements
    );

    expect(result).toHaveLength(2);
  });

  test("returns no opportunities when the requirements do not match", () => {
    const opportunities = [
      {
        Opportunity_ID: "OPP-1001",
        Minimum_Amount_INR: "200000",
        Maximum_Amount_INR: "5000000",
        Tenure_Months: "12-36",
        Risk_Profile: "Moderate",
      },
    ];

    const requirements = {
      amount: 9000000,
      tenure: 12,
      risk: "Moderate",
    };

    const result = getMatchingOpportunities(
      opportunities,
      requirements
    );

    expect(result).toHaveLength(0);
  });
});