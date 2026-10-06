import { describe, it, expect } from "vitest";
import { selectNewMessages } from "../services/sessionSync.js";
import type { SessionMessage } from "../services/sessionManager.js";

function msg(id: string): SessionMessage {
  return { id, role: "assistant", text: id };
}

describe("sessionSync.selectNewMessages", () => {
  const messages = [msg("m1"), msg("m2"), msg("m3")];

  it("returns everything when there is no cursor", () => {
    expect(selectNewMessages(messages, undefined)).toEqual(messages);
  });

  it("returns only messages after the cursor", () => {
    expect(selectNewMessages(messages, "m2")).toEqual([msg("m3")]);
  });

  it("returns nothing when the cursor is the last message", () => {
    expect(selectNewMessages(messages, "m3")).toEqual([]);
  });

  it("falls back to everything when the cursor is unknown", () => {
    expect(selectNewMessages(messages, "missing")).toEqual(messages);
  });

  it("handles an empty session", () => {
    expect(selectNewMessages([], "m1")).toEqual([]);
  });
});
