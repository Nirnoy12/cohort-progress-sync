import { useState } from "react";
import { LabDataWithRank } from "@/types/lab-data";
import ProgressBar from "./ProgressBar";
import RankBadge from "./RankBadge";
import { ArrowUpDown, ArrowUp, ArrowDown } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

interface LeaderboardTableProps {
  data: LabDataWithRank[];
}

type SortField = "rank" | "name" | "completion";
type SortDirection = "asc" | "desc";

const LeaderboardTable = ({ data }: LeaderboardTableProps) => {
  const [sortField, setSortField] = useState<SortField>("rank");
  const [sortDirection, setSortDirection] = useState<SortDirection>("asc");

  const handleSort = (field: SortField) => {
    if (sortField === field) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortDirection("asc");
    }
  };

  const sortedData = [...data].sort((a, b) => {
    let comparison = 0;
    
    switch (sortField) {
      case "rank":
        comparison = a.rank - b.rank;
        break;
      case "name":
        comparison = a.Name.localeCompare(b.Name);
        break;
      case "completion":
        comparison = a.Completion_Percentage - b.Completion_Percentage;
        break;
    }
    
    return sortDirection === "asc" ? comparison : -comparison;
  });

  const SortIcon = ({ field }: { field: SortField }) => {
    if (sortField !== field) return <ArrowUpDown className="h-4 w-4 opacity-50" />;
    return sortDirection === "asc" ? 
      <ArrowUp className="h-4 w-4" /> : 
      <ArrowDown className="h-4 w-4" />;
  };

  return (
    <div className="rounded-lg border bg-card shadow-material overflow-hidden">
      <Table>
        <TableHeader>
          <TableRow className="bg-muted/50 hover:bg-muted/50">
            <TableHead 
              className="cursor-pointer select-none font-semibold"
              onClick={() => handleSort("rank")}
            >
              <div className="flex items-center gap-2">
                Rank
                <SortIcon field="rank" />
              </div>
            </TableHead>
            <TableHead 
              className="cursor-pointer select-none font-semibold"
              onClick={() => handleSort("name")}
            >
              <div className="flex items-center gap-2">
                Name
                <SortIcon field="name" />
              </div>
            </TableHead>
            <TableHead className="font-semibold">Email</TableHead>
            <TableHead className="text-center font-semibold">Labs Completed</TableHead>
            <TableHead 
              className="cursor-pointer select-none font-semibold"
              onClick={() => handleSort("completion")}
            >
              <div className="flex items-center gap-2">
                Progress
                <SortIcon field="completion" />
              </div>
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {sortedData.map((row, index) => (
            <TableRow 
              key={index} 
              className="hover:bg-muted/50 transition-colors"
            >
              <TableCell className="font-medium">
                <RankBadge rank={row.rank} />
              </TableCell>
              <TableCell className="font-medium">{row.Name}</TableCell>
              <TableCell className="text-muted-foreground">{row.Email}</TableCell>
              <TableCell className="text-center">
                <span className="font-semibold">{row.Labs_Completed}</span>
                <span className="text-muted-foreground"> / {row.Total_Labs}</span>
              </TableCell>
              <TableCell>
                <div className="flex items-center gap-3">
                  <div className="flex-1 min-w-[100px]">
                    <ProgressBar 
                      percentage={row.Completion_Percentage} 
                      showLabel={false}
                      size="md"
                    />
                  </div>
                  <span className="font-semibold text-sm min-w-[45px] text-right">
                    {row.Completion_Percentage.toFixed(0)}%
                  </span>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default LeaderboardTable;
