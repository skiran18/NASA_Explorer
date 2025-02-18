import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import MarsRover from "./MarsRover";
import { fetchData } from "../../services/Api";

// Mock the API module
jest.mock("../../services/Api", () => ({
  fetchData: jest.fn(),
}));

describe("MarsRover Component", () => {
  beforeEach(() => {
    fetchData.mockClear();
    fetchData.mockResolvedValue({ photos: [] });
  });

  test("renders the form initially", () => {
    render(<MarsRover />);
    expect(screen.getByText("Get Your Mars Boarding Pass")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Enter Your Name")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Enter Your Location")).toBeInTheDocument();
    expect(screen.getByText("Launch 🚀")).toBeInTheDocument();
  });

  test("submits the form and displays loading state", async () => {
    render(<MarsRover />);

    fireEvent.change(screen.getByPlaceholderText("Enter Your Name"), { target: { value: "John Doe" } });
    fireEvent.change(screen.getByPlaceholderText("Enter Your Location"), { target: { value: "New York" } });

    fireEvent.click(screen.getByText("Launch 🚀"));

    expect(screen.getByText("Launching to Mars...")).toBeInTheDocument();
  });

  test("fetches and displays Mars photos after submission", async () => {
    const mockPhotos = [
      {
        id: 1,
        img_src: "https://example.com/mars1.jpg",
        camera: { full_name: "Front Hazard Avoidance Camera" },
        earth_date: "2025-06-10",
        rover: { name: "Curiosity" },
      },
    ];

    fetchData.mockResolvedValueOnce({ photos: mockPhotos });

    render(<MarsRover />);

    fireEvent.change(screen.getByPlaceholderText("Enter Your Name"), { target: { value: "John Doe" } });
    fireEvent.change(screen.getByPlaceholderText("Enter Your Location"), { target: { value: "New York" } });
    fireEvent.click(screen.getByText("Launch 🚀"));

    await waitFor(() => expect(fetchData).toHaveBeenCalledWith("mars"));

    await waitFor(() => expect(screen.getByText("📸 Mars Gallery")).toBeInTheDocument());
    expect(screen.getByText("Front Hazard Avoidance Camera")).toBeInTheDocument();
    expect(screen.getByText("2025-06-10")).toBeInTheDocument();
    expect(screen.getByText("Curiosity")).toBeInTheDocument();
  });

  test("handles camera filter selection", async () => {
    render(<MarsRover />);

    fireEvent.change(screen.getByPlaceholderText("Enter Your Name"), { target: { value: "John Doe" } });
    fireEvent.change(screen.getByPlaceholderText("Enter Your Location"), { target: { value: "New York" } });
    fireEvent.click(screen.getByText("Launch 🚀"));

    await waitFor(() => expect(screen.getByLabelText("Select Camera:")).toBeInTheDocument());

    fireEvent.change(screen.getByLabelText("Select Camera:"), { target: { value: "NAVCAM" } });
    expect(fetchData).toHaveBeenCalledWith("mars/NAVCAM");
  });

  test("opens and closes modal when clicking on an image", async () => {
    const mockPhotos = [
      {
        id: 1,
        img_src: "https://example.com/mars1.jpg",
        camera: { full_name: "Front Hazard Avoidance Camera" },
        earth_date: "2025-06-10",
        rover: { name: "Curiosity" },
      },
    ];

    fetchData.mockResolvedValueOnce({ photos: mockPhotos });

    render(<MarsRover />);

    fireEvent.change(screen.getByPlaceholderText("Enter Your Name"), { target: { value: "John Doe" } });
    fireEvent.change(screen.getByPlaceholderText("Enter Your Location"), { target: { value: "New York" } });
    fireEvent.click(screen.getByText("Launch 🚀"));

    await waitFor(() => expect(screen.getByText("📸 Mars Gallery")).toBeInTheDocument());

    fireEvent.click(screen.getByAltText("Mars Rover 1"));
    expect(screen.getByAltText("Mars Rover")).toBeInTheDocument();

    fireEvent.click(screen.getByText("×"));
    expect(screen.queryByAltText("Mars Rover")).not.toBeInTheDocument();
  });
});
