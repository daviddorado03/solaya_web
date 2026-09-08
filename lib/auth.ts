// Signed-cookie session for a single shared admin password.
// Uses Web Crypto (crypto.subtle) instead of Node's `crypto` module so the
// exact same code runs in middleware (Edge runtime) and in server actions.

const encoder = new TextEncoder();
const SESSION_DURATION_MS = 1000 * 60 * 60 * 24 * 7; // 7 days

export const SESSION_COOKIE_NAME = "solaya_admin_session";

function toHex(buffer: ArrayBuffer): string {
  return Array.from(new Uint8Array(buffer))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
}

async function hmac(secret: string, message: string): Promise<string> {
  const key = await crypto.subtle.importKey(
    "raw",
    encoder.encode(secret),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"]
  );
  const signature = await crypto.subtle.sign("HMAC", key, encoder.encode(message));
  return toHex(signature);
}

function getSessionSecret(): string {
  const secret = process.env.ADMIN_SESSION_SECRET;
  if (!secret) {
    throw new Error(
      "Falta ADMIN_SESSION_SECRET en las variables de entorno (cualquier cadena larga y aleatoria sirve)."
    );
  }
  return secret;
}

export async function createSessionToken(): Promise<string> {
  const expires = Date.now() + SESSION_DURATION_MS;
  const signature = await hmac(getSessionSecret(), String(expires));
  return `${expires}.${signature}`;
}

export async function verifySessionToken(token: string | undefined): Promise<boolean> {
  if (!token) return false;
  const [expiresStr, signature] = token.split(".");
  if (!expiresStr || !signature) return false;

  const expires = Number(expiresStr);
  if (!Number.isFinite(expires) || Date.now() > expires) return false;

  const expected = await hmac(getSessionSecret(), expiresStr);
  return expected === signature;
}

export function checkPassword(input: string): boolean {
  const expected = process.env.ADMIN_PASSWORD;
  if (!expected) {
    throw new Error("Falta ADMIN_PASSWORD en las variables de entorno.");
  }
  return input === expected;
}
