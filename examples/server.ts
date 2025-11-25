#!/usr/bin/env -S deno run --allow-env --allow-net --allow-run

/**
 * Casys MCP Gateway Server
 *
 * Launch this server to expose the sandbox as an MCP server.
 * Clients can connect and execute code via MCP protocol.
 *
 * Usage:
 *   deno run --allow-all examples/server.ts
 *
 * Environment:
 *   ANTHROPIC_API_KEY - Your Anthropic API key (optional, for Claude integration)
 *   PORT - Server port (default: 3000)
 */

import { MCPGatewayServer } from "jsr:@casys/mcp-gateway";

const port = parseInt(Deno.env.get("PORT") || "3000");
const apiKey = Deno.env.get("ANTHROPIC_API_KEY");

console.log("🚀 Starting Casys MCP Gateway Server...");
console.log(`   Port: ${port}`);
console.log(`   API Key: ${apiKey ? "✅ Configured" : "⚠️  Not set (optional)"}`);

const server = new MCPGatewayServer({
  port,
  sandbox: {
    timeout: 30000,      // 30s max execution
    memoryLimit: 256,    // 256MB max
  },
});

await server.start();

console.log(`\n✅ MCP Server running on http://localhost:${port}`);
console.log("\nAvailable tools:");
console.log("  - sandbox_execute: Execute TypeScript code safely");
console.log("  - dag_execute: Execute multi-step DAG workflows");
console.log("\nPress Ctrl+C to stop");
