/* eslint-disable @typescript-eslint/no-explicit-any */
import { create } from "zustand";

// --- Store state type ---
interface LeaderboardState {
  data: LabDataWithRank[];
  loading: boolean;
  error: string | null;
  fetchLeaderboard: () => Promise<void>;
}

// --- Constants ---
// const API_KEY = "AIzaSyBscgVdttfCp4hpvqLgTYHmNCxHB83cRQQ";
const API_KEY = "AIzaSyD2o3xN03sHHhQ9FM4xXTJvi2ue-WI8nWc";
const SPREADSHEET_ID = "1UL2OK8oolWeehcs799ofOwxWciSJ5D0xyGuUxAhE1wI";
const SHEET_NAME = "[06 Oct]";
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
  return data.values;
}

// --- Process the raw sheet data ---
function processData(rawData: string[][]): LabDataWithRank[] {
  if (!rawData || rawData.length < 2) return [];

  const headers = rawData[0].map((h) => h.toLowerCase());
  const nameIdx = headers.findIndex((h) => h.includes("name"));
  const emailIdx = headers.findIndex((h) => h.includes("email"));
  const labsIdx = headers.findIndex((h) => h.includes("labs completed"));
  const totalIdx = headers.findIndex((h) => h.includes("total labs"));
  const percentIdx = headers.findIndex((h) =>
    h.includes("completion percentage")
  );

  if (nameIdx === -1 || labsIdx === -1) {
    console.error("Required columns not found");
    return [];
  }

  const processed: LabDataWithRank[] = rawData
    .slice(1)
    .map((row) => ({
      Name: row[nameIdx] || "",
      Email: row[emailIdx] || "",
      Labs_Completed: parseInt(row[labsIdx]) || 0,
      Total_Labs: parseInt(row[totalIdx]) || 0,
      Completion_Percentage: parseFloat(row[percentIdx]) || 0,
      rank: 0, // will assign below
    }))
    .filter((item) => item.Name)
    .sort((a, b) => b.Completion_Percentage - a.Completion_Percentage)
    .map((item, i) => ({ ...item, rank: i + 1 }));

  return processed;
}

// --- Zustand Store ---
export const useLeaderboardStore = create<LeaderboardState>((set) => ({
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
      set({ error: error.message || "Failed to fetch data", loading: false });
    }
  },
}));

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
