# Простой локальный сервер: powershell -NoProfile -ExecutionPolicy Bypass -File serve.ps1  ->  http://localhost:8080
$root = $PSScriptRoot
$port = if ($env:PORT) { $env:PORT } else { '8080' }
$l = New-Object System.Net.HttpListener
$l.Prefixes.Add("http://localhost:$port/")
$l.Start()
$types = @{ '.html' = 'text/html; charset=utf-8'; '.js' = 'text/javascript; charset=utf-8'; '.css' = 'text/css; charset=utf-8' }
while ($l.IsListening) {
  $c = $l.GetContext()
  try {
    $p = $c.Request.Url.LocalPath
    if ($p -eq '/') { $p = '/index.html' }
    $f = Join-Path $root ($p.TrimStart('/'))
    if ((Test-Path $f -PathType Leaf) -and ($f.StartsWith($root))) {
      $b = [IO.File]::ReadAllBytes($f)
      $c.Response.ContentType = $types[[IO.Path]::GetExtension($f)]
      $c.Response.OutputStream.Write($b, 0, $b.Length)
    } else { $c.Response.StatusCode = 404 }
  } catch {}
  $c.Response.Close()
}
