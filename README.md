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
- **`context-injection.ipynb`** *(coming soon)* - Inject context and data into code execution
- **`security-demo.ipynb`** *(coming soon)* - Security boundaries and resource limits

### Features Demonstrated

- ✅ **Isolated Execution** - Code runs in separate Deno subprocess
- ✅ **Error Handling** - Syntax and runtime errors captured gracefully
- ✅ **Timeout Protection** - Automatic termination of long-running code
- ✅ **Result Serialization** - Structured JSON output for AI agents
- ✅ **Memory Limits** - Resource exhaustion prevention

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
