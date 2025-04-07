import { App } from "@/App";
import { Wrappers } from "@/Wrappers";
import { cleanup, render, screen } from "@testing-library/react";
import { beforeEach } from "node:test";
import { MemoryRouter, Route, Routes } from "react-router";
import { afterEach, describe, it, expect, vi } from "vitest";

describe("Card test:", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });
  afterEach(cleanup);

  it("should render component", async () => {
    render(
      <MemoryRouter initialEntries={["/"]}>
        <Wrappers>
          <Routes>
            <Route path="/" element={<App />} />
          </Routes>
        </Wrappers>
      </MemoryRouter>
    );

    expect(screen.getByText("Welcome to Bifrost"));
    expect(
      screen.getByText("Click in the assets to check their price performance")
    );

    const buttons = screen.getAllByRole("button");

    expect(buttons.length).toBe(5);
  });
});
