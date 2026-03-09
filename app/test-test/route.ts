import { readFileSync } from "fs"
import { join } from "path"
import { NextRequest, NextResponse } from "next/server"

const PASSWORD = "DME12345!!!"
const COOKIE = "tt_auth"

const loginPage = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Access Required</title>
  <style>
    *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
    body {
      background: #04141b;
      color: #fff;
      font-family: 'DM Sans', sans-serif;
      display: flex;
      align-items: center;
      justify-content: center;
      min-height: 100vh;
    }
    form {
      display: flex;
      flex-direction: column;
      gap: 16px;
      width: 320px;
    }
    label {
      font-size: 13px;
      letter-spacing: 0.08em;
      text-transform: uppercase;
      opacity: 0.5;
    }
    input {
      background: rgba(255,255,255,0.06);
      border: 1px solid rgba(255,255,255,0.15);
      border-radius: 6px;
      color: #fff;
      font-size: 16px;
      padding: 12px 16px;
      outline: none;
      width: 100%;
    }
    input:focus { border-color: rgba(255,255,255,0.4); }
    button {
      background: #D51C57;
      border: none;
      border-radius: 6px;
      color: #fff;
      cursor: pointer;
      font-size: 14px;
      font-weight: 600;
      letter-spacing: 0.05em;
      padding: 13px;
      text-transform: uppercase;
    }
    button:hover { opacity: 0.85; }
    .error { color: #D51C57; font-size: 13px; text-align: center; }
  </style>
</head>
<body>
  <form method="POST" action="/test-test">
    <label>Password</label>
    <input type="password" name="password" autofocus />
    <button type="submit">Enter</button>
    {{ERROR}}
  </form>
</body>
</html>`

export async function GET(req: NextRequest) {
  const auth = req.cookies.get(COOKIE)?.value
  if (auth !== PASSWORD) {
    return new NextResponse(loginPage.replace("{{ERROR}}", ""), {
      headers: { "Content-Type": "text/html" },
    })
  }

  const raw = readFileSync(join(process.cwd(), "public/test-test/index.html"), "utf-8")
  const html = raw.replace("<head>", '<head>\n  <base href="/test-test/">')
  return new NextResponse(html, {
    headers: { "Content-Type": "text/html" },
  })
}

export async function POST(req: NextRequest) {
  const body = await req.formData()
  const password = body.get("password")

  if (password !== PASSWORD) {
    const html = loginPage.replace("{{ERROR}}", '<p class="error">Incorrect password</p>')
    return new NextResponse(html, {
      status: 401,
      headers: { "Content-Type": "text/html" },
    })
  }

  const raw = readFileSync(join(process.cwd(), "public/test-test/index.html"), "utf-8")
  const html = raw.replace("<head>", '<head>\n  <base href="/test-test/">')
  const res = new NextResponse(html, { headers: { "Content-Type": "text/html" } })
  res.cookies.set(COOKIE, PASSWORD, { httpOnly: true, sameSite: "lax", path: "/test-test" })
  return res
}
