// components/OverviewCard.tsx
interface OverviewCardProps {
  title: string;
  value: number;
  color?: string;
}

const OverviewCard = ({ title, value, color = "bg-blue-500" }: OverviewCardProps) => (
  <div className={`p-4 rounded-2xl shadow-md text-white ${color}`}>
    <h3 className="text-lg font-semibold">{title}</h3>
    <p className="text-2xl font-bold">{value}</p>
  </div>
);

export default OverviewCard;
