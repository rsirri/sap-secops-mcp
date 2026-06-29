function require_env(key: string): string {
  const val = process.env[key];
  if (!val) {
    process.stderr.write(`[WARN] Missing env var: ${key}\n`);
    return `MISSING_${key}`;
  }
  return val;
}

export const SAP_CONFIG = {
  host: require_env("SAP_HOST"),
  client: process.env.SAP_CLIENT ?? "100",
  user: require_env("SAP_USER"),
  pass: require_env("SAP_PASS"),
  authHeader(): string {
    return "Basic " + Buffer.from(`${this.user}:${this.pass}`).toString("base64");
  },
};