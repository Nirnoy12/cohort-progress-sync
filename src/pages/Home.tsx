import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Trophy, Target, TrendingUp } from "lucide-react";
import {
  useAutoRefreshLeaderboard,
  useLeaderboardStore,
} from "@/utils/csv-fetcher";
import { useEffect } from "react";

const Home = () => {
  

  const { data } = useLeaderboardStore();

  const totalStudents = data?.length;
  const fullCompleted = data.filter(
    (item) => item.Labs_Completed === 19 // ✅ total labs hardcoded
  ).length;

  const words = [
    { text: "Google ", color: "text-gdg-blue" },
    { text: "Cloud ", color: "text-gdg-red" },
    { text: "Study ", color: "text-gdg-yellow" },
    { text: "Jam", color: "text-gdg-green" },
  ];
  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="border-b bg-card shadow-sm">
        <div className="container mx-auto px-4 sm:px-6 flex items-center justify-between gap-4 sm:gap-8">
          {/* Logos Section */}
          <div className="flex items-center justify-center flex-nowrap">
            <img
              src="/MCKVIE.png"
              alt="MCKV Logo"
              className="h-14 w-auto sm:h-20 md:h-24 lg:h-28 object-contain drop-shadow-md hover:scale-105 transition-transform duration-300"
            />
            <img
              src="/LOGO.png"
              alt="GDG Logo"
              className="h-14 w-auto sm:h-20 md:h-24 lg:h-28 object-contain drop-shadow-md hover:scale-105 transition-transform duration-300"
            />
          </div>

          {/* Button */}
          <Link to="/leaderboard">
            <Button className="bg-transparent border-2 border-gdg-red  hover:bg-gdg-red text-gdg-red hover:text-white font-semibold rounded-xl transition-all duration-300 text-sm sm:text-base md:text-md px-4 py-1.5 sm:px-5 sm:py-2.5 md:px-7 md:py-3 shadow-lg hover:shadow-xl transition-smooth">
              View Leaderboard
            </Button>
          </Link>
        </div>
      </header>

      {/* Hero Section */}
      <main className="flex-1 flex items-center justify-center bg-gradient-to-br from-background via-background to-primary/5">
        <div className="container mx-auto px-4 py-16 md:py-24">
          <div className="max-w-4xl mx-auto text-center space-y-8">
            <h1 className="text-3xl md:text-6xl lg:text-7xl font-bold leading-tight font-google">
              <span className="text-xl md:text-4xl lg:text-5xl">
                Welcome to
              </span>
              <br />
              {words.map(({ text, color }) => (
                <span key={text} className={color}>
                  {text}
                </span>
              ))}
              <br />
              <span className="text-xl md:text-4xl lg:text-5xl">
                GDG oncampus MCKVIE
              </span>
            </h1>

            <p className="text-md md:text-xl text-muted-foreground max-w-2xl mx-auto">
              Track your cohort's progress and leaderboard in real time. See how
              you stack up against your peers and celebrate every milestone.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-4">
              <Link to="/leaderboard">
                <Button
                  size="lg"
                  className="bg-transparent border border-gdg-green hover:bg-gdg-green text-gdg-green hover:text-white shadow-lg hover:shadow-xl transition-smooth text-lg px-8"
                >
                  View Leaderboard
                  <TrendingUp className="ml-2 h-5 w-5" />
                </Button>
              </Link>
            </div>

            {/* Feature Cards */}
            <div className="w-full flex flex-col sm:flex-row items-center justify-center gap-6 pt-10 px-4 sm:px-8">
              {/* Card 1 */}

              <div className="w-full sm:w-[300px] md:w-[340px] lg:w-[380px] h-[130px] sm:h-[180px] bg-card border-2 border-gdg-yellow rounded-xl p-4 sm:p-6 shadow-md hover:shadow-lg hover:border-gdg-yellow/60 transition-all duration-300 text-center flex flex-col items-center justify-center space-y-3 cursor-pointer">
                <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-gdg-yellow/10 flex items-center justify-center text-gdg-yellow text-xl sm:text-2xl font-bold">
                  {totalStudents}
                </div>
                <h3 className="font-semibold text-base sm:text-lg font-google text-foreground">
                  Participants Registered
                </h3>
              </div>
              {/* Card 2 */}
              <div className="w-full sm:w-[300px] md:w-[340px] lg:w-[380px] h-[130px] sm:h-[180px] bg-card border-2 border-gdg-blue rounded-xl p-4 sm:p-6 shadow-md hover:shadow-lg hover:border-gdg-blue/60 transition-all duration-300 text-center flex flex-col items-center justify-center space-y-3 cursor-pointer">
                <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-gdg-blue/10 flex items-center justify-center text-gdg-blue text-xl sm:text-2xl font-bold">
                  {fullCompleted}
                </div>
                <h3 className="font-semibold text-base sm:text-lg font-google text-foreground">
                  Eligible Participants
                </h3>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t bg-card">
        <div className="container mx-auto px-4 py-6 text-center text-sm text-muted-foreground">
          Built for GDG MCKVIE | © 2025 MCKVIE AI-ML Dept.
        </div>
      </footer>
    </div>
  );
};

export default Home;
