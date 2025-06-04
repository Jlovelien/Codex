import { render, screen, fireEvent } from '@testing-library/react'
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
    const headings = () => screen.getAllByRole('heading', { level: 2 }).map(h => h.textContent)
    expect(headings().slice(0, 3)).toEqual([
      'Solar Panels',
      'Smart Lights',
      'Google Home',
    ])

    const wrappers = screen
      .getAllByRole('heading', { level: 2 })
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
})
