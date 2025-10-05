import { Medal } from "lucide-react";

interface RankBadgeProps {
  rank: number;
}

const RankBadge = ({ rank }: RankBadgeProps) => {
  if (rank > 3) return <span className="text-muted-foreground font-medium">#{rank}</span>;

  const colors = {
    1: { bg: "bg-gold/10", text: "text-gold", border: "border-gold/20" },
    2: { bg: "bg-silver/10", text: "text-silver", border: "border-silver/20" },
    3: { bg: "bg-bronze/10", text: "text-bronze", border: "border-bronze/20" },
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
