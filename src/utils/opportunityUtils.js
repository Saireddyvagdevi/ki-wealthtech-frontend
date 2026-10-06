export function getMatchingOpportunities(opportunities, requirements) {
  if (!requirements) {
    return opportunities;
  }

  return opportunities.filter((opportunity) => {
    const amount = requirements.amount;
    const tenure = requirements.tenure;
    const risk = requirements.risk;

    const minimumAmount = Number(opportunity.Minimum_Amount_INR);
    const maximumAmount = Number(opportunity.Maximum_Amount_INR);

    const [minimumTenure, maximumTenure] =
      opportunity.Tenure_Months.split("-").map(Number);

    const amountMatches =
      amount >= minimumAmount && amount <= maximumAmount;

    const tenureMatches =
      tenure >= minimumTenure && tenure <= maximumTenure;

    const riskMatches =
      risk === opportunity.Risk_Profile;

    return amountMatches && tenureMatches && riskMatches;
  });
}

export function searchAndSortOpportunities(
  opportunities,
  searchTerm,
  riskFilter,
  sortBy
) {
  let result = [...opportunities];

  if (searchTerm.trim()) {
    const search = searchTerm.trim().toLowerCase();

    result = result.filter((opportunity) => {
      const provider = opportunity.Provider.toLowerCase();
      const product = opportunity.Product.toLowerCase();

      return (
        provider.includes(search) ||
        product.includes(search)
      );
    });
  }

  if (riskFilter !== "All") {
    result = result.filter(
      (opportunity) =>
        opportunity.Risk_Profile === riskFilter
    );
  }

  result.sort((a, b) => {
    const rateA = Number(
      a.Interest_Rate.replace("%", "")
    );

    const rateB = Number(
      b.Interest_Rate.replace("%", "")
    );

    if (sortBy === "interest-high") {
      return rateB - rateA;
    }

    return rateA - rateB;
  });

  return result;
}