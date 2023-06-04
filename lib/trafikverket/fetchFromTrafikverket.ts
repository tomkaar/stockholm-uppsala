/**
 * A helper function to fetch information from Trafikverkets API.
 * Simply provide the query
 */
export function fetchFromTrafikverket(query: string) {
  return fetch("https://api.trafikinfo.trafikverket.se/v2/data.json", {
    method: "POST",
    headers: {
      "Content-Type": "application/xml",
      Accept: "application/json",
    },
    next: { revalidate: 10 },
    body: `
      <REQUEST>
        <LOGIN authenticationkey='${process.env.AUTH_KEY}' />
        ${query}
      </REQUEST>
    `,
  });
}
