import { describe, expect, it } from "vitest";
import { formatRupee, sessionTypeLabel } from "@/utils/formatters";

describe("formatters", () => {
  it("formats rupees in Indian format", () => {
    expect(formatRupee(1200)).toBe("₹1,200");
  });

  it("labels session types", () => {
    expect(sessionTypeLabel("home")).toBe("Home Visit");
  });
});
