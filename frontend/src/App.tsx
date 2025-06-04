import DeviceCard from './components/DeviceCard';
import './App.css';

export default function App() {
  return (
    <div className="container">
      <h1>Smart Home Dashboard</h1>
      <div className="devices">
        <DeviceCard name="Solar Panels" />
        <DeviceCard name="Smart Lights" />
        <DeviceCard name="Google Home" />
      </div>
    </div>
  );
}
