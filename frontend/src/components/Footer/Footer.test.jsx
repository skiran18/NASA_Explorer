import React from "react";
import { render, screen } from "@testing-library/react";
import Footer from "./Footer";
import "@testing-library/jest-dom";

describe("Footer Component", () => {
  test("renders the footer with correct text", () => {
    render(<Footer />);
    const footerText = screen.getByText(/© 2025 NASA Explorer/i);
    expect(footerText).toBeInTheDocument();
  });

  test("matches snapshot", () => {
    const { container } = render(<Footer />);
    expect(container.firstChild).toMatchSnapshot();
  });
});
