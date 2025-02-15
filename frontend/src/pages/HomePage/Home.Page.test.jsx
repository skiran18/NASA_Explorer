import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import HomePage from './HomePage';
import { fetchData } from '../../services/Api';

// Mock the API module
jest.mock('../../services/Api');

describe('HomePage Component', () => {
  const mockData = {
    title: 'Test Title',
    explanation: 'Test Explanation',
    url: 'https://example.com/image.jpg',
    media_type: 'image'
  };

  beforeEach(() => {
    // Clear all mocks before each test
    jest.clearAllMocks();
  });

  test('renders data when API call is successful', async () => {
    // Mock the API response
    fetchData.mockResolvedValueOnce(mockData);

    render(<HomePage />);

    // Wait for the data to be loaded
    await waitFor(() => {
      expect(screen.getByText(mockData.title)).toBeInTheDocument();
      expect(screen.getByText(mockData.explanation)).toBeInTheDocument();
      expect(screen.getByAltText(mockData.title)).toBeInTheDocument();
    });
  });

  test('renders video iframe when media_type is video', async () => {
    const videoMockData = {
      ...mockData,
      media_type: 'video',
      url: 'https://example.com/video.mp4'
    };

    fetchData.mockResolvedValueOnce(videoMockData);

    render(<HomePage />);

    await waitFor(() => {
      const iframe = screen.getByTitle(videoMockData.title);
      expect(iframe).toBeInTheDocument();
      expect(iframe.tagName).toBe('IFRAME');
      expect(iframe).toHaveAttribute('src', videoMockData.url);
    });
  });

  test('handles API error gracefully', async () => {
    // Mock console.error to prevent error output in tests
    const consoleSpy = jest.spyOn(console, 'error').mockImplementation(() => {});
    
    // Mock the API to throw an error
    fetchData.mockRejectedValueOnce(new Error('API Error'));

    render(<HomePage />);

    // Wait for the error to be logged
    await waitFor(() => {
      expect(consoleSpy).toHaveBeenCalled();
    });

    // Verify that no data is rendered
    expect(screen.queryByText(mockData.title)).not.toBeInTheDocument();

    // Clean up
    consoleSpy.mockRestore();
  });
});