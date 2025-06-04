import { render, screen, fireEvent } from '@testing-library/react'
import React from 'react'
import { vi } from 'vitest'

vi.mock('react-chartjs-2', () => ({
  Line: () => <canvas role="img" />,
}))
import App from '../App'
import { describe, it, expect } from 'vitest'

describe('App', () => {
  it('toggles device state', () => {
    render(<App />)
    // first device is Solar Panels and is initially on
    const statusParagraph = screen.getAllByText(/Status:/)[0]
    expect(statusParagraph).toHaveTextContent('On')
    const button = screen.getAllByRole('button')[0]
    fireEvent.click(button)
    expect(statusParagraph).toHaveTextContent('Off')
  })

  it('renders devices within a grid layout', () => {
    render(<App />)
    const gridItems = document.querySelectorAll('.react-grid-item')
    expect(gridItems.length).toBeGreaterThan(0)
  })

  it('renders solar production chart', () => {
    render(<App />)
    expect(
      screen.getAllByRole('heading', { name: /Solar Production for Today/i })
        .length
    ).toBeGreaterThan(0)
    expect(screen.getAllByTestId('solar-chart')[0].querySelector('canvas')).toBeTruthy()
  })
})
