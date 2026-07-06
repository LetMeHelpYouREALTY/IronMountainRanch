/**
 * Shared Parallel API client for SEO weekly automation.
 * @see https://docs.parallel.ai/search/search-quickstart
 * @see https://docs.parallel.ai/extract/extract-quickstart
 */

const PARALLEL_BETA = "search-extract-2025-10-10";
const SEARCH_URL = "https://api.parallel.ai/v1beta/search";
const EXTRACT_URL = "https://api.parallel.ai/v1beta/extract";

export function getParallelApiKey() {
  return process.env.PARALLEL_API_KEY?.trim() ?? "";
}

function parallelHeaders(apiKey) {
  return {
    "Content-Type": "application/json",
    "x-api-key": apiKey,
    "parallel-beta": PARALLEL_BETA,
  };
}

export async function parallelSearch({
  objective,
  search_queries,
  session_id,
  max_results = 10,
}) {
  const apiKey = getParallelApiKey();
  if (!apiKey) {
    return { skipped: true, reason: "PARALLEL_API_KEY not set" };
  }

  const response = await fetch(SEARCH_URL, {
    method: "POST",
    headers: parallelHeaders(apiKey),
    body: JSON.stringify({
      objective,
      search_queries,
      max_results,
      mode: "one-shot",
      ...(session_id ? { session_id } : {}),
    }),
  });

  if (!response.ok) {
    const text = await response.text();
    throw new Error(`Parallel search failed (${response.status}): ${text}`);
  }

  return response.json();
}

export async function parallelExtract({ urls, objective }) {
  const apiKey = getParallelApiKey();
  if (!apiKey) {
    return { skipped: true, reason: "PARALLEL_API_KEY not set" };
  }

  const response = await fetch(EXTRACT_URL, {
    method: "POST",
    headers: parallelHeaders(apiKey),
    body: JSON.stringify({
      urls,
      objective,
      excerpts: { max_chars_per_result: 3000 },
      full_content: false,
    }),
  });

  if (!response.ok) {
    const text = await response.text();
    throw new Error(`Parallel extract failed (${response.status}): ${text}`);
  }

  return response.json();
}
