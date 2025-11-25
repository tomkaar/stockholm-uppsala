import "server-only"

/**
 * A helper function to fetch information from Trafikverkets API.
 * Simply provide the query
 */
export async function fetchFromTrafikverket(query: string) {
  return fetch("https://api.trafikinfo.trafikverket.se/v2/data.json", {
    method: "POST",
    headers: {
      "Content-Type": "application/xml",
      Accept: "application/json",
    },
    body: `
      <REQUEST>
        <LOGIN authenticationkey='${process.env.AUTH_KEY}' />
        ${query}
      </REQUEST>
    `,
  })
}
