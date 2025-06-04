import { useState } from 'react';
import DeviceCard from './components/DeviceCard';
import './App.css';

interface Device {
  name: string;
  isOn: boolean;
}

export default function App() {
  const [devices, setDevices] = useState<Device[]>([
    { name: 'Solar Panels', isOn: true },
    { name: 'Smart Lights', isOn: false },
    { name: 'Google Home', isOn: true },
  ]);

  const [draggingIndex, setDraggingIndex] = useState<number | null>(null);

  const toggleDevice = (index: number) => {
    setDevices((prev) =>
      prev.map((d, i) => (i === index ? { ...d, isOn: !d.isOn } : d)),
    );
  };

  const handleDragStart = (index: number) => {
    setDraggingIndex(index);
  };

  const handleDragOver = (
    event: React.DragEvent<HTMLDivElement>,
    index: number,
  ) => {
    event.preventDefault();
    if (draggingIndex === null || draggingIndex === index) return;
    setDevices((prev) => {
      const updated = [...prev];
      const [item] = updated.splice(draggingIndex, 1);
      updated.splice(index, 0, item);
      return updated;
    });
    setDraggingIndex(index);
  };

  const handleDrop = () => {
    setDraggingIndex(null);
  };

  return (
    <div className="container">
      <h1>Smart Home Dashboard</h1>
      <div className="devices">
        {devices.map((device, idx) => (
          <div
            key={device.name}
            draggable
            onDragStart={() => handleDragStart(idx)}
            onDragOver={(e) => handleDragOver(e, idx)}
            onDrop={handleDrop}
          >
            <DeviceCard
              name={device.name}
              isOn={device.isOn}
              onToggle={() => toggleDevice(idx)}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
