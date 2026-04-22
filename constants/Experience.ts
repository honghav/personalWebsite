import { get } from "http";
import { getExperienceService } from "../services/experience";

export type Experience = {
  id: string | number;
  company: string;
  role: string;
  period_start: string;
  period_end: string;
  description: string[];
  skills: string[];
};

export const EXPERIENCES = await getExperienceService() ?? [];
