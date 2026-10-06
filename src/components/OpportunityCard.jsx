function OpportunityCard({
  opportunity,
  isSelected,
  onSelect,
  onViewDetails,
}) {
  return (
    <article className="opportunity-card">
      <div className="opportunity-card-header">
        <div>
          <p className="provider-name">{opportunity.Provider}</p>
          <h3>{opportunity.Product}</h3>
        </div>

        <span className="risk-badge">
          {opportunity.Risk_Profile}
        </span>
      </div>

      <div className="opportunity-rate">
        <span>Interest Rate</span>
        <strong>{opportunity.Interest_Rate}</strong>
      </div>

      <div className="opportunity-details">
        <div>
          <span>Amount</span>
          <strong>
            ₹{Number(opportunity.Minimum_Amount_INR).toLocaleString("en-IN")}
            {" - "}
            ₹{Number(opportunity.Maximum_Amount_INR).toLocaleString("en-IN")}
          </strong>
        </div>

        <div>
          <span>Tenure</span>
          <strong>{opportunity.Tenure_Months} months</strong>
        </div>

        <div>
          <span>LTV</span>
          <strong>{opportunity.LTV}</strong>
        </div>

        <div>
          <span>Processing Fee</span>
          <strong>{opportunity.Processing_Fee}</strong>
        </div>
      </div>

      <div className="opportunity-actions">
        <button
          type="button"
          onClick={() => onViewDetails(opportunity)}
        >
          View Details
        </button>

        <button
          type="button"
          onClick={() => onSelect(opportunity)}
          aria-pressed={isSelected}
        >
          {isSelected ? "Selected" : "Compare"}
        </button>
      </div>
    </article>
  );
}

export default OpportunityCard;