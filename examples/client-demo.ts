#!/usr/bin/env -S deno run --allow-net --allow-env

/**
 * MCP Client Demo
 *
 * Demonstrates how to connect to the MCP Gateway and execute code.
 *
 * Usage:
 *   deno run --allow-net --allow-env examples/client-demo.ts
 */

const SERVER_URL = Deno.env.get("MCP_SERVER_URL") || "http://localhost:3000";

console.log("🔌 Connecting to MCP Gateway:", SERVER_URL);

// Example 1: Simple execution
console.log("\n📝 Example 1: Simple calculation");
const response1 = await fetch(`${SERVER_URL}/execute`, {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({
    tool: "sandbox_execute",
    params: {
      code: "return Math.sqrt(144) + Math.pow(2, 10)",
    },
  }),
});

const result1 = await response1.json();
console.log("Result:", result1);

// Example 2: Data processing
console.log("\n📊 Example 2: Data processing");
const response2 = await fetch(`${SERVER_URL}/execute`, {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({
    tool: "sandbox_execute",
    params: {
      code: `
        const data = context.numbers;
        return {
          sum: data.reduce((a, b) => a + b, 0),
          avg: data.reduce((a, b) => a + b, 0) / data.length,
          max: Math.max(...data),
        };
      `,
      context: {
        numbers: [10, 25, 30, 15, 40, 5],
      },
    },
  }),
});

const result2 = await response2.json();
console.log("Result:", result2);

// Example 3: DAG workflow
console.log("\n🔄 Example 3: DAG workflow");
const response3 = await fetch(`${SERVER_URL}/execute`, {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({
    tool: "dag_execute",
    params: {
      workflow: {
        tasks: {
          fetch: {
            tool: "sandbox_execute",
            params: { code: "return { data: [1,2,3,4,5] }" },
            dependencies: [],
          },
          process: {
            tool: "sandbox_execute",
            params: { code: "return context.data.map(x => x * 2)" },
            dependencies: ["fetch"],
          },
        },
      },
    },
  }),
});

const result3 = await response3.json();
console.log("Result:", result3);

console.log("\n✅ Demo completed!");
