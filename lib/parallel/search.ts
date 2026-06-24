/**
 * Parallel Search API client (server-side).
 * @see https://docs.parallel.ai/search/search-quickstart
 */

export type ParallelSearchResult = {
  url: string;
  title?: string | null;
  publish_date?: string | null;
  excerpts: string[];
};

export type ParallelSearchResponse = {
  search_id: string;
  results: ParallelSearchResult[];
  session_id: string;
};

export async function parallelWebSearch(params: {
  objective: string;
  search_queries: string[];
  session_id?: string;
}): Promise<ParallelSearchResponse> {
  const apiKey = process.env.PARALLEL_API_KEY?.trim();
  if (!apiKey) {
    throw new Error("PARALLEL_API_KEY is not set");
  }

  const response = await fetch("https://api.parallel.ai/v1/search", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-api-key": apiKey,
    },
    body: JSON.stringify({
      objective: params.objective,
      search_queries: params.search_queries,
      ...(params.session_id ? { session_id: params.session_id } : {}),
    }),
  });

  if (!response.ok) {
    const text = await response.text();
    throw new Error(`Parallel search failed (${response.status}): ${text}`);
  }

  return (await response.json()) as ParallelSearchResponse;
}

export function formatParallelResultsForReport(
  label: string,
  data: ParallelSearchResponse
): string {
  const lines = [`## ${label}`, "", `Search ID: ${data.search_id}`, ""];
  for (const result of data.results.slice(0, 5)) {
    lines.push(`### ${result.title ?? result.url}`);
    lines.push(`Source: ${result.url}`);
    if (result.publish_date) lines.push(`Published: ${result.publish_date}`);
    lines.push("");
    for (const excerpt of result.excerpts.slice(0, 2)) {
      lines.push(excerpt.trim());
      lines.push("");
    }
  }
  return lines.join("\n");
}
