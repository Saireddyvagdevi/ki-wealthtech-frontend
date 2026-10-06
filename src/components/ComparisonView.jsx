function ComparisonView({ opportunities, onRemove, onClose }) {
  if (opportunities.length === 0) {
    return null;
  }

  return (
    <section className="comparison-section">
      <div className="comparison-header">
        <div>
          <p className="eyebrow">Compare Opportunities</p>

          <h2>Compare your selected options</h2>

          <p>
            Compare the key details before checking eligibility.
          </p>
        </div>

        <button
          type="button"
          onClick={onClose}
        >
          Close Comparison
        </button>
      </div>

      <div className="comparison-table-wrapper">
        <table className="comparison-table">
          <thead>
            <tr>
              <th>Feature</th>

              {opportunities.map((opportunity) => (
                <th key={opportunity.Opportunity_ID}>
                  <div className="comparison-provider">
                    {opportunity.Provider}
                  </div>

                  <button
                    type="button"
                    onClick={() => onRemove(opportunity)}
                  >
                    Remove
                  </button>
                </th>
              ))}
            </tr>
          </thead>

          <tbody>
            <tr>
              <th>Product</th>

              {opportunities.map((opportunity) => (
                <td key={opportunity.Opportunity_ID}>
                  {opportunity.Product}
                </td>
              ))}
            </tr>

            <tr>
              <th>Interest Rate</th>

              {opportunities.map((opportunity) => (
                <td key={opportunity.Opportunity_ID}>
                  <strong>
                    {opportunity.Interest_Rate}
                  </strong>
                </td>
              ))}
            </tr>

            <tr>
              <th>Amount Range</th>

              {opportunities.map((opportunity) => (
                <td key={opportunity.Opportunity_ID}>
                  ₹
                  {Number(
                    opportunity.Minimum_Amount_INR
                  ).toLocaleString("en-IN")}
                  {" - "}
                  ₹
                  {Number(
                    opportunity.Maximum_Amount_INR
                  ).toLocaleString("en-IN")}
                </td>
              ))}
            </tr>

            <tr>
              <th>Tenure</th>

              {opportunities.map((opportunity) => (
                <td key={opportunity.Opportunity_ID}>
                  {opportunity.Tenure_Months} months
                </td>
              ))}
            </tr>

            <tr>
              <th>LTV</th>

              {opportunities.map((opportunity) => (
                <td key={opportunity.Opportunity_ID}>
                  {opportunity.LTV}
                </td>
              ))}
            </tr>

            <tr>
              <th>Processing Fee</th>

              {opportunities.map((opportunity) => (
                <td key={opportunity.Opportunity_ID}>
                  {opportunity.Processing_Fee}
                </td>
              ))}
            </tr>

            <tr>
              <th>Risk Profile</th>

              {opportunities.map((opportunity) => (
                <td key={opportunity.Opportunity_ID}>
                  {opportunity.Risk_Profile}
                </td>
              ))}
            </tr>
          </tbody>
        </table>
      </div>
    </section>
  );
}

export default ComparisonView;