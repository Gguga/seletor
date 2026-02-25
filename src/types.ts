export type Gender = "M" | "F" | "";
export type TrainingFrequency = "0-1x" | "2-3x" | "4+" | "";
export type GoalStatus = "emagrecer" | "manter" | "";

export interface UserData {
  gender: Gender;
  age: string;
  height: string;
  weight: string;
  trainingFrequency: TrainingFrequency;
  goalStatus: GoalStatus;
}

export type AppState = "start" | "form" | "result";
