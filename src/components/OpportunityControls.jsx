function OpportunityControls({
  searchTerm,
  onSearchChange,
  riskFilter,
  onRiskChange,
  sortBy,
  onSortChange,
}) {
  return (
    <section className="opportunity-controls">
      <div className="control-field">
        <label htmlFor="opportunity-search">
          Search opportunities
        </label>

        <input
          id="opportunity-search"
          type="search"
          value={searchTerm}
          onChange={(event) => onSearchChange(event.target.value)}
          placeholder="Search provider or product"
        />
      </div>

      <div className="control-field">
        <label htmlFor="risk-filter">
          Risk
        </label>

        <select
          id="risk-filter"
          value={riskFilter}
          onChange={(event) => onRiskChange(event.target.value)}
        >
          <option value="All">All risks</option>
          <option value="Moderate">Moderate</option>
          <option value="Moderately High">Moderately High</option>
          <option value="High">High</option>
        </select>
      </div>

      <div className="control-field">
        <label htmlFor="sort-by">
          Sort by
        </label>

        <select
          id="sort-by"
          value={sortBy}
          onChange={(event) => onSortChange(event.target.value)}
        >
          <option value="interest-low">
            Interest Rate: Low to High
          </option>

          <option value="interest-high">
            Interest Rate: High to Low
          </option>
        </select>
      </div>
    </section>
  );
}

export default OpportunityControls;