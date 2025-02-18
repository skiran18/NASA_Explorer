import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import AsteroidTracker from "./AsteroidTracker";
import { fetchData } from "../../services/Api";
import "@testing-library/jest-dom";

jest.mock("../../services/Api", () => ({
  fetchData: jest.fn(),
}));

jest.mock("lucide-react", () => ({
    AlertTriangle: () => <svg data-testid="alert-triangle" />,
  }));
  

beforeAll(() => {
  global.ResizeObserver = class {
    observe() {}
    unobserve() {}
    disconnect() {}
  };
});

// Get today's date dynamically
const todayDate = new Date().toISOString().split("T")[0];

const mockData = {
  near_earth_objects: {
    [todayDate]: [
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
    fetchData.mockResolvedValue(mockData);
  });

  test("renders the component with correct heading", async () => {
    render(<AsteroidTracker />);
    
    await waitFor(() => {
      expect(
        screen.getByRole("heading", { name: /near earth objects/i })
      ).toBeInTheDocument();
    });
  });

  test("displays the correct number of asteroids", async () => {
    render(<AsteroidTracker />);

    await waitFor(() => {
      expect(screen.getAllByRole("heading", { level: 3 })).toHaveLength(1);
    });
  });

  test("renders the bar chart correctly", async () => {
    render(<AsteroidTracker />);

    await waitFor(() => {
      expect(screen.getByText("Near Earth Objects Today")).toBeInTheDocument();
    });

    const chartElement = screen.getByText("Near Earth Objects Today");
    expect(chartElement).toBeInTheDocument();
  });

//   test("matches snapshot", async () => {
//     const { container } = render(<AsteroidTracker />);

//     await waitFor(() =>
//       expect(screen.getByRole("heading", { name: /near earth objects/i }))
//     );

//     expect(container.firstChild).toMatchSnapshot();
//   });
});
