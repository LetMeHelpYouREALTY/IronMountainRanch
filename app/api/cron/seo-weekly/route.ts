import { NextRequest, NextResponse } from "next/server";

export const dynamic = "force-dynamic";
export const maxDuration = 60;

/**
 * Vercel Cron entrypoint — dispatches the heavy SEO weekly job to GitHub Actions.
 * Set CRON_SECRET + GITHUB_DISPATCH_TOKEN on Vercel Production.
 */
export async function GET(request: NextRequest) {
  const authHeader = request.headers.get("authorization");
  const cronSecret = process.env.CRON_SECRET?.trim();

  if (!cronSecret || authHeader !== `Bearer ${cronSecret}`) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const token = process.env.GITHUB_DISPATCH_TOKEN?.trim();
  const repo =
    process.env.GITHUB_REPOSITORY?.trim() || "LetMeHelpYouREALTY/IronMountainRanch";

  if (!token) {
    return NextResponse.json({
      ok: true,
      mode: "noop",
      message:
        "GITHUB_DISPATCH_TOKEN not configured. Add a fine-grained PAT with Actions write and set on Vercel Production.",
    });
  }

  const [owner, name] = repo.split("/");
  if (!owner || !name) {
    return NextResponse.json({ error: "Invalid GITHUB_REPOSITORY" }, { status: 500 });
  }

  const dispatchResponse = await fetch(
    `https://api.github.com/repos/${owner}/${name}/dispatches`,
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: "application/vnd.github+json",
        "X-GitHub-Api-Version": "2022-11-28",
      },
      body: JSON.stringify({
        event_type: "seo-weekly",
        client_payload: {
          triggered_by: "vercel-cron",
          at: new Date().toISOString(),
        },
      }),
    }
  );

  if (!dispatchResponse.ok) {
    const detail = await dispatchResponse.text();
    return NextResponse.json(
      { error: "GitHub dispatch failed", detail },
      { status: 502 }
    );
  }

  return NextResponse.json({
    ok: true,
    dispatched: true,
    repository: repo,
    workflow: "seo-weekly.yml",
  });
}
