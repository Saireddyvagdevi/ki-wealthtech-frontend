function EligibilityResult({ result, onClose }) {
  if (!result) {
    return null;
  }

  const statusLabels = {
    eligible: "Eligible",
    conditional: "Conditional",
    not_eligible: "Not Eligible",
  };

  const statusLabel =
    statusLabels[result.status] || "Eligibility Result";

  return (
    <section className="eligibility-result">
      <div className="eligibility-result-header">
        <p className="eyebrow">
          Eligibility Result
        </p>

<h2 className={`eligibility-status ${result.status}`}>
  {statusLabel}
</h2>
      </div>

      {result.reasons.length > 0 ? (
        <div className="eligibility-reasons">
          <h3>Reasons</h3>

          <ul>
            {result.reasons.map((reason, index) => (
              <li key={index}>{reason}</li>
            ))}
          </ul>
        </div>
      ) : (
        <p>
          Your requirements match the supported
          criteria for this opportunity.
        </p>
      )}

      {result.max_supported_amount && (
        <div className="eligibility-limit">
          <span>Maximum Supported Amount</span>

          <strong>
            ₹
            {Number(
              result.max_supported_amount
            ).toLocaleString("en-IN")}
          </strong>
        </div>
      )}

      <div className="eligibility-next-action">
        {result.status === "eligible" && (
          <>
            <h3>Next Action</h3>

            <p>
              You can proceed with this opportunity
              and review the next application steps.
            </p>

            <button type="button">
              Proceed
            </button>
          </>
        )}

        {result.status === "conditional" && (
          <>
            <h3>Next Action</h3>

            <p>
              Review the conditions above and
              consider adjusting your requirements
              before proceeding.
            </p>

            <button type="button">
              Review Requirements
            </button>
          </>
        )}

        {result.status === "not_eligible" && (
          <>
            <h3>Next Action</h3>

            <p>
              This opportunity does not currently
              support your requested requirements.
            </p>

            <button
              type="button"
              onClick={onClose}
            >
              Explore Other Opportunities
            </button>
          </>
        )}
      </div>

      <button
        type="button"
        onClick={onClose}
      >
        Close Result
      </button>
    </section>
  );
}

export default EligibilityResult;