import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import AsteroidTracker from "./AsteroidTracker";
import { fetchData } from "../../services/Api";
import "@testing-library/jest-dom";

// Mock fetchData to return test data
jest.mock("../../services/Api", () => ({
  fetchData: jest.fn(),
}));

beforeAll(() => {
    global.ResizeObserver = class {
      observe() {}
      unobserve() {}
      disconnect() {}
    };
  });

const mockData = {
  near_earth_objects: {
    "2025-02-15": [
      {
        id: "12345",
        name: "Asteroid XYZ",
        is_potentially_hazardous_asteroid: true,
        absolute_magnitude_h: 21.5,
        close_approach_data: [
          {
            miss_distance: { kilometers: "500000" },
            relative_velocity: { kilometers_per_hour: "25000" },
          },
        ],
      },
    ],
  },
};

describe("AsteroidTracker Component", () => {
  beforeEach(() => {
    fetchData.mockResolvedValue(mockData); // Mock API success response
  });

  jest.mock("../../services/Api", () => ({
    fetchData: jest.fn(() =>
      Promise.resolve({
        near_earth_objects: {
          "2025-02-15": [
            {
              id: "12345",
              name: "Asteroid XYZ",
              absolute_magnitude_h: 21.5,
              is_potentially_hazardous_asteroid: true,
              close_approach_data: [
                {
                  miss_distance: { kilometers: "500000" },
                  relative_velocity: { kilometers_per_hour: "25000" },
                },
              ],
            },
          ],
        },
      })
    ),
  }));
  
  test("AsteroidTracker Component matches snapshot", async () => {
    const { container } = render(<AsteroidTracker />);
    await waitFor(() => expect(screen.getByText("Near Earth Objects Today")).toBeInTheDocument());
    expect(container.firstChild).toMatchSnapshot();
  });

  test("renders the component with correct heading", async () => {
    render(<AsteroidTracker />);
    const headingElement = await screen.findByRole("heading", {
      name: /near earth objects/i,
    });

    expect(headingElement).toBeInTheDocument();
  });

test("AsteroidTracker Component matches snapshot", async () => {
    const { container } = render(<AsteroidTracker />);
  
    // ✅ Fix: Specifically wait for the <h2> heading
    await waitFor(() =>
      expect(screen.getByRole("heading", { level: 2 })).toBeInTheDocument()
    );
  
    // ✅ Fix: Handle multiple headings correctly
    const headings = screen.getAllByRole("heading");
    expect(headings.length).toBeGreaterThan(1); // Ensure multiple headings exist
  
    // Check for correct CSS class
    expect(container.firstChild).toHaveClass("neo-container");
  });

  test("matches snapshot", async () => {
    const { container } = render(<AsteroidTracker />);
  
    // Wait for the heading to appear (ensuring data has loaded)
    await waitFor(() =>
      expect(screen.getByRole("heading", { name: /near earth objects/i })).toBeInTheDocument()
    );
  
    // Now check the snapshot after the component has fully rendered
    expect(container.firstChild).toMatchSnapshot();
  });
});
