import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Trophy, Target, TrendingUp } from "lucide-react";
import GDGLogo from "@/components/GDGLogo";

const Home = () => {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="border-b bg-card shadow-sm">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <GDGLogo className="h-10 w-10" />
            <h1 className="text-xl font-bold font-google">Google Cohort Tracker</h1>
          </div>
          <Link to="/leaderboard">
            <Button className="gradient-gdg border-0">View Leaderboard</Button>
          </Link>
        </div>
      </header>

      {/* Hero Section */}
      <main className="flex-1 flex items-center justify-center bg-gradient-to-br from-background via-background to-primary/5">
        <div className="container mx-auto px-4 py-16 md:py-24">
          <div className="max-w-4xl mx-auto text-center space-y-8">
            <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium mb-4">
              <Target className="h-4 w-4" />
              Real-time Progress Tracking
            </div>
            
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold leading-tight font-google">
              Google Cohort
              <br />
              <span className="text-gdg-gradient">
                Lab Progress Tracker
              </span>
            </h1>
            
            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
              Track your cohort's progress and leaderboard in real time. 
              See how you stack up against your peers and celebrate every milestone.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-4">
              <Link to="/leaderboard">
                <Button size="lg" className="gradient-gdg shadow-lg hover:shadow-xl transition-smooth text-lg px-8 border-0">
                  View Leaderboard
                  <TrendingUp className="ml-2 h-5 w-5" />
                </Button>
              </Link>
            </div>

            {/* Feature Cards */}
            <div className="grid md:grid-cols-3 gap-6 pt-12">
              <div className="bg-card border-2 border-gdg-blue/20 rounded-xl p-6 shadow-material hover:shadow-lg hover:border-gdg-blue/40 transition-smooth">
                <div className="gradient-gdg-blue-red w-12 h-12 rounded-lg flex items-center justify-center mb-4 mx-auto">
                  <Trophy className="h-6 w-6 text-white" />
                </div>
                <h3 className="font-semibold text-lg mb-2 font-google">Live Rankings</h3>
                <p className="text-muted-foreground text-sm">
                  See real-time rankings and celebrate top performers with badges
                </p>
              </div>

              <div className="bg-card border-2 border-gdg-green/20 rounded-xl p-6 shadow-material hover:shadow-lg hover:border-gdg-green/40 transition-smooth">
                <div className="gradient-gdg-yellow-green w-12 h-12 rounded-lg flex items-center justify-center mb-4 mx-auto">
                  <Target className="h-6 w-6 text-white" />
                </div>
                <h3 className="font-semibold text-lg mb-2 font-google">Progress Tracking</h3>
                <p className="text-muted-foreground text-sm">
                  Visual progress bars show completion status at a glance
                </p>
              </div>

              <div className="bg-card border-2 border-gdg-red/20 rounded-xl p-6 shadow-material hover:shadow-lg hover:border-gdg-red/40 transition-smooth">
                <div className="bg-gdg-red w-12 h-12 rounded-lg flex items-center justify-center mb-4 mx-auto">
                  <TrendingUp className="h-6 w-6 text-white" />
                </div>
                <h3 className="font-semibold text-lg mb-2 font-google">Analytics</h3>
                <p className="text-muted-foreground text-sm">
                  Comprehensive charts and statistics for the entire cohort
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t bg-card">
        <div className="container mx-auto px-4 py-6 text-center text-sm text-muted-foreground">
          Built for Google Cohort Progress Tracking | © 2025 MCKVIE AI-ML Dept.
        </div>
      </footer>
    </div>
  );
};

export default Home;
