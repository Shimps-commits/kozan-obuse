# 画面の文字だけを含む軽いフォント（woff2）を Google Fonts から作り直す。
# 文言を変えたら、プロジェクトのフォルダでこれを実行する：
#   powershell -ExecutionPolicy Bypass -File tools\subset-fonts.ps1
$ErrorActionPreference = 'Stop'
$root = Split-Path $PSScriptRoot -Parent
$src = 'index.html', 'js\deck.js', 'js\ui.js', 'js\timeline.js' | ForEach-Object { [IO.File]::ReadAllText((Join-Path $root $_)) }
$set = New-Object 'System.Collections.Generic.SortedSet[string]'
foreach ($t in $src) {
  $e = [Globalization.StringInfo]::GetTextElementEnumerator($t)
  while ($e.MoveNext()) { $c = $e.GetTextElement(); if ($c -match '^\s$') { continue }; [void]$set.Add($c) }
}
for ($i = 32; $i -le 126; $i++) { [void]$set.Add([string][char]$i) }
'0123456789０１２３４５６７８９'.ToCharArray() | ForEach-Object { [void]$set.Add([string]$_) }
$text = -join $set
$ua = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0 Safari/537.36'
$fonts = @(
  @{ fam = 'Shippori+Mincho:wght@800'; out = 'shippori-800-subset.woff2' },
  @{ fam = 'Noto+Sans+JP:wght@300;400'; out = 'noto-sans-jp-subset.woff2' }
)
foreach ($f in $fonts) {
  $u = "https://fonts.googleapis.com/css2?family=$($f.fam)&text=" + [Uri]::EscapeDataString($text)
  $css = (Invoke-WebRequest -UseBasicParsing -Uri $u -UserAgent $ua).Content
  $urls = [regex]::Matches($css, 'url\((https://[^)]+)\)') | ForEach-Object { $_.Groups[1].Value } | Select-Object -Unique
  $urls = @($urls)
  $i = 0
  foreach ($w in $urls) {
    $name = if ($urls.Count -gt 1) { $f.out -replace '\.woff2$', "-$i.woff2" } else { $f.out }
    Invoke-WebRequest -UseBasicParsing -Uri $w -UserAgent $ua -OutFile (Join-Path $root "fonts\$name")
    "{0}  {1:N0} bytes" -f $name, (Get-Item (Join-Path $root "fonts\$name")).Length
    $i++
  }
}
"文字数: $($set.Count)"
