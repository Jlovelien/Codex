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

  it('reorders devices via drag and drop', () => {
    render(<App />)
    const headings = () =>
      screen
        .getAllByRole('heading', { level: 2 })
        .map(h => h.textContent)
        .filter(t => t !== 'Solar Production for Today')
    expect(headings().slice(0, 3)).toEqual([
      'Solar Panels',
      'Smart Lights',
      'Google Home',
    ])

    const wrappers = screen
      .getAllByRole('heading', { level: 2 })
      .filter(h => h.textContent !== 'Solar Production for Today')
      .map(h => h?.closest('div[draggable="true"]') as HTMLElement)

    fireEvent.dragStart(wrappers[0])
    fireEvent.dragOver(wrappers[1])
    fireEvent.drop(wrappers[1])

    expect(headings().slice(0, 3)).toEqual([
      'Smart Lights',
      'Solar Panels',
      'Google Home',
    ])
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
