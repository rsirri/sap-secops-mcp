import { z } from "zod";
import { sapGet } from "../sapClient.js";

const BASE = `/sap/opu/odata4/sap/zsb_secops_user/srvd_a2x/sap/zsd_secops_user/0001`;

export const getUserTool = {
  name: "get_sap_user",
  description:
    "Fetch SAP user master data: lock status, last logon date, password info, user type",
  schema: {
    username: z.string().min(1).max(12).describe("SAP username (BNAME)"),
  },
  handler: async ({ username }: { username: string }) => {
    try {
      const key = encodeURIComponent(username.toUpperCase());
      const data = await sapGet(`${BASE}/UserMaster('${key}')`);
      return {
        content: [{ type: "text" as const, text: JSON.stringify(data, null, 2) }],
      };
    } catch (err: any) {
      return {
        isError: true,
        content: [{ type: "text" as const, text: `Error: ${err.message}` }],
      };
    }
  },
};

export const listLockedUsersTool = {
  name: "list_locked_users",
  description: "List all currently locked SAP users, ordered by last logon (oldest first)",
  schema: {},
  handler: async () => {
    try {
      const data = await sapGet(
        `${BASE}/UserMaster?$filter=IsLocked eq true&$orderby=LastLogon asc&$top=100`
      );
      const users = data.value ?? [];
      const summary = users.length === 0
        ? "No locked users found."
        : `Found ${users.length} locked user(s):\n\n${JSON.stringify(users, null, 2)}`;
      return {
        content: [{ type: "text" as const, text: summary }],
      };
    } catch (err: any) {
      return {
        isError: true,
        content: [{ type: "text" as const, text: `Error: ${err.message}` }],
      };
    }
  },
};