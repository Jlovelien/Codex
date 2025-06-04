import { render, screen, fireEvent } from '@testing-library/react'
import DeviceCard from '../components/DeviceCard'
import { describe, it, expect, vi } from 'vitest'

describe('DeviceCard', () => {
  it('renders device information and toggles', () => {
    const onToggle = vi.fn()
    render(<DeviceCard name="Solar" isOn={true} onToggle={onToggle} />)
    expect(screen.getByText('Solar')).toBeInTheDocument()
    expect(screen.getByText('Status: On')).toBeInTheDocument()
    const button = screen.getByRole('button')
    expect(button).toHaveTextContent('Turn Off')
    fireEvent.click(button)
    expect(onToggle).toHaveBeenCalled()
  })
})
