import Anthropic from "@anthropic-ai/sdk";
import { z } from "zod";
import { sleep } from "@/utils/helpers";

const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY ?? "missing-key"
});

export const claudeModel = "claude-sonnet-4-20250514";

export async function callClaudeJson<T>({
  system,
  prompt,
  schema,
  maxTokens = 1600
}: {
  system: string;
  prompt: string;
  schema: z.ZodType<T>;
  maxTokens?: number;
}) {
  let lastError: Error | null = null;

  for (let attempt = 0; attempt < 3; attempt += 1) {
    try {
      const message = await anthropic.messages.create({
        model: claudeModel,
        max_tokens: maxTokens,
        temperature: 0.2,
        system,
        messages: [{ role: "user", content: prompt }]
      });
      const block = message.content.find((item) => item.type === "text");
      if (!block || block.type !== "text") throw new Error("Claude returned no text response");
      const json = JSON.parse(block.text) as T;
      return schema.parse(json);
    } catch (error) {
      lastError = error instanceof Error ? error : new Error("Unknown Claude error");
      await sleep(400 * 2 ** attempt);
    }
  }

  throw lastError ?? new Error("Claude request failed");
}
