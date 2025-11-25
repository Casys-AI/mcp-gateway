# Casys MCP Gateway - Interactive Playground

[![Open in GitHub Codespaces](https://github.com/codespaces/badge.svg)](https://codespaces.new/Casys-AI/mcp-gateway)

Interactive playground to explore the Casys MCP Gateway. Try it instantly in your browser - no installation required!

## Quick Start

1. **Click "Open in GitHub Codespaces" above**
2. Wait for environment setup (~30 seconds)
3. Open any notebook from `notebooks/`
4. Run cells individually or "Run All"

Each notebook is **100% independent** - start with any one!

## Notebooks

### Core Features

| Notebook | Description |
|----------|-------------|
| `sandbox-basics.ipynb` | Code execution, error handling, timeouts |
| `context-injection.ipynb` | Inject data and context into executions |
| `security-demo.ipynb` | Security boundaries, permissions, limits |

### Advanced Features

| Notebook | Description |
|----------|-------------|
| `dag-workflows.ipynb` | Multi-step DAG workflows with dependencies |
| `mcp-discovery.ipynb` | MCP server discovery and tool aggregation |
| `mcp-usage.ipynb` | LLM + MCP integration with tool calling |
| `llm-demo.ipynb` | Multi-LLM support (OpenAI, Anthropic, Google) |

## Multi-LLM Support

Use **any LLM provider** with your own API keys:

| Provider | Key Format | Model |
|----------|-----------|-------|
| OpenAI | `sk-...` | GPT-4 |
| Anthropic | `sk-ant-...` | Claude |
| Google | `AIza...` | Gemini |

```typescript
// Auto-detects provider from key format!
import { createLLM } from "./examples/llm-provider.ts";

const model = createLLM({ apiKey: Deno.env.get("OPENAI_API_KEY") });
```

## Examples

| File | Description |
|------|-------------|
| `examples/http-server.ts` | HTTP wrapper for sandbox (notebooks) |
| `examples/mcp-server.ts` | Full MCP server setup |
| `examples/llm-provider.ts` | Multi-LLM abstraction (AI SDK) |

## What You Can Do

- **Execute Code Safely** - Run untrusted code in isolated sandbox
- **Build DAG Workflows** - Multi-step pipelines with dependencies
- **Discover MCP Servers** - Auto-find and aggregate tools
- **Use Any LLM** - OpenAI, Anthropic, Google with one interface
- **Let LLMs Call Tools** - AI-driven code execution

## Installation (Local)

```bash
deno add jsr:@casys/mcp-gateway
```

```typescript
import {
  DenoSandboxExecutor,
  ParallelExecutor,
  AgentCardsGatewayServer,
  MCPServerDiscovery
} from "jsr:@casys/mcp-gateway";

// Sandbox
const sandbox = new DenoSandboxExecutor({ timeout: 5000 });
const result = await sandbox.execute("return 1 + 1");

// DAG Executor
const executor = new ParallelExecutor(toolExecutor);
await executor.execute(dag);
```

## Links

- [JSR Package](https://jsr.io/@casys/mcp-gateway) - API documentation
- [Source Code](https://github.com/Casys-AI/AgentCards) - Full implementation
- [Blog Series](https://www.linkedin.com/in/thibaulthulaux/) - Deep dives

## License

MIT - See [LICENSE](LICENSE)
