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

  const toggleDevice = (index: number) => {
    setDevices((prev) =>
      prev.map((d, i) => (i === index ? { ...d, isOn: !d.isOn } : d)),
    );
  };

  return (
    <div className="container">
      <h1>Smart Home Dashboard</h1>
      <div className="devices">
        {devices.map((device, idx) => (
          <DeviceCard
            key={device.name}
            name={device.name}
            isOn={device.isOn}
            onToggle={() => toggleDevice(idx)}
          />
        ))}
      </div>
    </div>
  );
}
