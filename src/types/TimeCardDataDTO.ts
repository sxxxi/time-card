import { WorkDetailData } from "./WorkDetailDTO";

export interface TimeCardData {
  date: string;
  workDetails: Array<WorkDetailData>;
  summary: string;
}
