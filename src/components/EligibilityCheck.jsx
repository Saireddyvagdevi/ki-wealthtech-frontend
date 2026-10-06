function EligibilityCheck({
  opportunity,
  requirements,
  onCheck,
  loading,
  onClose,
}) {
  if (!opportunity) return null;

  return (
    <div className="eligibility-overlay">
      <section
        className="eligibility-section"
        role="dialog"
        aria-modal="true"
        aria-labelledby="eligibility-title"
      >
        <button
          type="button"
          className="eligibility-close"
          onClick={onClose}
          aria-label="Close eligibility check"
        >
          ×
        </button>

        <div className="eligibility-header">
          <p className="eyebrow">Eligibility Check</p>

          <h2 id="eligibility-title">
            Check eligibility for {opportunity.Provider}
          </h2>

          <p>
            Review your requirements and check whether this opportunity
            supports them.
          </p>
        </div>

        <form
          onSubmit={(event) => {
            event.preventDefault();

            onCheck({
              opportunity,
              amount: Number(event.target.amount.value),
              tenure: Number(event.target.tenure.value),
              risk: event.target.risk.value,
              securityType: event.target.securityType.value,
            });
          }}
        >
          <div className="form-field">
            <label htmlFor="eligibility-amount">
              Required Amount (₹)
            </label>

            <input
              id="eligibility-amount"
              name="amount"
              type="number"
              min="1"
              defaultValue={requirements?.amount || ""}
              required
            />
          </div>

          <div className="form-field">
            <label htmlFor="eligibility-tenure">
              Tenure
            </label>

            <select
              id="eligibility-tenure"
              name="tenure"
              defaultValue={requirements?.tenure || ""}
              required
            >
              <option value="">Select tenure</option>
              <option value="6">6 months</option>
              <option value="12">12 months</option>
              <option value="18">18 months</option>
              <option value="24">24 months</option>
              <option value="36">36 months</option>
              <option value="48">48 months</option>
              <option value="60">60 months</option>
            </select>
          </div>

          <div className="form-field">
            <label htmlFor="eligibility-risk">
              Risk Preference
            </label>

            <select
              id="eligibility-risk"
              name="risk"
              defaultValue={requirements?.risk || ""}
              required
            >
              <option value="">Select risk preference</option>
              <option value="Moderate">Moderate</option>
              <option value="Moderately High">Moderately High</option>
              <option value="High">High</option>
            </select>
          </div>

          <div className="form-field">
            <label htmlFor="eligibility-security">
              Security Type
            </label>

            <select
              id="eligibility-security"
              name="securityType"
              defaultValue={requirements?.securityType || ""}
              required
            >
              <option value="">Select security type</option>
              <option value="Equity Shares">Equity Shares</option>
              <option value="Mutual Funds">Mutual Funds</option>
              <option value="Bonds">Bonds</option>
            </select>
          </div>

          <button type="submit" disabled={loading}>
            {loading ? "Checking..." : "Check Eligibility"}
          </button>
        </form>
      </section>
    </div>
  );
}

export default EligibilityCheck;