#!/usr/bin/env -S deno run --allow-all

/**
 * HTTP Wrapper for AgentCards MCP Gateway
 *
 * Exposes MCP tools via HTTP REST API for easy access from notebooks.
 *
 * Usage:
 *   deno run --allow-all examples/http-server.ts
 *
 * API Endpoints:
 *   POST /tools/list - List available tools
 *   POST /tools/call - Execute a tool
 *   GET  /health     - Health check
 */

import { DenoSandboxExecutor } from "jsr:@casys/mcp-gateway";

const PORT = parseInt(Deno.env.get("PORT") || "3000");

// Initialize sandbox
const sandbox = new DenoSandboxExecutor({
  timeout: parseInt(Deno.env.get("SANDBOX_TIMEOUT_MS") || "30000"),
  memoryLimit: parseInt(Deno.env.get("SANDBOX_MEMORY_LIMIT_MB") || "256"),
});

/**
 * Available tools (simplified for demo)
 */
const tools = [
  {
    name: "execute_code",
    description: "Execute TypeScript/JavaScript code safely in Deno sandbox",
    inputSchema: {
      type: "object",
      properties: {
        code: {
          type: "string",
          description: "TypeScript/JavaScript code to execute"
        },
        context: {
          type: "object",
          description: "Optional context data available to the code"
        }
      },
      required: ["code"]
    }
  }
];

/**
 * Execute code tool
 */
async function executeCode(params: { code: string; context?: unknown }) {
  const result = await sandbox.execute(params.code, params.context);
  return result;
}

/**
 * HTTP Request Handler
 */
async function handler(req: Request): Promise<Response> {
  const url = new URL(req.url);

  // CORS headers
  const headers = {
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type",
  };

  // Handle CORS preflight
  if (req.method === "OPTIONS") {
    return new Response(null, { headers });
  }

  // Health check
  if (url.pathname === "/health") {
    return Response.json({ status: "ok", tools: tools.length }, { headers });
  }

  // List tools
  if (url.pathname === "/tools/list" && req.method === "POST") {
    return Response.json({ tools }, { headers });
  }

  // Call tool
  if (url.pathname === "/tools/call" && req.method === "POST") {
    try {
      const body = await req.json();
      const { tool, params } = body;

      if (tool === "execute_code") {
        const result = await executeCode(params);
        return Response.json({ result }, { headers });
      }

      return Response.json(
        { error: `Unknown tool: ${tool}` },
        { status: 404, headers }
      );
    } catch (error) {
      return Response.json(
        { error: error.message },
        { status: 500, headers }
      );
    }
  }

  return Response.json(
    { error: "Not found" },
    { status: 404, headers }
  );
}

// Start server
console.log(`🚀 HTTP MCP Server starting...`);
console.log(`   Port: ${PORT}`);
console.log(`   Sandbox timeout: ${sandbox.timeout}ms`);
console.log(`   Memory limit: ${sandbox.memoryLimit}MB`);
console.log();
console.log(`Available endpoints:`);
console.log(`   GET  http://localhost:${PORT}/health`);
console.log(`   POST http://localhost:${PORT}/tools/list`);
console.log(`   POST http://localhost:${PORT}/tools/call`);
console.log();
console.log(`✅ Server ready!`);

Deno.serve({ port: PORT }, handler);
