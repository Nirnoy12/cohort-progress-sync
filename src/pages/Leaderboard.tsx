import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Trophy, Search, BarChart3, Loader2, AlertCircle, Home } from "lucide-react";
import GDGLogo from "@/components/GDGLogo";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import LeaderboardTable from "@/components/LeaderboardTable";
import StatsCharts from "@/components/StatsCharts";
import { fetchLabData } from "@/utils/csv-fetcher";
import { LabDataWithRank } from "@/types/lab-data";
import { useToast } from "@/hooks/use-toast";

const Leaderboard = () => {
  const [data, setData] = useState<LabDataWithRank[]>([]);
  const [filteredData, setFilteredData] = useState<LabDataWithRank[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showCharts, setShowCharts] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    loadData();
  }, []);

  useEffect(() => {
    if (searchQuery.trim() === "") {
      setFilteredData(data);
    } else {
      const query = searchQuery.toLowerCase();
      const filtered = data.filter(
        (item) =>
          item.Name.toLowerCase().includes(query) ||
          item.Email.toLowerCase().includes(query)
      );
      setFilteredData(filtered);
    }
  }, [searchQuery, data]);

  const loadData = async () => {
    try {
      setLoading(true);
      setError(null);
      const rawData = await fetchLabData();
      
      // Sort by completion percentage and assign ranks
      const sorted = [...rawData].sort(
        (a, b) => b.Completion_Percentage - a.Completion_Percentage
      );
      
      const withRanks: LabDataWithRank[] = sorted.map((item, index) => ({
        ...item,
        rank: index + 1,
      }));
      
      setData(withRanks);
      setFilteredData(withRanks);
      
      toast({
        title: "Data loaded successfully",
        description: `Loaded ${withRanks.length} participants`,
      });
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "Failed to load data";
      setError(errorMessage);
      toast({
        title: "Error loading data",
        description: errorMessage,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-background via-background to-primary/5">
      {/* Header */}
      <header className="border-b bg-card shadow-sm sticky top-0 z-10">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <GDGLogo className="h-10 w-10" />
              <div>
                <h1 className="text-xl font-bold font-google">Leaderboard</h1>
                <p className="text-xs text-muted-foreground">Google Cohort Progress</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setShowCharts(!showCharts)}
              >
                <BarChart3 className="h-4 w-4 mr-2" />
                {showCharts ? "Hide" : "Show"} Stats
              </Button>
              <Link to="/">
                <Button variant="ghost" size="sm">
                  <Home className="h-4 w-4 mr-2" />
                  Home
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 container mx-auto px-4 py-8">
        <div className="space-y-6">
          {/* Search Bar */}
          <Card className="shadow-material">
            <CardContent className="pt-6">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                <Input
                  type="text"
                  placeholder="Search by name or email..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 h-12 text-base"
                />
              </div>
              {searchQuery && (
                <p className="text-sm text-muted-foreground mt-2">
                  Found {filteredData.length} result{filteredData.length !== 1 ? "s" : ""}
                </p>
              )}
            </CardContent>
          </Card>

          {/* Loading State */}
          {loading && (
            <div className="flex items-center justify-center py-12">
              <div className="text-center space-y-4">
                <Loader2 className="h-12 w-12 animate-spin text-primary mx-auto" />
                <p className="text-muted-foreground">Loading leaderboard data...</p>
              </div>
            </div>
          )}

          {/* Error State */}
          {error && (
            <Alert variant="destructive">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription className="flex items-center justify-between">
                <span>{error}</span>
                <Button variant="outline" size="sm" onClick={loadData}>
                  Retry
                </Button>
              </AlertDescription>
            </Alert>
          )}

          {/* Stats Charts */}
          {!loading && !error && showCharts && data.length > 0 && (
            <StatsCharts data={data} />
          )}

          {/* Leaderboard Table */}
          {!loading && !error && filteredData.length > 0 && (
            <LeaderboardTable data={filteredData} />
          )}

          {/* Empty State */}
          {!loading && !error && filteredData.length === 0 && data.length > 0 && (
            <Card className="shadow-material">
              <CardContent className="py-12 text-center">
                <Search className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-semibold mb-2">No results found</h3>
                <p className="text-muted-foreground">
                  Try adjusting your search query
                </p>
              </CardContent>
            </Card>
          )}
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t bg-card mt-auto">
        <div className="container mx-auto px-4 py-6 text-center text-sm text-muted-foreground">
          Built for Google Cohort Progress Tracking | © 2025 MCKVIE AI-ML Dept.
        </div>
      </footer>
    </div>
  );
};

export default Leaderboard;
