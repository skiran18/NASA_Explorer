import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import MarsRover from "./MarsRover";
import { fetchData } from "../../services/Api";
import "@testing-library/jest-dom";
import { TextEncoder, TextDecoder } from "util";

global.TextEncoder = TextEncoder;
global.TextDecoder = TextDecoder;

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
  photos: [
    {
      id: "123",
      img_src: "test.jpg",
      camera: { full_name: "Front Hazard Avoidance Camera" },
      earth_date: "2025-02-15",
      rover: { name: "Curiosity" },
    },
  ],
};

describe("MarsRover Component", () => {
  beforeEach(() => {
    fetchData.mockResolvedValue(mockData); // Mock API success response
  });

  test("MarsRover Component matches snapshot", async () => {
    const { container } = render(<MarsRover />);
    await waitFor(() => expect(screen.getByText("Select Camera:")).toBeInTheDocument());
    expect(container.firstChild).toMatchSnapshot();
  });

  test("renders the component with correct heading", async () => {
    render(<MarsRover />);
    const headingElement = await screen.findByText("Select Camera:");
    expect(headingElement).toBeInTheDocument();
  });

  test("displays Mars Rover photos correctly", async () => {
    render(<MarsRover />);
    await waitFor(() => expect(screen.getByAltText("Mars Rover 123")).toBeInTheDocument());
  });

  test("renders no photos message when API returns empty array", async () => {
    fetchData.mockResolvedValue({ photos: [] }); // Mock empty response
    render(<MarsRover />);
    await waitFor(() => expect(screen.getByText("No photos available for this camera.")).toBeInTheDocument());
  });
});