import { LabDataWithRank } from "@/types/lab-data";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, Legend } from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface StatsChartsProps {
  data: LabDataWithRank[];
}

const COLORS = ["hsl(217, 89%, 61%)", "hsl(4, 90%, 58%)", "hsl(43, 96%, 56%)", "hsl(142, 71%, 45%)"];

const StatsCharts = ({ data }: StatsChartsProps) => {
  // Prepare data for bar chart
  const barData = data.slice(0, 10).map((item) => ({
    name: item.Name.split(" ")[0], // First name only for readability
    completed: item.Labs_Completed,
    total: item.Total_Labs,
  }));

  // Prepare data for pie chart
  const completionRanges = [
    { name: "100%", count: 0, range: [100, 100] },
    { name: "75-99%", count: 0, range: [75, 99] },
    { name: "50-74%", count: 0, range: [50, 74] },
    { name: "0-49%", count: 0, range: [0, 49] },
  ];

  data.forEach((item) => {
    const pct = item.Completion_Percentage;
    const range = completionRanges.find((r) => pct >= r.range[0] && pct <= r.range[1]);
    if (range) range.count++;
  });

  const pieData = completionRanges.filter((r) => r.count > 0);

  // Calculate overall stats
  const totalLabs = data.reduce((sum, item) => sum + item.Labs_Completed, 0);
  const totalPossible = data.reduce((sum, item) => sum + item.Total_Labs, 0);
  const avgCompletion = totalPossible > 0 ? (totalLabs / totalPossible) * 100 : 0;

  return (
    <div className="space-y-6">
      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-3">
        <Card className="shadow-material">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-muted-foreground">Total Participants</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{data.length}</div>
          </CardContent>
        </Card>
        
        <Card className="shadow-material">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-muted-foreground">Labs Completed</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{totalLabs}</div>
            <p className="text-xs text-muted-foreground mt-1">out of {totalPossible} total</p>
          </CardContent>
        </Card>
        
        <Card className="shadow-material">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-muted-foreground">Average Completion</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{avgCompletion.toFixed(1)}%</div>
          </CardContent>
        </Card>
      </div>

      {/* Charts */}
      <div className="grid gap-6 lg:grid-cols-2">
        <Card className="shadow-material">
          <CardHeader>
            <CardTitle>Labs Completed by Participant</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={barData}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis 
                  dataKey="name" 
                  stroke="hsl(var(--muted-foreground))"
                  fontSize={12}
                />
                <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: "hsl(var(--card))", 
                    border: "1px solid hsl(var(--border))",
                    borderRadius: "8px"
                  }}
                />
                <Bar dataKey="completed" fill="hsl(217, 89%, 61%)" radius={[8, 8, 0, 0]}>
                  {barData.map((entry, index) => (
                    <rect key={`bar-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card className="shadow-material">
          <CardHeader>
            <CardTitle>Completion Distribution</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={pieData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="count"
                >
                  {pieData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: "hsl(var(--card))", 
                    border: "1px solid hsl(var(--border))",
                    borderRadius: "8px"
                  }}
                />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default StatsCharts;
