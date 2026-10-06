import opportunitiesCsv from "../data/opportunities.csv?raw";

function parseCsv(csvText) {
  const lines = csvText.trim().split("\n");

  const headers = lines[0].split(",");

  return lines.slice(1).map((line) => {
    const values = line.split(",");

    const opportunity = {};

    headers.forEach((header, index) => {
      opportunity[header.trim()] = values[index]?.trim() || "";
    });

    return opportunity;
  });
}

export function getOpportunities() {
  return new Promise((resolve) => {
    setTimeout(() => {
      const opportunities = parseCsv(opportunitiesCsv);
      resolve(opportunities);
    }, 500);
  });
}

export function getOpportunityById(id) {
  return new Promise((resolve) => {
    setTimeout(() => {
      const opportunities = parseCsv(opportunitiesCsv);

      const opportunity = opportunities.find(
        (item) => item.Opportunity_ID === id
      );

      resolve(opportunity || null);
    }, 500);
  });
}