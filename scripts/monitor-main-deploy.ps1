# Monitors origin/main and prints a wake sentinel when HEAD advances.
# Used by Cursor agent loops after deploy pushes.
param(
  [int]$IntervalSeconds = 300,
  [string]$RepoPath = (Split-Path -Parent (Split-Path -Parent $PSScriptRoot))
)

$ErrorActionPreference = "SilentlyContinue"
$last = git -C $RepoPath rev-parse origin/main 2>$null

while ($true) {
  Start-Sleep -Seconds $IntervalSeconds
  git -C $RepoPath fetch origin main 2>$null
  $current = git -C $RepoPath rev-parse origin/main 2>$null
  if ($current -and $current -ne $last) {
    $subject = git -C $RepoPath log -1 --format=%s $current 2>$null
    Write-Output "AGENT_LOOP_WAKE_DEPLOY {\"sha\":\"$current\",\"subject\":\"$subject\"}"
    $last = $current
  }
}
