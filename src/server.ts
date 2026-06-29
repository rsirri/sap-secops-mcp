import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { getUserTool, listLockedUsersTool, getUserRolesTool } from "./tools/usermaster.js";

const server = new McpServer({
  name: "sap-secops",
  version: "1.0.0",
  description: "SAP Security Operations — user audit, lock analysis, access review",
});

server.tool(getUserTool.name, getUserTool.description, getUserTool.schema, getUserTool.handler);
server.tool(listLockedUsersTool.name, listLockedUsersTool.description, listLockedUsersTool.schema, listLockedUsersTool.handler);
server.tool(getUserRolesTool.name, getUserRolesTool.description, getUserRolesTool.schema, getUserRolesTool.handler);

console.error("[sap-secops-mcp] Server starting...");
const transport = new StdioServerTransport();
await server.connect(transport);
console.error("[sap-secops-mcp] Ready.");