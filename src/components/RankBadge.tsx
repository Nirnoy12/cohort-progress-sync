import { Medal } from "lucide-react";

interface RankBadgeProps {
  rank: number;
}

const RankBadge = ({ rank }: RankBadgeProps) => {
  if (rank > 3) return <span className="text-muted-foreground font-medium">#{rank}</span>;

  const colors = {
    1: { bg: "bg-gdg-yellow/20", text: "text-gdg-yellow", border: "border-gdg-yellow/40" },
    2: { bg: "bg-gdg-blue/20", text: "text-gdg-blue", border: "border-gdg-blue/40" },
    3: { bg: "bg-gdg-green/20", text: "text-gdg-green", border: "border-gdg-green/40" },
  };

  const color = colors[rank as keyof typeof colors];

  return (
    <div className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full border ${color.bg} ${color.border}`}>
      <Medal className={`h-4 w-4 ${color.text}`} />
      <span className={`font-bold text-sm ${color.text}`}>#{rank}</span>
    </div>
  );
};

export default RankBadge;
