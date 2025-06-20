import { WorkDetailData } from "./WorkDetailDTO";

export interface TimeCardData {
  date: string;
  startTime: string;
  endTime: string;
  workDetails: Array<WorkDetailData>;
  summary: string;
}
