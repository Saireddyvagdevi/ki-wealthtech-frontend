import { useState } from "react";

function RequirementForm({ onSearch }) {
  const [amount, setAmount] = useState("");
  const [tenure, setTenure] = useState("");
  const [risk, setRisk] = useState("");
  const [securityType, setSecurityType] = useState("");

  const [errors, setErrors] = useState({});

  function validateForm() {
    const newErrors = {};

    if (!amount) {
      newErrors.amount = "Please enter the required amount.";
    } else if (Number(amount) <= 0) {
      newErrors.amount = "Amount must be greater than 0.";
    }

    if (!tenure) {
      newErrors.tenure = "Please select a tenure.";
    }

    if (!risk) {
      newErrors.risk = "Please select your risk preference.";
    }

    if (!securityType) {
      newErrors.securityType = "Please select a security type.";
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  }

  function handleSubmit(event) {
    event.preventDefault();

    if (!validateForm()) {
      return;
    }

    onSearch({
      amount: Number(amount),
      tenure: Number(tenure),
      risk,
      securityType,
    });
  }

  return (
    <section className="requirement-form">
      <div className="form-header">
        <p className="eyebrow">Financial Opportunity Discovery</p>

        <h1>Find the right opportunity for you</h1>

        <p>
          Enter your requirements to discover financial opportunities that
          match your needs.
        </p>
      </div>

      <form onSubmit={handleSubmit} noValidate>
        <div className="form-field">
          <label htmlFor="amount">Required Amount (₹)</label>

          <input
            id="amount"
            type="number"
            min="1"
            value={amount}
            onChange={(event) => setAmount(event.target.value)}
            placeholder="Enter amount"
          />

          {errors.amount && (
            <p className="field-error">{errors.amount}</p>
          )}
        </div>

        <div className="form-field">
          <label htmlFor="tenure">Tenure</label>

          <select
            id="tenure"
            value={tenure}
            onChange={(event) => setTenure(event.target.value)}
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

          {errors.tenure && (
            <p className="field-error">{errors.tenure}</p>
          )}
        </div>

        <div className="form-field">
          <label htmlFor="risk">Risk Preference</label>

          <select
            id="risk"
            value={risk}
            onChange={(event) => setRisk(event.target.value)}
          >
            <option value="">Select risk preference</option>
            <option value="Moderate">Moderate</option>
            <option value="Moderately High">Moderately High</option>
            <option value="High">High</option>
          </select>

          {errors.risk && (
            <p className="field-error">{errors.risk}</p>
          )}
        </div>

        <div className="form-field">
          <label htmlFor="securityType">Security Type</label>

          <select
            id="securityType"
            value={securityType}
            onChange={(event) => setSecurityType(event.target.value)}
          >
            <option value="">Select security type</option>
            <option value="Equity Shares">Equity Shares</option>
            <option value="Mutual Funds">Mutual Funds</option>
            <option value="Bonds">Bonds</option>
          </select>

          {errors.securityType && (
            <p className="field-error">{errors.securityType}</p>
          )}
        </div>

        <button type="submit">
          Find Opportunities
        </button>
      </form>
    </section>
  );
}

export default RequirementForm;