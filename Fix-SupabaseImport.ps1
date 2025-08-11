# Path setup
$clientPath = "src/lib/supabaseClient.ts"
$authContextPath = "src/context/AuthContext.tsx"

# Read supabaseClient.ts
$supabaseContent = Get-Content $clientPath -Raw

# Determine export type
if ($supabaseContent -match "export\s+default\s+supabase") {
    Write-Host "✅ Detected default export in supabaseClient.ts"
    # Ensure import uses default
    (Get-Content $authContextPath) -replace 'import\s+\{?\s*supabase\s*\}?\s+from\s+".+?"', 'import supabase from "../lib/supabaseClient";' | Set-Content $authContextPath
}
elseif ($supabaseContent -match "export\s+const\s+supabase") {
    Write-Host "✅ Detected named export in supabaseClient.ts"
    # Ensure import uses named
    (Get-Content $authContextPath) -replace 'import\s+supabase\s+from\s+".+?"', 'import { supabase } from "../lib/supabaseClient";' | Set-Content $authContextPath
}
else {
    Write-Host "⚠️ Could not detect supabase export type. Manual check required."
    exit 1
}

# Optional: Run build
Write-Host ""
Write-Host "Running build to verify fix..."
npm run build