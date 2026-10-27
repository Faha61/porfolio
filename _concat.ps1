$fragments = @(
    '_fragment_about.html',
    '_fragment_skills.html',
    '_fragment_experience_part1.html',
    '_fragment_experience_part2.html',
    '_fragment_achievements.html',
    '_fragment_projects.html',
    '_fragment_services.html',
    '_fragment_contact_part1.html',
    '_fragment_contact_part2.html',
    '_fragment_footer.html'
)

$basePath = 'z:\University related Documents\Portfolio-Website\'
$target = Join-Path $basePath 'index.html'

foreach ($frag in $fragments) {
    $fragPath = Join-Path $basePath $frag
    if (Test-Path $fragPath) {
        $content = Get-Content $fragPath -Raw
        Add-Content -Path $target -Value $content -Encoding utf8
        Write-Host "Appended: $frag"
    } else {
        Write-Host "MISSING: $frag"
    }
}

Write-Host "All fragments appended successfully"