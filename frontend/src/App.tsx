import { useState } from 'react';
import DeviceCard from './components/DeviceCard';
import SolarProductionChart from './components/SolarProductionChart';
import RGL, { WidthProvider, Layout } from 'react-grid-layout';
import 'react-grid-layout/css/styles.css';
import 'react-resizable/css/styles.css';
import './App.css';

interface Device {
  name: string;
  isOn: boolean;
}

const GridLayout = WidthProvider(RGL);

export default function App() {
  const [devices, setDevices] = useState<Device[]>([
    { name: 'Solar Panels', isOn: true },
    { name: 'Smart Lights', isOn: false },
    { name: 'Google Home', isOn: true },
  ]);

  const [layout, setLayout] = useState<Layout[]>([
    { i: 'chart', x: 0, y: 0, w: 12, h: 4 },
    { i: 'device-0', x: 0, y: 4, w: 4, h: 3 },
    { i: 'device-1', x: 4, y: 4, w: 4, h: 3 },
    { i: 'device-2', x: 8, y: 4, w: 4, h: 3 },
  ]);

  const toggleDevice = (index: number) => {
    setDevices((prev) =>
      prev.map((d, i) => (i === index ? { ...d, isOn: !d.isOn } : d)),
    );
  };

  const onLayoutChange = (_layout: Layout[]) => {
    setLayout(_layout);
  };

  return (
    <div className="container">
      <h1>Smart Home Dashboard</h1>
      <GridLayout
        className="layout"
        cols={12}
        rowHeight={30}
        layout={layout}
        onLayoutChange={onLayoutChange}
        isResizable
        isDraggable
        compactType={null}
      >
        <div key="chart" className="grid-item">
          <SolarProductionChart />
        </div>
        {devices.map((device, idx) => (
          <div key={`device-${idx}`} className="grid-item">
            <DeviceCard
              name={device.name}
              isOn={device.isOn}
              onToggle={() => toggleDevice(idx)}
            />
          </div>
        ))}
      </GridLayout>
    </div>
  );
}
