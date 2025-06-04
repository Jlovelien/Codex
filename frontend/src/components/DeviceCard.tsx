interface DeviceCardProps {
  name: string;
}

export default function DeviceCard({ name }: DeviceCardProps) {
  return (
    <div className="device-card">
      <h2>{name}</h2>
      <p>Controls and status will appear here.</p>
    </div>
  );
}
