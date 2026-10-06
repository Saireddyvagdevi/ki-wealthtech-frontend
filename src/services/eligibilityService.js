export function checkEligibility({
  opportunity,
  amount,
  tenure,
  risk,
  securityType,
}) {
  return new Promise((resolve) => {
    setTimeout(() => {
      const minimumAmount = Number(
        opportunity.Minimum_Amount_INR
      );

      const maximumAmount = Number(
        opportunity.Maximum_Amount_INR
      );

      const [minimumTenure, maximumTenure] =
        opportunity.Tenure_Months.split("-").map(Number);

      const reasons = [];

      /*
       * Mock eligibility rules:
       *
       * 1. Amount must be within the opportunity range.
       * 2. Tenure must be within the supported range.
       * 3. Risk preference should match the opportunity.
       *
       * Security type is accepted because it is required by
       * the API contract, but the supplied CSV does not contain
       * security-type data, so it cannot be validated against
       * the dataset.
       */

      if (amount < minimumAmount) {
        reasons.push(
          `Requested amount is below the minimum supported amount of ₹${minimumAmount.toLocaleString(
            "en-IN"
          )}.`
        );
      }

      if (amount > maximumAmount) {
        reasons.push(
          `Requested amount exceeds the maximum supported amount of ₹${maximumAmount.toLocaleString(
            "en-IN"
          )}.`
        );
      }

      if (
        tenure < minimumTenure ||
        tenure > maximumTenure
      ) {
        reasons.push(
          `Requested tenure is outside the supported range of ${opportunity.Tenure_Months} months.`
        );
      }

      if (risk !== opportunity.Risk_Profile) {
        reasons.push(
          `Selected risk preference does not match the opportunity risk profile of ${opportunity.Risk_Profile}.`
        );
      }

      let status = "eligible";

      if (
  amount < minimumAmount ||
  amount > maximumAmount ||
  tenure < minimumTenure ||
  tenure > maximumTenure
) {
  status = "not_eligible";
} else if (risk !== opportunity.Risk_Profile) {
  status = "conditional";
}

      resolve({
        status,
        reasons,
        max_supported_amount: maximumAmount,
        security_type: securityType,
      });
    }, 700);
  });
}