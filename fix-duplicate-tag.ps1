# Fix duplicate AnimatePresence tag
$file = "app\resume\[id]\page.jsx"
$lines = Get-Content $file
$newLines = @()

for ($i = 0; $i -lt $lines.Count; $i++) {
    # Skip line 335 (index 335, which is the duplicate </AnimatePresence>)
    if ($i -eq 335) {
        continue
    }
    # Fix line 337 (index 337) - remove space in </div >
    if ($lines[$i] -match '</div\s+>') {
        $newLines += $lines[$i] -replace '</div\s+>', '</div>'
    } else {
        $newLines += $lines[$i]
    }
}

$newLines | Set-Content $file
Write-Host "Fixed duplicate AnimatePresence tag and div spacing"
