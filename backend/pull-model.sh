#!/bin/bash
# Script to ensure the LLM model is pulled on the remote/local instance
# This can be run by the backend on startup or manually

OLLAMA_HOST="${OLLAMA_HOST:-ollama:11434}"
MODEL="qwen2.5:1.5b"

echo "Checking if $MODEL is present on $OLLAMA_HOST..."

# Check if model exists
if curl -s "http://$OLLAMA_HOST/api/tags" | grep -q "$MODEL"; then
  echo "Model $MODEL is already present."
else
  echo "Model $MODEL not found. Pulling..."
  # Use curl to trigger pull (async)
  curl -X POST "http://$OLLAMA_HOST/api/pull" -d "{\"name\": \"$MODEL\"}"
  echo "Pull request sent. It may take a few minutes."
fi
