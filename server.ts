import "dotenv/config";
import express from "express";
import path from "path";
import crypto from "crypto";
import { createServer as createViteServer } from "vite";

const ADMIN_SESSION_COOKIE = "blinkit_admin_session";
const adminSessions = new Map<string, number>();
const sessionLifetimeMs = 1000 * 60 * 60 * 8;

function getCookie(request: express.Request, name: string): string | undefined {
  const cookies = request.headers.cookie?.split(";") ?? [];
  return cookies
    .map((cookie) => cookie.trim().split("="))
    .find(([key]) => key === name)?.[1];
}

function hasAdminSession(request: express.Request): boolean {
  const token = getCookie(request, ADMIN_SESSION_COOKIE);
  if (!token) return false;
  const expiresAt = adminSessions.get(token);
  if (!expiresAt || expiresAt < Date.now()) {
    adminSessions.delete(token);
    return false;
  }
  return true;
}

async function startServer() {
  const app = express();
  const PORT = 3000;

  // API routes FIRST
  app.get("/api/health", (_req, res) => {
    res.json({ status: "ok" });
  });

  app.use(express.json());

  app.get("/api/admin/session", (req, res) => {
    res.json({ authenticated: hasAdminSession(req) });
  });

  app.post("/api/admin/login", (req, res) => {
    const configuredUsername = process.env.ADMIN_USERNAME;
    const configuredPassword = process.env.ADMIN_PASSWORD;
    if (!configuredUsername || !configuredPassword) {
      res.status(503).json({ error: "Admin access is not configured on this server." });
      return;
    }

    const { username, password } = req.body as { username?: string; password?: string };
    if (username !== configuredUsername || password !== configuredPassword) {
      res.status(401).json({ error: "Invalid administrator credentials." });
      return;
    }

    const token = crypto.randomBytes(32).toString("hex");
    adminSessions.set(token, Date.now() + sessionLifetimeMs);
    res.cookie(ADMIN_SESSION_COOKIE, token, {
      httpOnly: true,
      sameSite: "strict",
      secure: process.env.NODE_ENV === "production",
      maxAge: sessionLifetimeMs,
      path: "/"
    });
    res.json({ authenticated: true });
  });

  // Serve static public assets directly
  app.use(express.static(path.join(process.cwd(), "public")));

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (_req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
