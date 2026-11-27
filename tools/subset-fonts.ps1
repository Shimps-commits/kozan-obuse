# 画面の文字だけを含む軽いフォント（woff2）を Google Fonts から作り直し、css/fonts.css を書き出す。
# 文言を変えたら、プロジェクトのフォルダでこれを実行する：
#   powershell -ExecutionPolicy Bypass -File tools\subset-fonts.ps1
# 文字が多いと1回の依頼に入りきらないので、350字ずつに分けて取り寄せ、unicode-range で束ねる。
$ErrorActionPreference = 'Stop'
$root = Split-Path $PSScriptRoot -Parent
$src = 'index.html', 'js\deck.js', 'js\ui.js', 'js\timeline.js', 'js\obuse.js' | ForEach-Object { [IO.File]::ReadAllText((Join-Path $root $_)) }
$set = New-Object 'System.Collections.Generic.SortedSet[int]'
foreach ($t in $src) {
  $e = [Globalization.StringInfo]::GetTextElementEnumerator($t)
  while ($e.MoveNext()) {
    $c = $e.GetTextElement()
    if ($c -match '^\s$') { continue }
    $cp = [Char]::ConvertToUtf32($c, 0)
    [void]$set.Add($cp)
  }
}
for ($i = 32; $i -le 126; $i++) { [void]$set.Add($i) }
'０１２３４５６７８９'.ToCharArray() | ForEach-Object { [void]$set.Add([int]$_) }
$all = @($set)
$size = 350
$chunks = @()
for ($i = 0; $i -lt $all.Count; $i += $size) { $chunks += ,($all[$i..([Math]::Min($i + $size, $all.Count) - 1)]) }

$ua = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0 Safari/537.36'
$fonts = @(
  @{ fam = 'Shippori+Mincho:wght@800'; base = 'shippori-800'; css = 'ShipporiX'; weight = '800' },
  @{ fam = 'Noto+Sans+JP:wght@300;400'; base = 'noto-sans-jp'; css = 'NotoX'; weight = '100 900' }
)
Get-ChildItem (Join-Path $root 'fonts') -Filter '*.woff2' | Remove-Item -Force -Confirm:$false
$out = New-Object System.Text.StringBuilder
[void]$out.AppendLine('/* 画面で使う文字だけのサブセット（tools/subset-fonts.ps1 が書き出す。手で直さない） */')
foreach ($f in $fonts) {
  for ($k = 0; $k -lt $chunks.Count; $k++) {
    $text = -join ($chunks[$k] | ForEach-Object { [Char]::ConvertFromUtf32($_) })
    $u = "https://fonts.googleapis.com/css2?family=$($f.fam)&text=" + [Uri]::EscapeDataString($text)
    $css = (Invoke-WebRequest -UseBasicParsing -Uri $u -UserAgent $ua).Content
    $urls = @([regex]::Matches($css, 'url\((https://[^)]+)\)') | ForEach-Object { $_.Groups[1].Value } | Select-Object -Unique)
    if ($urls.Count -ne 1) { throw "chunk $k of $($f.base): expected 1 file, got $($urls.Count)" }
    $name = "$($f.base)-$k.woff2"
    Invoke-WebRequest -UseBasicParsing -Uri $urls[0] -UserAgent $ua -OutFile (Join-Path $root "fonts\$name")
    $range = ($chunks[$k] | ForEach-Object { 'U+{0:X}' -f $_ }) -join ','
    [void]$out.AppendLine("@font-face{font-family:`"$($f.css)`";src:url(`"../fonts/$name`") format(`"woff2`");font-weight:$($f.weight);font-display:block;unicode-range:$range}")
    "{0}  {1:N0} bytes" -f $name, (Get-Item (Join-Path $root "fonts\$name")).Length
  }
}
[IO.File]::WriteAllText((Join-Path $root 'css\fonts.css'), $out.ToString(), (New-Object System.Text.UTF8Encoding($false)))
"文字数: $($all.Count)  分割: $($chunks.Count)"
