import Papa from "papaparse";
import { LabData } from "@/types/lab-data";

const CSV_URL = "https://raw.githubusercontent.com/nirnoy112/Google-Cohort-Lab-Progress-Tracker/main/data/lab_data.csv";

export const fetchLabData = async (): Promise<LabData[]> => {
  try {
    const response = await fetch(CSV_URL);
    
    if (!response.ok) {
      throw new Error(`Failed to fetch CSV: ${response.statusText}`);
    }

    const csvText = await response.text();
    
    return new Promise((resolve, reject) => {
      Papa.parse(csvText, {
        header: true,
        skipEmptyLines: true,
        dynamicTyping: true,
        complete: (results) => {
          const data = results.data as LabData[];
          // Ensure percentage is calculated if not present
          const processedData = data.map(row => ({
            ...row,
            Completion_Percentage: row.Completion_Percentage || 
              (row.Total_Labs > 0 ? (row.Labs_Completed / row.Total_Labs) * 100 : 0)
          }));
          resolve(processedData);
        },
        error: (error) => {
          reject(new Error(`CSV parsing error: ${error.message}`));
        },
      });
    });
  } catch (error) {
    console.error("Error fetching lab data:", error);
    throw error;
  }
};
