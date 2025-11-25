# Casys MCP Gateway - Sandbox Playground

[![Open in GitHub Codespaces](https://github.com/codespaces/badge.svg)](https://codespaces.new/Casys-AI/mcp-gateway)

Secure code execution sandbox for AI agents. Try it instantly in your browser with zero installation.

## Quick Start

1. **Click "Open in GitHub Codespaces" above** ☝️
2. Wait ~30 seconds for environment setup
3. Open `notebooks/sandbox-basics.ipynb`
4. Click "Run All" or execute cells individually

## What's Inside

### Notebooks

- **`sandbox-basics.ipynb`** - Core sandbox features: execution, error handling, timeouts
- **`context-injection.ipynb`** - Inject context and data into code execution
- **`security-demo.ipynb`** - Security boundaries and resource limits
- **`mcp-usage.ipynb`** - MCP integration with DAG workflow visualization 📊
- **`llm-demo.ipynb`** - Multi-LLM integration (OpenAI, Anthropic, Google) 🤖

### MCP Server Examples

- **`examples/server.ts`** - Launch the gateway as an MCP server
- **`examples/client-demo.ts`** - Connect and execute code via MCP protocol
- **`examples/llm-provider.ts`** - Multi-LLM provider abstraction (AI SDK)
- **`.env.example`** - Configuration template (API keys, limits)

### Features Demonstrated

- ✅ **Isolated Execution** - Code runs in separate Deno subprocess
- ✅ **Error Handling** - Syntax and runtime errors captured gracefully
- ✅ **Timeout Protection** - Automatic termination of long-running code
- ✅ **Result Serialization** - Structured JSON output for AI agents
- ✅ **Memory Limits** - Resource exhaustion prevention
- ✅ **DAG Workflows** - Multi-step execution with dependency management
- ✅ **Graph Visualization** - Visual DAG representation with Graphviz

## Multi-LLM Support 🤖

Use **any LLM provider** with your own API keys! The system auto-detects the provider from your key format:

- **OpenAI GPT** - Keys starting with `sk-`
- **Anthropic Claude** - Keys starting with `sk-ant-`
- **Google Gemini** - Keys starting with `AIza`

```bash
# Set your API key (choose one)
export ANTHROPIC_API_KEY="sk-ant-api03-..."
export OPENAI_API_KEY="sk-..."
export GOOGLE_API_KEY="AIza..."

# Test the provider
deno run --allow-env --allow-net examples/llm-provider.ts
```

See `notebooks/llm-demo.ipynb` for interactive examples!

## Running the MCP Server

Launch the gateway as an MCP server for your AI agents:

```bash
# Copy environment template
cp .env.example .env

# Edit .env and add your API key (any provider)
# ANTHROPIC_API_KEY=sk-ant-api03-...
# OPENAI_API_KEY=sk-...
# GOOGLE_API_KEY=AIza...

# Start the MCP server
deno run --allow-all examples/server.ts
```

Test with the client demo:

```bash
deno run --allow-net --allow-env examples/client-demo.ts
```

## Local Installation

Install the package from JSR:

```bash
deno add jsr:@casys/mcp-gateway
```

**Example usage:**

```typescript
import { DenoSandboxExecutor } from "jsr:@casys/mcp-gateway";

const sandbox = new DenoSandboxExecutor({
  timeout: 5000,      // 5s max
  memoryLimit: 128,   // 128MB max
});

const result = await sandbox.execute("return 1 + 1");
console.log(result); // { success: true, result: 2, executionTimeMs: 45 }
```

## Links

- **📦 [JSR Package](https://jsr.io/@casys/mcp-gateway)** - Documentation and API reference
- **💻 [Source Code](https://github.com/Casys-AI/AgentCards)** - Full implementation with DAG workflow executor
- **📝 [Blog Series](https://www.linkedin.com/in/thibaulthulaux/)** - Deep dive into adaptive AI agents

## Why This Exists

This sandbox enables AI agents to execute code securely as part of Model Context Protocol (MCP) workflows. It's designed for:

- **Tool execution** in AI agent workflows
- **Dynamic data transformation** based on context
- **Safe evaluation** of untrusted code
- **Adaptive workflow execution** with feedback loops

Built with [Deno](https://deno.com) for security-first JavaScript/TypeScript runtime.

## License

MIT - See [LICENSE](LICENSE) file
