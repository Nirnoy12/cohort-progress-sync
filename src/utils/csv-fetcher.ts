/* eslint-disable @typescript-eslint/no-explicit-any */
import { create } from "zustand";
import { persist } from "zustand/middleware";

// --- Store state type ---
interface LeaderboardState {
  data: LabDataWithRank[];
  loading: boolean;
  error: string | null;
  fetchLeaderboard: () => Promise<void>;
}

// --- Constants ---
const API_KEY = "AIzaSyBscgVdttfCp4hpvqLgTYHmNCxHB83cRQQ";
const SPREADSHEET_ID = "1UL2OK8oolWeehcs799ofOwxWciSJ5D0xyGuUxAhE1wI";
const SHEET_NAME = " [06 Oct]";
const REFRESH_INTERVAL = 5 * 60 * 1000; // 5 minutes

// --- Fetch data from Google Sheets ---
async function fetchLeaderboardData(): Promise<string[][]> {
  const sheetNameEncoded = encodeURIComponent(SHEET_NAME);
  const url = `https://sheets.googleapis.com/v4/spreadsheets/${SPREADSHEET_ID}/values/${sheetNameEncoded}?key=${API_KEY}`;

  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  const data = await response.json();
  // console.log("data = ", data.values);
  return data.values;
}

// --- Process the raw sheet data ---
function processData(rawData: string[][]): LabDataWithRank[] {
  if (!rawData || rawData.length < 2) return [];
  // console.log("rawData = ", rawData[0]);
  const headers = rawData[0].map((h) => h.toLowerCase());
  const nameIdx = headers.findIndex((h) => h.includes("user name"));
  const emailIdx = headers.findIndex((h) => h.includes("user email"));
  const labsIdx = headers.findIndex((h) =>
    h.includes("no of skill badges completed")
  );
  

  // console.log("idx = \n lab = ", nameIdx,labsIdx);

  if (nameIdx === -1 || labsIdx === -1) {
    console.error("Required columns not found");
    return [];
  }

  const TOTAL_LABS = 19; // ✅ Hardcoded total

  const processed: LabDataWithRank[] = rawData
    .slice(1)
    .map((row) => {
      const labsCompleted = parseInt(row[labsIdx]) || 0;
      const completionPercentage = (labsCompleted / TOTAL_LABS) * 100;

      return {
        Name: row[nameIdx] || "",
        Email: row[emailIdx] || "",
        Labs_Completed: labsCompleted,
        Total_Labs: TOTAL_LABS,
        Completion_Percentage: parseFloat(completionPercentage.toFixed(2)), // ✅ round to 2 decimals
        rank: 0,
      };
    })
    .filter((item) => item.Name)
    .sort((a, b) => b.Completion_Percentage - a.Completion_Percentage)
    .map((item, i) => ({ ...item, rank: i + 1 }));

  return processed;
}

// --- Zustand Store ---
export const useLeaderboardStore = create<LeaderboardState>()(
  persist(
    (set) => ({
      data: [],
      loading: false,
      error: null,

      fetchLeaderboard: async () => {
        set({ loading: true, error: null });
        try {
          const rawData = await fetchLeaderboardData();
          const processed = processData(rawData);
          set({ data: processed, loading: false });
        } catch (error: any) {
          set({
            error: error.message || "Failed to fetch data",
            loading: false,
          });
        }
      },
    }),
    {
      name: "leaderboard-storage", // key name in localStorage
      partialize: (state) => ({ data: state.data }), // store only data, not loading/error
    }
  )
);

// --- Optional Auto Refresh Hook ---
import React from "react";
import { LabDataWithRank } from "@/types/lab-data";

export function useAutoRefreshLeaderboard() {
  const fetchLeaderboard = useLeaderboardStore((s) => s.fetchLeaderboard);

  React.useEffect(() => {
    fetchLeaderboard(); // initial load
    const interval = setInterval(fetchLeaderboard, REFRESH_INTERVAL);
    return () => clearInterval(interval);
  }, [fetchLeaderboard]);
}