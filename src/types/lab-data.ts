export interface LabData {
  Name: string;
  Email: string;
  Labs_Completed: number;
  Total_Labs: number;
  Completion_Percentage: number;
}

export interface LabDataWithRank extends LabData {
  rank: number;
}
