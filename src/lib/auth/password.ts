import { randomBytes, scrypt as scryptCallback, timingSafeEqual } from "node:crypto";

const N = 32768;
const r = 8;
const p = 1;
const KEY_LENGTH = 64;
const MAXMEM = 64 * 1024 * 1024;

function deriveKey(password: string, salt: Buffer) {
  return new Promise<Buffer>((resolve, reject) => {
    scryptCallback(password, salt, KEY_LENGTH, { N, r, p, maxmem: MAXMEM }, (error, derivedKey) => {
      if (error) reject(error);
      else resolve(derivedKey);
    });
  });
}

// Built-in Node scrypt avoids a native package install. Re-evaluate Argon2id before production.
export async function hashPassword(password: string): Promise<string> {
  const salt = randomBytes(16);
  const derived = await deriveKey(password, salt);
  return `scrypt$${N}$${r}$${p}$${salt.toString("base64url")}$${derived.toString("base64url")}`;
}

export async function verifyPassword(password: string, stored: string): Promise<boolean> {
  const [algorithm, n, blockSize, parallelism, saltText, keyText, extra] = stored.split("$");
  if (algorithm !== "scrypt" || n !== String(N) || blockSize !== String(r) || parallelism !== String(p) || !saltText || !keyText || extra) return false;
  try {
    const expected = Buffer.from(keyText, "base64url");
    const actual = await deriveKey(password, Buffer.from(saltText, "base64url"));
    return expected.length === actual.length && timingSafeEqual(expected, actual);
  } catch {
    return false;
  }
}

export function validatePassword(password: string): string | null {
  if (password.length < 12) return "كلمة المرور يجب ألا تقل عن 12 حرفًا.";
  if (password.length > 128) return "كلمة المرور طويلة جدًا.";
  if (!/[a-z]/.test(password) || !/[A-Z]/.test(password) || !/[0-9]/.test(password)) return "استخدم حرفًا صغيرًا وحرفًا كبيرًا ورقمًا على الأقل.";
  return null;
}
