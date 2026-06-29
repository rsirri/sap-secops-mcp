import { SAP_CONFIG } from "./config.js";

export interface SapError {
  status: number;
  message: string;
}

export async function sapGet(path: string): Promise<any> {
  const url = `${SAP_CONFIG.host}${path}`;

  console.error(`[SAP GET] ${url}`); // debug to stderr only

  const res = await fetch(url, {
    headers: {
      Authorization: SAP_CONFIG.authHeader(),
      Accept: "application/json",
      "sap-client": SAP_CONFIG.client,
    },
  });

  if (!res.ok) {
    const body = await res.text();
    throw new Error(`SAP ${res.status} on ${path}: ${body}`);
  }

  return res.json();
}