interface DeviceCardProps {
  name: string;
  isOn: boolean;
  onToggle: () => void;
}

export default function DeviceCard({ name, isOn, onToggle }: DeviceCardProps) {
  return (
    <div className={`device-card ${isOn ? 'on' : 'off'}`}>
      <h2>{name}</h2>
      <p>Status: {isOn ? 'On' : 'Off'}</p>
      <button onClick={onToggle}>{isOn ? 'Turn Off' : 'Turn On'}</button>
    </div>
  );
}
