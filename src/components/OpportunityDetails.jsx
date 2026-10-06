function OpportunityDetails({
  opportunity,
  onClose,
  isSelected,
  onSelect,
  onCheckEligibility,
}) {
  if (!opportunity) {
    return null;
  }

  return (
    <div className="details-overlay">
      <div
        className="details-modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby="details-title"
      >
        <button
          type="button"
          className="details-close"
          onClick={onClose}
          aria-label="Close opportunity details"
        >
          ×
        </button>

        <p className="eyebrow">Opportunity Details</p>

        <h2 id="details-title">
          {opportunity.Provider}
        </h2>

        <p className="details-product">
          {opportunity.Product}
        </p>

        <div className="details-grid">
          <div>
            <span>Interest Rate</span>
            <strong>{opportunity.Interest_Rate}</strong>
          </div>

          <div>
            <span>Risk Profile</span>
            <strong>{opportunity.Risk_Profile}</strong>
          </div>

          <div>
            <span>Minimum Amount</span>
            <strong>
              ₹
              {Number(
                opportunity.Minimum_Amount_INR
              ).toLocaleString("en-IN")}
            </strong>
          </div>

          <div>
            <span>Maximum Amount</span>
            <strong>
              ₹
              {Number(
                opportunity.Maximum_Amount_INR
              ).toLocaleString("en-IN")}
            </strong>
          </div>

          <div>
            <span>Tenure</span>
            <strong>
              {opportunity.Tenure_Months} months
            </strong>
          </div>

          <div>
            <span>LTV</span>
            <strong>{opportunity.LTV}</strong>
          </div>

          <div>
            <span>Processing Fee</span>
            <strong>
              {opportunity.Processing_Fee}
            </strong>
          </div>

          <div>
            <span>Opportunity ID</span>
            <strong>
              {opportunity.Opportunity_ID}
            </strong>
          </div>
        </div>

        <div className="details-actions">
            <button
  type="button"
  onClick={() => onCheckEligibility(opportunity)}
>
  Check Eligibility
</button>
          <button
            type="button"
            onClick={() => onSelect(opportunity)}
          >
            {isSelected
              ? "Selected for Comparison"
              : "Add to Compare"}
          </button>

          <button
            type="button"
            onClick={onClose}
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}

export default OpportunityDetails;