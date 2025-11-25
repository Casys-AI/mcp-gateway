FROM denoland/deno:latest

# Install system dependencies for Graphviz (DAG visualization)
RUN apt-get update && apt-get install -y \
    graphviz \
    && rm -rf /var/lib/apt/lists/*

# Install Jupyter kernel for Deno
RUN deno jupyter --install --unstable

# Pre-cache JSR package (optional but speeds up first execution)
RUN deno eval "import { DenoSandboxExecutor } from 'jsr:@casys/mcp-gateway@0.1.0'" || true

# Set working directory
WORKDIR /workspace

# Keep container running
CMD ["sleep", "infinity"]
