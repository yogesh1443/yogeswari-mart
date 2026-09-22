# YOGESWARI MART — Login Module

A Java desktop application login module with a modern HTML/CSS/JS front end.
No JavaFX, no React/Angular/Vue, no external UI frameworks, no database.

## Requirements
- JDK 11 or newer (uses `com.sun.net.httpserver`, built into the JDK)

## Folder Structure
```
YogeswariMart/
├── src/com/yogeswarimart/
│   ├── Main.java
│   ├── ui/LoginFrame.java
│   ├── ui/LoginServer.java
│   ├── service/LoginService.java
│   ├── model/User.java
│   └── util/AppConstants.java
├── web/
│   ├── login.html
│   ├── css/login.css
│   └── js/login.js
└── README.md
```

## How to Run

1. Open a terminal **in the `YogeswariMart` folder** (the `web` folder must be
   next to where you run the app from — the server reads it as a relative path).

2. Compile:
   ```
   javac -d out $(find src -name "*.java")
   ```
   (Windows PowerShell: `javac -d out (Get-ChildItem -Recurse -Filter *.java src).FullName`)

3. Run:
   ```
   java -cp out com.yogeswarimart.Main
   ```

4. Your default browser opens automatically to:
   ```
   http://localhost:8080/login.html
   ```
   If it doesn't open automatically, open that URL manually.

## Demo Credentials
```
Username: admin
Password: admin123
```

## How Java Talks to the HTML/CSS/JS UI
`LoginFrame` starts `LoginServer`, a tiny HTTP server built entirely from the
JDK's own `com.sun.net.httpserver` package (no dependency to install). It:
- Serves `login.html`, `login.css`, and `login.js` as static files.
- Exposes `POST /api/login`. When you click LOGIN, `login.js` sends the
  username/password there with `fetch()`. The server parses it, builds a
  `User`, calls `LoginService.authenticate()`, and returns a small JSON
  result that the JavaScript displays inline.

`LoginFrame` then opens your system's default browser pointed at the local
server — this is the "window" of the desktop app.

## Future Database Integration
Only one method needs to change later: `LoginService.authenticate()` in
`service/LoginService.java`. Swap the hardcoded comparison for a repository/DB
lookup — `LoginServer`, `login.html`, and `login.js` don't need to change at all.

## Notes
- Only the Login Module is implemented, as scoped — no other pages exist.
- Port `8080` is used by default; change `AppConstants.SERVER_PORT` if it's busy.
