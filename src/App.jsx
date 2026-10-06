import { useEffect, useState } from "react";
import RequirementForm from "./components/RequirementForm";
import OpportunityCard from "./components/OpportunityCard";
import OpportunityControls from "./components/OpportunityControls";
import OpportunityDetails from "./components/OpportunityDetails";
import ComparisonView from "./components/ComparisonView";
import EligibilityCheck from "./components/EligibilityCheck";
import EligibilityResult from "./components/EligibilityResult";
import OpportunitySkeleton from "./components/OpportunitySkeleton";

import { checkEligibility } from "./services/eligibilityService";
import { getOpportunities } from "./services/opportunityService";

import {
  getMatchingOpportunities,
  searchAndSortOpportunities,
} from "./utils/opportunityUtils";

function App() {
  const [requirements, setRequirements] = useState(null);
  const [opportunities, setOpportunities] = useState([]);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [searchTerm, setSearchTerm] = useState("");
  const [riskFilter, setRiskFilter] = useState("All");
  const [sortBy, setSortBy] = useState("interest-low");

  const [selectedOpportunity, setSelectedOpportunity] = useState(null);

  const [comparisonList, setComparisonList] = useState([]);
  const [showComparison, setShowComparison] = useState(false);

  const [showEligibility, setShowEligibility] = useState(false);
  const [eligibilityLoading, setEligibilityLoading] = useState(false);
  const [eligibilityResult, setEligibilityResult] = useState(null);

  function loadOpportunities() {
    setLoading(true);
    setError("");

    getOpportunities()
      .then((data) => {
        setOpportunities(data);
      })
      .catch(() => {
        setError(
          "We couldn't load the opportunities. Please try again."
        );
      })
      .finally(() => {
        setLoading(false);
      });
  }

  useEffect(() => {
    loadOpportunities();
  }, []);

  function handleSearch(formData) {
    setRequirements(formData);

    setSearchTerm("");
    setRiskFilter("All");
    setSortBy("interest-low");

    setComparisonList([]);
    setShowComparison(false);

    setSelectedOpportunity(null);
    setShowEligibility(false);
    setEligibilityResult(null);
  }

  function handleSelect(opportunity) {
    setComparisonList((currentList) => {
      const alreadySelected = currentList.some(
        (item) =>
          item.Opportunity_ID === opportunity.Opportunity_ID
      );

      if (alreadySelected) {
        return currentList.filter(
          (item) =>
            item.Opportunity_ID !== opportunity.Opportunity_ID
        );
      }

      if (currentList.length >= 3) {
        alert("You can compare a maximum of 3 opportunities.");
        return currentList;
      }

      return [...currentList, opportunity];
    });
  }

  function handleRemoveFromComparison(opportunity) {
    setComparisonList((currentList) =>
      currentList.filter(
        (item) =>
          item.Opportunity_ID !== opportunity.Opportunity_ID
      )
    );
  }

  function handleViewDetails(opportunity) {
    setSelectedOpportunity(opportunity);
    setShowEligibility(false);
    setEligibilityResult(null);
  }

  function handleOpenEligibility() {
    setShowEligibility(true);
    setEligibilityResult(null);
  }

  function handleCloseEligibility() {
    setShowEligibility(false);
    setEligibilityResult(null);
  }

  async function handleEligibilityCheck(data) {
    setEligibilityLoading(true);
    setEligibilityResult(null);

    try {
      const result = await checkEligibility(data);

      setEligibilityResult(result);
      setShowEligibility(false);
    } finally {
      setEligibilityLoading(false);
    }
  }

  function handleCloseEligibilityResult() {
    setEligibilityResult(null);
  }

  const matchingOpportunities = getMatchingOpportunities(
    opportunities,
    requirements
  );

  const displayedOpportunities = searchAndSortOpportunities(
    matchingOpportunities,
    searchTerm,
    riskFilter,
    sortBy
  );

  return (
    <main>
      <RequirementForm onSearch={handleSearch} />

      {requirements && (
        <section>
          <h2>Matching Opportunities</h2>

          <p>
            Showing opportunities for ₹
            {requirements.amount.toLocaleString("en-IN")} for{" "}
            {requirements.tenure} months.
          </p>

          {loading ? (
  <div className="opportunity-list">
    <OpportunitySkeleton />
    <OpportunitySkeleton />
    <OpportunitySkeleton />
  </div>
) : error ? (
            <div>
              <p>{error}</p>

              <button
                type="button"
                onClick={loadOpportunities}
              >
                Retry
              </button>
            </div>
          ) : (
            <>
              {comparisonList.length >= 2 && (
                <div className="comparison-action">
                  <p>
                    {comparisonList.length} opportunities selected
                    for comparison.
                  </p>

                  <button
                    type="button"
                    onClick={() => setShowComparison(true)}
                  >
                    Compare {comparisonList.length} Opportunities
                  </button>
                </div>
              )}

              <OpportunityControls
                searchTerm={searchTerm}
                onSearchChange={setSearchTerm}
                riskFilter={riskFilter}
                onRiskChange={setRiskFilter}
                sortBy={sortBy}
                onSortChange={setSortBy}
              />

              {displayedOpportunities.length === 0 ? (
                <p>No matching opportunities found.</p>
              ) : (
                <div>
                  {displayedOpportunities.map((opportunity) => (
                    <OpportunityCard
                      key={opportunity.Opportunity_ID}
                      opportunity={opportunity}
                      isSelected={comparisonList.some(
                        (item) =>
                          item.Opportunity_ID ===
                          opportunity.Opportunity_ID
                      )}
                      onSelect={handleSelect}
                      onViewDetails={handleViewDetails}
                    />
                  ))}
                </div>
              )}
            </>
          )}
        </section>
      )}

      {/* Comparison */}
      {showComparison && comparisonList.length >= 2 && (
        <ComparisonView
          opportunities={comparisonList}
          onRemove={handleRemoveFromComparison}
          onClose={() => setShowComparison(false)}
        />
      )}

      {/* Opportunity Details */}
      {selectedOpportunity && !showEligibility && !eligibilityResult && (
        <OpportunityDetails
          opportunity={selectedOpportunity}
          onClose={() => setSelectedOpportunity(null)}
          isSelected={comparisonList.some(
            (item) =>
              item.Opportunity_ID ===
              selectedOpportunity.Opportunity_ID
          )}
          onSelect={handleSelect}
          onCheckEligibility={handleOpenEligibility}
        />
      )}

      {/* Eligibility Check */}
      {showEligibility && selectedOpportunity && (
        <EligibilityCheck
          opportunity={selectedOpportunity}
          requirements={requirements}
          onCheck={handleEligibilityCheck}
          loading={eligibilityLoading}
          onClose={handleCloseEligibility}
        />
      )}

      {/* Eligibility Result */}
      {eligibilityResult && (
        <EligibilityResult
          result={eligibilityResult}
          onClose={handleCloseEligibilityResult}
        />
      )}
    </main>
  );
}

export default App;